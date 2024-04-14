// Define function to apply flame effect to all h2 elements with the specified class
function applyFlameEffect() {
    const h2Elements = document.querySelectorAll('.flame-h2');

    h2Elements.forEach(h2 => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = h2.offsetWidth;
        canvas.height = h2.offsetHeight;

        h2.appendChild(canvas);

        // Function to draw a flame
        function drawFlame() {
            const segments = 5; // Number of flame segments
            const segmentWidth = canvas.width / segments;
            const flameHeight = canvas.height * 0.6; // Adjust the height of the flame

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < segments; i++) {
                ctx.beginPath();
                ctx.moveTo(i * segmentWidth, canvas.height);

                // Draw a random curve for each segment
                ctx.bezierCurveTo(
                    i * segmentWidth + segmentWidth / 3, canvas.height - flameHeight * Math.random(),
                    i * segmentWidth + segmentWidth * 2 / 3, canvas.height - flameHeight * Math.random(),
                    (i + 1) * segmentWidth, canvas.height
                );

                ctx.lineTo((i + 1) * segmentWidth, canvas.height);
                ctx.closePath();

                // Fill flame segment with gradient color
                const gradient = ctx.createLinearGradient(i * segmentWidth, 0, (i + 1) * segmentWidth, 0);
                gradient.addColorStop(0, '#FF5722');
                gradient.addColorStop(0.5, '#FFA500');
                gradient.addColorStop(1, '#FFD700');
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }

        // Apply mask effect to the flame canvas
        function applyMask() {
            ctx.globalCompositeOperation = 'source-atop'; // Set operation to apply the mask
            ctx.font = 'bold 20px Arial'; // Adjust font size and style as needed
            ctx.fillText(h2.innerText, 10, canvas.height / 2); // Draw text as mask
        }

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            drawFlame();
            applyMask();
        }

        // Start the animation
        animate();
    });
}

// Apply flame effect when the page is loaded
window.addEventListener('load', applyFlameEffect);
