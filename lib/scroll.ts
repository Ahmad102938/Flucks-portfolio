export const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.scrollY;

    // Initial scroll
    window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
    });

    // Retry after a delay to account for layout shifts (e.g. navbar becoming fixed)
    // The delay should match or exceed the duration of typical scroll/layout animations
    setTimeout(() => {
        const newElement = document.getElementById(elementId);
        if (newElement) {
            const newTargetPosition = newElement.getBoundingClientRect().top + window.scrollY;
            // Only scroll again if we are significantly off (e.g. > 10px)
            if (Math.abs(window.scrollY - newTargetPosition) > 10) {
                window.scrollTo({
                    top: newTargetPosition,
                    behavior: "smooth",
                });
            }
        }
    }, 400); // 400ms is a safe bet for most layout shifts to settle
};
