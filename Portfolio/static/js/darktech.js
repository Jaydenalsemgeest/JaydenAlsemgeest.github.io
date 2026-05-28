document.addEventListener('DOMContentLoaded', () => {

    let pageStart = Date.now();

    let mouseMoves = 0;
    let scrollEvents = 0;

    let liveInterval = null;
    let fineTimeout = null;
    let fineLiveInterval = null;

    const revealBtn = document.getElementById('reveal-btn');
    const analysisBox = document.getElementById('analysis-box');

    const timeEl = document.getElementById('time-result');
    const mouseEl = document.getElementById('mouse-result');
    const scrollEl = document.getElementById('scroll-result');
    const statusEl = document.getElementById('status-line');

    const fineBox = document.getElementById('fine-document');

    if (!revealBtn || !analysisBox) return;

    // =========================
    // TRACKING
    // =========================

    document.addEventListener('mousemove', () => mouseMoves++);
    document.addEventListener('scroll', () => scrollEvents++);

    function formatTime(seconds) {
        if (seconds < 60) return seconds.toFixed(1) + 's';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}m ${s}s`;
    }

    function generateCaseId() {
        return "DT-" + Math.floor(Math.random() * 999999);
    }

    function calculateFine(totalTime, mouseMoves) {
        return Math.min(250, Math.floor(totalTime * 2 + mouseMoves * 0.05));
    }

    // =========================
    // LIVE ANALYSIS DISPLAY
    // =========================

    function updateMetrics() {
        const totalTime = (Date.now() - pageStart) / 1000;

        timeEl.textContent = formatTime(totalTime);
        mouseEl.textContent = mouseMoves;
        scrollEl.textContent = scrollEvents;
    }

    function startLiveUpdates() {
        if (liveInterval) return;

        liveInterval = setInterval(() => {

            updateMetrics();

            const states = [
                "ANALYSING USER...",
                "TRACKING BEHAVIOUR...",
                "EVALUATING ATTENTION...",
                "PROCESSING DATA STREAM...",
                "USER PROFILE ACTIVE"
            ];

            statusEl.textContent =
                states[Math.floor(Math.random() * states.length)];

        }, 500);
    }

    function stopLiveUpdates() {
        clearInterval(liveInterval);
        liveInterval = null;
    }

    // =========================
    // FINE LIVE UPDATE (NIEUW)
    // =========================

    function updateFine() {

        const totalTime = (Date.now() - pageStart) / 1000;

        document.getElementById('fine-time').textContent =
            Math.floor(totalTime) + "s";

        document.getElementById('fine-mouse').textContent =
            mouseMoves;

        document.getElementById('fine-amount').textContent =
            calculateFine(totalTime, mouseMoves);
    }

    function startFineLiveUpdates() {

        if (fineLiveInterval) return;

        fineLiveInterval = setInterval(() => {
            updateFine();
        }, 5000); // ⬅️ elke 5 seconden
    }

    function stopFineLiveUpdates() {
        clearInterval(fineLiveInterval);
        fineLiveInterval = null;
    }

    // =========================
    // SHOW / HIDE FINE
    // =========================

    function showFineDocument() {

        if (!fineBox) return;

        document.getElementById('case-id').textContent =
            generateCaseId();

        updateFine();

        fineBox.style.display = 'block';

        startFineLiveUpdates(); // ⬅️ start live updates
    }

    function hideFineDocument() {

        if (fineBox) {
            fineBox.style.display = 'none';
        }

        stopFineLiveUpdates(); // ⬅️ stop updates
    }

    // =========================
    // MAIN TOGGLE
    // =========================

    revealBtn.addEventListener('click', () => {

        const isVisible =
            analysisBox.classList.contains('visible');

        if (isVisible) {
            analysisBox.classList.remove('visible');
            stopLiveUpdates();
            hideFineDocument();
            return;
        }

        analysisBox.classList.add('visible');

        updateMetrics();
        startLiveUpdates();

        hideFineDocument();

        clearTimeout(fineTimeout);

        fineTimeout = setTimeout(() => {
            showFineDocument();
        }, 2500);

    });

});