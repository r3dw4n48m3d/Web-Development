 function XSS() {
            return decodeURIComponent(window.location.search).includes('<') || decodeURIComponent(window.location.search).includes('>') || decodeURIComponent(window.location.hash).includes('<') || decodeURIComponent(window.location.hash).includes('>')
        }
        function getParameterByName(name) {
            var url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&"); // This line Skip `[]` this Brakets
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
            results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        // Function to redirect on form submit
        function redirectToText(event) {
            event.preventDefault();
            const inputBox = document.getElementById('inputBox');
            const text = encodeURIComponent(inputBox.value);
            window.location.href = `/challenge?text=${text}`;
        }

        // Function to display modal if 'text' query param exists
        function checkQueryParam() {
            const text = getParameterByName('text');
            if (text && XSS() === false) {
                const modal = document.getElementById('modal');
                const modalText = document.getElementById('modalText');
                modalText.innerHTML = `Welcome, ${text}!`;
                textForm.remove()
                modal.style.display = 'flex';
            }
        }

        // Function to close the modal
        function closeModal() {
            location.replace('/challenge')
        }

        // Function to generate random color
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // Function to generate falling particles
        function generateFallingParticles() {
            const particlesContainer = document.getElementById("particles");

            // Generate 100 particles with different animations, positions, and colors
            for (let i = 0; i < 100; i++) {
                let particle = document.createElement("div");
                particle.classList.add("falling-particle");

                // Randomize the particle's left position
                particle.style.left = Math.random() * 100 + "vw";  // Left position from 0 to 100% of viewport width

                // Randomize the particle's color
                particle.style.backgroundColor = getRandomColor();

                // Randomize animation delays
                particle.style.animationDelay = Math.random() * 5 + "s";  // Random delay for staggered fall
                particlesContainer.appendChild(particle);
            }
        }

        // Generate particles when the page loads
        window.onload = function () {
            generateFallingParticles();
            checkQueryParam();
        };