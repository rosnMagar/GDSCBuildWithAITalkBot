(async function () {
    const meter = document.getElementById('meter');
    // const status = document.getElementById('status');

    try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // status.textContent = "Status: Microphone active";

        // Create an audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);

        // Create an analyser node
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // Smaller FFT size for quick response
        source.connect(analyser);

        // Data array for capturing frequency data
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function updateMeter() {
            // Get the audio data
            analyser.getByteTimeDomainData(dataArray);

            // Calculate the amplitude (volume level)
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                const value = (dataArray[i] - 128) / 128; // Normalize between -1 and 1
                sum += value * value;
            }
            const rms = Math.sqrt(sum / dataArray.length); // Root mean square
            const level = Math.min(rms * 100, 100); // Scale to 0-100%

            // Update the meter
            meter.style.scale =  `${level + 75}%`

            // Loop the animation
            requestAnimationFrame(updateMeter);
        }

        updateMeter(); // Start the meter
    } catch (err) {
        // status.textContent = `Status: Error - ${err.message}`;
        console.error("Microphone access denied or error occurred:", err);
    }
})();