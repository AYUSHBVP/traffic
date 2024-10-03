const trafficLights = document.querySelectorAll('.traffic-light');

let currentLightIndex = 0; // This keeps track of the current state
let lightInterval;
let previousLightIndex; // Store the previous light index

// Define the traffic light states
const lightPatterns = [
    { first: 'yellow', second: 'red', third: 'green' },   // State 1
    { first: 'green', second: 'yellow', third: 'red' },   // State 2
    { first: 'red', second: 'green', third: 'yellow' },   // State 3
];

function changeLight() {
    // Reset all lights
    trafficLights.forEach((light, index) => {
        const red = light.querySelector('.red');
        const yellow = light.querySelector('.yellow');
        const green = light.querySelector('.green');

        red.classList.remove('active');
        yellow.classList.remove('active');
        green.classList.remove('active');

        // Set the lights based on the current pattern
        if (index === 0) {
            red.classList.toggle('active', lightPatterns[currentLightIndex].first === 'red');
            yellow.classList.toggle('active', lightPatterns[currentLightIndex].first === 'yellow');
            green.classList.toggle('active', lightPatterns[currentLightIndex].first === 'green');
        } else if (index === 1) {
            red.classList.toggle('active', lightPatterns[currentLightIndex].second === 'red');
            yellow.classList.toggle('active', lightPatterns[currentLightIndex].second === 'yellow');
            green.classList.toggle('active', lightPatterns[currentLightIndex].second === 'green');
        } else if (index === 2) {
            red.classList.toggle('active', lightPatterns[currentLightIndex].third === 'red');
            yellow.classList.toggle('active', lightPatterns[currentLightIndex].third === 'yellow');
            green.classList.toggle('active', lightPatterns[currentLightIndex].third === 'green');
        }
    });
}

// Start traffic light cycle
function startTrafficLight() {
    changeLight(); // Initialize the first light state
    lightInterval = setInterval(() => {
        currentLightIndex = (currentLightIndex + 1) % lightPatterns.length; // Move to the next state
        changeLight(); // Change the lights
    }, 10000); // Change every 10 seconds
}

// Emergency button logic
trafficLights.forEach((trafficLight, index) => {
    const ambulanceBtn = trafficLight.querySelector('.ambulance-btn');
    const fireBrigadeBtn = trafficLight.querySelector('.fire-brigade-btn');

    // Ambulance logic
    ambulanceBtn.addEventListener('click', () => {
        activateEmergencyLight(index);
    });

    // Fire brigade van logic
    fireBrigadeBtn.addEventListener('click', () => {
        activateEmergencyLight(index);
    });
});

// Function to handle emergency light activation
function activateEmergencyLight(index) {
    clearInterval(lightInterval); // Stop the normal light cycle

    // Store the current light index
    previousLightIndex = currentLightIndex;

    // Set all lights to red except the selected one
    trafficLights.forEach((light, i) => {
        const red = light.querySelector('.red');
        const yellow = light.querySelector('.yellow');
        const green = light.querySelector('.green');

        if (i === index) {
            red.classList.remove('active');
            yellow.classList.remove('active');
            green.classList.add('active'); // Turn green for the emergency
        } else {
            red.classList.add('active'); // Turn red for other lights
            yellow.classList.remove('active');
            green.classList.remove('active');
        }
    });

    // After 5 seconds, revert to the previous state
    setTimeout(() => {
        currentLightIndex = previousLightIndex; // Resume from the same state
        changeLight(); // Update lights immediately

        // Keep the previous state for 10 seconds before moving to the next
        lightInterval = setInterval(() => {
            currentLightIndex = (currentLightIndex + 1) % lightPatterns.length; // Move to the next state
            changeLight(); // Change the lights
        }, 10000); // Change every 10 seconds

    }, 5000); // Keep the selected light green for 5 seconds
}

// Initialize traffic light
startTrafficLight(); // Start the cycle

