import type Lenis from "lenis";

// Shared Lenis instance, registered by <SmoothScroll /> so programmatic scrolls
// go through the same loop as wheel/touch scrolling instead of fighting it.
let lenisInstance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
    lenisInstance = lenis;
};

export const getLenis = () => lenisInstance;

export const CONTACT_ID = "lets-connect";
export const CONTACT_HREF = `/?scroll=${CONTACT_ID}`;

// Breathing room between the bottom of the floating navbar and the landing anchor
const LANDING_GAP = 16;
const CURTAIN_FADE_MS = 220;

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Gentle start, long soft landing
const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

/** Bottom edge of the fixed site navbar, so landings never tuck under it. */
const headerOffset = () => {
    const nav = document.querySelector<HTMLElement>("[data-site-nav]");
    if (!nav) return 0;
    let bottom = 0;
    for (const child of Array.from(nav.children)) {
        const rect = child.getBoundingClientRect();
        if (rect.height > 0) bottom = Math.max(bottom, rect.bottom);
    }
    return Math.min(Math.max(bottom, 0), 160);
};

const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

/**
 * Scroll position that puts the target's anchor (an optional [data-scroll-anchor] inside it,
 * else the target itself) just below the navbar, clamped to what the page can actually scroll.
 */
const landingY = (target: HTMLElement) => {
    const anchor = target.querySelector<HTMLElement>("[data-scroll-anchor]") ?? target;
    const y = window.scrollY + anchor.getBoundingClientRect().top - headerOffset() - LANDING_GAP;
    return Math.round(Math.min(Math.max(y, 0), Math.max(maxScroll(), 0)));
};

const setScroll = (y: number) => {
    if (lenisInstance) lenisInstance.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
};

const INPUT_EVENTS = ["wheel", "touchstart", "pointerdown", "keydown"] as const;

let cancelActiveGlide: (() => void) | null = null;

/**
 * Frame-by-frame glide that re-measures its destination every frame, so content loading or
 * resizing above the target mid-flight bends the path instead of overshooting or needing a
 * second hop. Any user input (wheel, touch, click, keys) hands control straight back.
 * Resolves true if it landed, false if interrupted or superseded.
 */
const glide = (getTarget: () => number | null, duration: number) =>
    new Promise<boolean>((resolve) => {
        cancelActiveGlide?.();

        const startY = window.scrollY;
        const startTime = performance.now();
        let raf = 0;
        let done = false;

        const finish = (landed: boolean) => {
            if (done) return;
            done = true;
            cancelAnimationFrame(raf);
            INPUT_EVENTS.forEach((type) => window.removeEventListener(type, onUserInput, true));
            if (cancelActiveGlide === cancel) cancelActiveGlide = null;
            resolve(landed);
        };
        const cancel = () => finish(false);
        const onUserInput = (event: Event) => {
            // Modifier-only key presses (e.g. Cmd for a screenshot) shouldn't steal the scroll
            if (event instanceof KeyboardEvent && ["Shift", "Control", "Alt", "Meta"].includes(event.key)) return;
            cancel();
        };

        INPUT_EVENTS.forEach((type) =>
            window.addEventListener(type, onUserInput, { capture: true, passive: true }),
        );
        cancelActiveGlide = cancel;
        lenisInstance?.resize();

        const step = (now: number) => {
            const target = getTarget();
            if (target === null) return cancel();
            const t = duration <= 0 ? 1 : Math.min((now - startTime) / (duration * 1000), 1);
            setScroll(startY + (target - startY) * easeInOutCubic(t));
            if (t < 1) raf = requestAnimationFrame(step);
            else finish(true);
        };
        raf = requestAnimationFrame(step);
    });


// Short hops stay snappy, long ones don't drag
const durationFor = (distance: number) => Math.min(Math.max(0.7 + distance / 5000, 0.8), 1.8);

export const smoothScrollTo = (elementId: string) => {
    const target = document.getElementById(elementId);
    if (!target) return;

    if (prefersReducedMotion()) {
        cancelActiveGlide?.();
        setScroll(landingY(target));
        return;
    }

    const distance = Math.abs(landingY(target) - window.scrollY);
    void glide(() => (target.isConnected ? landingY(target) : null), durationFor(distance));
};

/* ---------------------------------------------------------------------------------------
 * Cross-page arrival: a black curtain covers the hand-off between pages, the destination
 * page is parked a short distance above the target while it's hidden, and the curtain
 * lifts as the page glides the last stretch into place. The long trip through the
 * home page never happens, so nothing has to load or animate on the way.
 * ------------------------------------------------------------------------------------- */

const CURTAIN_ID = "scroll-curtain";
let curtainFailsafe: ReturnType<typeof setTimeout> | undefined;

const getCurtain = () => document.getElementById(CURTAIN_ID);

const createCurtain = (opacity: number) => {
    const curtain = document.createElement("div");
    curtain.id = CURTAIN_ID;
    curtain.setAttribute("aria-hidden", "true");
    Object.assign(curtain.style, {
        position: "fixed",
        inset: "0",
        zIndex: "9998",
        background: "#000",
        pointerEvents: "none",
        opacity: String(opacity),
        transition: `opacity ${CURTAIN_FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    });
    document.body.appendChild(curtain);
    // Never leave the page covered if navigation stalls or fails
    clearTimeout(curtainFailsafe);
    curtainFailsafe = setTimeout(hideCurtain, 5000);
    return curtain;
};

/** Fades a curtain in; resolves once the screen is fully covered. */
const showCurtain = () =>
    new Promise<void>((resolve) => {
        const curtain = getCurtain() ?? createCurtain(0);
        void curtain.offsetWidth; // commit the starting opacity so the fade runs
        curtain.style.opacity = "1";
        setTimeout(resolve, CURTAIN_FADE_MS);
    });

export const hideCurtain = () => {
    clearTimeout(curtainFailsafe);
    const curtain = getCurtain();
    if (!curtain) return;
    curtain.id = ""; // a new curtain can be created while this one fades out
    curtain.style.opacity = "0";
    setTimeout(() => curtain.remove(), CURTAIN_FADE_MS + 50);
};

let leavingForContact = false;

/** "Start your project" from any page: on home just glide, elsewhere cover and navigate. */
export const goToContact = (pathname: string, navigate: (href: string) => void) => {
    if (pathname === "/") {
        smoothScrollTo(CONTACT_ID);
        return;
    }
    if (leavingForContact) return; // double clicks
    leavingForContact = true;
    setTimeout(() => (leavingForContact = false), 1500);

    if (prefersReducedMotion()) {
        navigate(CONTACT_HREF);
        return;
    }
    // Navigate once covered: a prefetched home page can render before a fade finishes
    void showCurtain().then(() => navigate(CONTACT_HREF));
};

/** Waits (up to `timeout`) until the element exists and its landing spot holds still. */
const waitForStableTarget = async (elementId: string, timeout = 2500) => {
    const start = performance.now();
    let last = NaN;
    let stableFrames = 0;
    while (performance.now() - start < timeout) {
        await nextFrame();
        if (window.location.pathname !== "/") return null;
        const el = document.getElementById(elementId);
        if (!el) continue;
        const y = landingY(el);
        stableFrames = Math.abs(y - last) < 1 ? stableFrames + 1 : 0;
        last = y;
        if (stableFrames >= 6) return el;
    }
    return document.getElementById(elementId);
};

/** Resolves once the first-visit preloader has started fading out (or isn't showing). */
const waitForPreloader = async (timeout = 3500) => {
    const start = performance.now();
    while (performance.now() - start < timeout) {
        const preloader = document.querySelector("[data-site-preloader]");
        if (!preloader || preloader.hasAttribute("data-leaving")) return;
        if (document.documentElement.hasAttribute("data-preloaded")) return;
        await nextFrame();
    }
};

let arriving = false;

/** Runs on the home page when it was opened with ?scroll=<id>. Safe to call repeatedly. */
export const arriveAt = async (elementId: string) => {
    if (arriving) return;
    arriving = true;

    try {
        // Hard loads (new tab, shared link) are covered by CSS from the head script until
        // this point; swap that for a real curtain so it can fade like a client navigation.
        const root = document.documentElement;
        if (root.hasAttribute("data-scroll-arrival")) {
            if (!getCurtain()) createCurtain(1);
            root.removeAttribute("data-scroll-arrival");
        }

        // Let the outgoing fade finish so the reposition below is never visible
        if (getCurtain()) await showCurtain();

        const target = await waitForStableTarget(elementId);
        if (!target) {
            hideCurtain();
            return;
        }

        if (prefersReducedMotion()) {
            setScroll(landingY(target));
            hideCurtain();
            return;
        }

        // Park about one screen above, then glide the last stretch as the page is revealed
        const finalY = landingY(target);
        const lead = Math.min(window.innerHeight * 0.75, 640);
        setScroll(Math.max(finalY - lead, 0));

        await waitForPreloader();
        hideCurtain();
        await glide(
            () => (target.isConnected && window.location.pathname === "/" ? landingY(target) : null),
            1.15,
        );
    } finally {
        arriving = false;
    }
};
