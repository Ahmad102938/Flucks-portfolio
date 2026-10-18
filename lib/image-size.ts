import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Width / height of an image in /public (PNG, JPEG or WebP), read from the file header.
 * Returns null for remote URLs or anything it can't read, so callers fall back to a default frame.
 */
export async function getLocalImageRatio(url: string): Promise<number | null> {
    if (!url.startsWith("/")) return null;
    try {
        const file = await readFile(path.join(process.cwd(), "public", decodeURIComponent(url.split("?")[0])));
        const size = readSize(file);
        return size && size.width > 0 && size.height > 0 ? size.width / size.height : null;
    } catch {
        return null;
    }
}

function readSize(buf: Buffer): { width: number; height: number } | null {
    // PNG: IHDR chunk right after the signature
    if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) {
        return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }

    // WebP: RIFF container with a VP8, VP8L or VP8X chunk
    if (buf.length >= 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
        const chunk = buf.toString("ascii", 12, 16);
        if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
        if (chunk === "VP8L") {
            const bits = buf.readUInt32LE(21);
            return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
        }
        if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
        return null;
    }

    // JPEG: walk the markers to the first start-of-frame
    if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
        let offset = 2;
        while (offset + 9 < buf.length) {
            if (buf[offset] !== 0xff) return null;
            const marker = buf[offset + 1];
            const isFrame = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
            if (isFrame) return { width: buf.readUInt16BE(offset + 7), height: buf.readUInt16BE(offset + 5) };
            offset += 2 + buf.readUInt16BE(offset + 2);
        }
    }

    return null;
}
