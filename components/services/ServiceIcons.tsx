import React from "react";

// Web Icon: Collaborative Design & Dev Scene
export const IconWeb = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="webBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="webAccentGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="webScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.3" />
            </linearGradient>
        </defs>

        {/* --- Background Gears/Abstract --- */}
        <g opacity="0.15">
            <circle cx="320" cy="60" r="40" stroke="white" strokeWidth="4" strokeDasharray="10 10" className="animate-[spin_10s_linear_infinite]" />
            <path d="M50 100 Q 100 50, 150 100 T 250 100" stroke="white" strokeWidth="2" fill="none" />
        </g>

        {/* --- Main Interface Screen (Center) --- */}
        <rect x="80" y="60" width="240" height="180" rx="12" fill="url(#webBgGrad)" stroke="url(#webAccentGrad)" strokeWidth="1.5" />

        {/* Screen Header */}
        <path d="M80 72 Q 80 60, 92 60 H 308 Q 320 60, 320 72 V 85 H 80 V 72 Z" fill="#1e1b4b" fillOpacity="0.5" />
        <circle cx="100" cy="72" r="3" fill="#ef4444" />
        <circle cx="112" cy="72" r="3" fill="#f59e0b" />
        <circle cx="124" cy="72" r="3" fill="#10b981" />

        {/* Screen Content: Layout Blocks */}
        {/* Left Sidebar */}
        <rect x="95" y="100" width="50" height="120" rx="4" fill="white" fillOpacity="0.05" />
        <line x1="100" y1="110" x2="140" y2="110" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
        <line x1="100" y1="125" x2="130" y2="125" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
        <line x1="100" y1="140" x2="135" y2="140" stroke="white" strokeOpacity="0.2" strokeWidth="2" />

        {/* Main Content Area */}
        <rect x="155" y="100" width="150" height="80" rx="4" fill="url(#webScreenGrad)" />
        {/* Abstract Image/Media in content */}
        <path d="M190 130 L 210 110 L 230 130" stroke="white" strokeOpacity="0.3" strokeWidth="2" fill="none" />
        <circle cx="210" cy="120" r="5" fill="white" fillOpacity="0.3" />

        {/* Bottom Content Area */}
        <rect x="155" y="190" width="70" height="30" rx="4" fill="white" fillOpacity="0.05" />
        <rect x="235" y="190" width="70" height="30" rx="4" fill="white" fillOpacity="0.05" />


        {/* --- Characters / Avatars --- */}

        {/* 1. Developer (Bottom Left) */}
        <g transform="translate(60, 200)">
            {/* Head */}
            <circle cx="20" cy="10" r="12" fill="#a78bfa" />
            {/* Body */}
            <path d="M0 45 Q 20 20, 40 45 V 60 H 0 Z" fill="#6d28d9" />
            {/* Laptop Back */}
            <path d="M15 35 H 55 L 60 55 H 10 Z" fill="#303030" />
            <rect x="18" y="25" width="25" height="18" fill="#1e1e1e" rx="2" transform="rotate(-5 30 35)" />
        </g>

        {/* 2. Designer (Top Right - Floating/Ladder metaphor) */}
        <g transform="translate(300, 100)">
            {/* Ladder rails abstract */}
            <line x1="10" y1="50" x2="10" y2="120" stroke="white" strokeOpacity="0.1" strokeWidth="2" />
            <line x1="30" y1="60" x2="30" y2="130" stroke="white" strokeOpacity="0.1" strokeWidth="2" />

            {/* Character */}
            <circle cx="15" cy="0" r="10" fill="#f472b6" />
            <path d="M-5 35 Q 15 10, 35 35 V 50 H -5 Z" fill="#db2777" />
            {/* Arm pointing */}
            <path d="M5 25 L -15 15" stroke="#db2777" strokeWidth="3" strokeLinecap="round" />
        </g>


        {/* --- Floating Elements (Bubbles) --- */}

        {/* Code Bubble */}
        <g transform="translate(45, 140)" className="animate-bounce">
            <circle cx="0" cy="0" r="22" fill="#ea580c" />
            <path d="M-8 -5 L -14 0 L -8 5 M 8 -5 L 14 0 L 8 5 M -3 7 L 3 -7" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Analytics/Chart Bubble */}
        <g transform="translate(80, 250)" className="animate-[pulse_3s_infinite]">
            <circle cx="0" cy="0" r="18" fill="#db2777" />
            <rect x="-8" y="0" width="4" height="8" fill="white" />
            <rect x="-2" y="-5" width="4" height="13" fill="white" />
            <rect x="4" y="-2" width="4" height="10" fill="white" />
        </g>

        {/* Idea/Lightbulb Bubble */}
        <g transform="translate(330, 60)" className="animate-[ping_4s_infinite]">
            <circle cx="0" cy="0" r="15" fill="#f59e0b" fillOpacity="0.8" />
            {/* Bulb icon simplified */}
            <circle cx="0" cy="0" r="6" stroke="white" strokeWidth="1.5" />
            <line x1="0" y1="8" x2="0" y2="12" stroke="white" strokeWidth="1.5" />
        </g>

        {/* Video/Play Bubble */}
        <g transform="translate(40, 80)">
            <circle cx="0" cy="0" r="16" fill="#6366f1" />
            <path d="M-2 -5 L 6 0 L -2 5 Z" fill="white" />
        </g>

    </svg>
);

// App Icon: Smartphone layout
export const IconApp = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gradApp" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="strokeApp" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
        </defs>

        {/* Phone Frame */}
        <rect x="130" y="20" width="140" height="260" rx="20" fill="url(#gradApp)" stroke="url(#strokeApp)" strokeWidth="2" />

        {/* Notch */}
        <path d="M180 20 L220 20 L215 35 L185 35 Z" fill="#000" fillOpacity="0.5" />

        {/* Screen Elements */}
        {/* Header */}
        <rect x="145" y="50" width="110" height="40" rx="8" fill="url(#strokeApp)" fillOpacity="0.2" />

        {/* Cards */}
        <rect x="145" y="100" width="50" height="50" rx="8" fill="url(#strokeApp)" fillOpacity="0.6" />
        <rect x="205" y="100" width="50" height="50" rx="8" fill="url(#strokeApp)" fillOpacity="0.3" />
        <rect x="145" y="160" width="110" height="30" rx="8" fill="url(#strokeApp)" fillOpacity="0.4" />
        <rect x="145" y="200" width="110" height="60" rx="8" fill="url(#strokeApp)" fillOpacity="0.2" />

        {/* Floating Icons around */}
        <circle cx="100" cy="80" r="15" stroke="url(#strokeApp)" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_4s_linear_infinite]" />
        <rect x="290" y="180" width="20" height="20" rx="4" stroke="url(#strokeApp)" strokeWidth="1" className="animate-bounce" />
    </svg>
);

// AI Icon: Brain/Network
export const IconAI = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gradAI" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="strokeAI" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
        </defs>

        {/* Central Hub */}
        <circle cx="200" cy="150" r="40" fill="url(#gradAI)" stroke="url(#strokeAI)" strokeWidth="2" />
        <path d="M185 150 L215 150 M200 135 L200 165" stroke="url(#strokeAI)" strokeWidth="2" strokeOpacity="0.5" />

        {/* Nodes */}
        <circle cx="120" cy="80" r="10" fill="#000" stroke="url(#strokeAI)" strokeWidth="2" />
        <circle cx="280" cy="80" r="10" fill="#000" stroke="url(#strokeAI)" strokeWidth="2" />
        <circle cx="100" cy="200" r="10" fill="#000" stroke="url(#strokeAI)" strokeWidth="2" />
        <circle cx="300" cy="200" r="10" fill="#000" stroke="url(#strokeAI)" strokeWidth="2" />
        <circle cx="200" cy="250" r="10" fill="#000" stroke="url(#strokeAI)" strokeWidth="2" />

        {/* Connections */}
        <path d="M128 86 L180 130" stroke="url(#strokeAI)" strokeWidth="1" opacity="0.6" />
        <path d="M272 86 L220 130" stroke="url(#strokeAI)" strokeWidth="1" opacity="0.6" />
        <path d="M110 195 L170 165" stroke="url(#strokeAI)" strokeWidth="1" opacity="0.6" />
        <path d="M290 195 L230 165" stroke="url(#strokeAI)" strokeWidth="1" opacity="0.6" />
        <path d="M200 240 L200 190" stroke="url(#strokeAI)" strokeWidth="1" opacity="0.6" />

        {/* Pulses */}
        <circle cx="200" cy="150" r="50" stroke="url(#strokeAI)" strokeWidth="1" opacity="0.3" className="animate-ping" />
    </svg>
);

// Automation Icon: Gears/Flow
export const IconAutomation = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gradAuto" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="strokeAuto" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f87171" />
            </linearGradient>
        </defs>

        {/* Pipeline Line */}
        <path d="M50 150 L350 150" stroke="url(#strokeAuto)" strokeWidth="2" strokeDasharray="8 4" />

        {/* Nodes on pipeline */}
        <rect x="80" y="130" width="40" height="40" rx="4" fill="url(#gradAuto)" stroke="url(#strokeAuto)" strokeWidth="2" />
        <rect x="180" y="130" width="40" height="40" rx="10" fill="url(#gradAuto)" stroke="url(#strokeAuto)" strokeWidth="2" className="animate-spin" />
        <rect x="280" y="130" width="40" height="40" rx="4" fill="url(#gradAuto)" stroke="url(#strokeAuto)" strokeWidth="2" />

        {/* Floating cards moving to right */}
        <rect x="140" y="100" width="20" height="15" rx="2" fill="url(#strokeAuto)" fillOpacity="0.8">
            <animate attributeName="x" from="140" to="240" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </rect>

        {/* Connecting Curves */}
        <path d="M100 170 C100 220, 180 220, 180 170" stroke="url(#strokeAuto)" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M200 170 C200 220, 300 220, 300 170" stroke="url(#strokeAuto)" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
);
