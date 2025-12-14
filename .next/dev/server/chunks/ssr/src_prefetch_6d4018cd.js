module.exports = [
"[project]/src/prefetch.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// A universal, runtime-based preloader for internal links.
// This script is framework-agnostic and can be dropped into any modern web project.
__turbopack_context__.s([]);
(function() {
    // Ensure we're in a browser environment.
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
    // --- Configuration ---
    const PREFETCH_THROTTLE_MS = undefined;
    const IDLE_CALLBACK_TIMEOUT = undefined;
    // --- State ---
    const prefetched = undefined;
    let activePrefetches;
    let scanTimeout;
    // --- Utility Functions ---
    /**
     * Determines the max number of concurrent prefetches based on network conditions.
     * @returns {number} The limit for parallel prefetches.
     */ const getPrefetchLimit = undefined;
    /**
     * Creates and manages a <link rel="prefetch"> tag.
     * @param {string} url - The URL to prefetch.
     */ const prefetchUrl = undefined;
    /**
     * The callback for the IntersectionObserver.
     * @param {IntersectionObserverEntry[]} entries - The observed entries.
     */ const observerCallback = undefined;
    // --- Observers ---
    const intersectionObserver = undefined;
    const mutationObserver = undefined;
    /**
     * Scans the document for new, valid, internal links and observes them.
     */ const scanForLinks = undefined;
    // --- History Wrapper ---
    /**
     * Wraps history methods to trigger a re-scan on SPA navigation.
     * @param {('pushState'|'replaceState')} method - The history method to wrap.
     */ const wrapHistoryMethod = undefined;
    // --- Initialization ---
    /**
     * Sets up all the observers and initial scan.
     */ const initialize = undefined;
})();
}),
];

//# sourceMappingURL=src_prefetch_6d4018cd.js.map