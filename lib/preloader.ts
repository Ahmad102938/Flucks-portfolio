export const PRELOADER_SESSION_KEY = "flucks-preloaded";

// Runs before first paint (inlined in <head>): repeat visits in the same session
// skip the overlay entirely via CSS, so there is no flash before hydration.
// Also covers the page (html[data-scroll-arrival] in globals.css) when it was opened with
// ?scroll=..., so a hard load lands on the target without first flashing the top of the page.
export const preloaderInitScript = `try{if(sessionStorage.getItem("${PRELOADER_SESSION_KEY}"))document.documentElement.setAttribute("data-preloaded","")}catch(e){}try{if(location.pathname==="/"&&/[?&]scroll=/.test(location.search))document.documentElement.setAttribute("data-scroll-arrival","")}catch(e){}`;
