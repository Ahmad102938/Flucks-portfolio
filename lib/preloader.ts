export const PRELOADER_SESSION_KEY = "flucks-preloaded";

// Runs before first paint (inlined in <head>): repeat visits in the same session
// skip the overlay entirely via CSS, so there is no flash before hydration.
export const preloaderInitScript = `try{if(sessionStorage.getItem("${PRELOADER_SESSION_KEY}"))document.documentElement.setAttribute("data-preloaded","")}catch(e){}`;
