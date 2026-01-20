export const smoothScrollTo = (elementId: string) => {
    const target = document.getElementById(elementId);
    if (!target) return;

    const startPosition = window.scrollY;
    // Calculate target position - accounting for potential navbar height if needed, 
    // but usually exact top is fine if layout handles padding.
    const targetPosition = target.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;

    const absDistance = Math.abs(distance);
    // Dynamic duration: Scale minimal duration relative to distance, but cap it.
    // Factor 1.5 means 1.5ms per pixel. 1000px = 1500ms. 4000px = ~4000ms (clamped at 3000ms).
    // This makes short scrolls faster and long scrolls slower but not agonizingly slow.
    const duration = Math.min(Math.max(absDistance * 1.5, 800), 3000);
    let startTime: number | null = null;

    // Easing function: easeInOutCubic for smooth acceleration and deceleration
    const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo({
            top: startPosition + distance * ease,
            behavior: "auto"
        });

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    };

    requestAnimationFrame(animation);
};
