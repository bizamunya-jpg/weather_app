// STEP 1: GET ALL HTML ELEMENTS

// Get location element
const locationEl = document.getElementsByClassName('location')[0];

// Get temperature element
const temperatureEl = document.getElementsByClassName('temperature')[0];

// Get condition element
const conditionEl = document.getElementsByClassName('condition')[0];

// Get weather icon element
const weatherIcon = document.getElementsByClassName('weather-icon')[0];

// Get all value elements
const values = document.getElementsByClassName('value');

// First value is humidity
const humidityValue = values[0];

// Second value is wind speed
const windValue = values[1];


// STEP 2: LOADING STATE

if (locationEl) locationEl.textContent = 'Loading...';
if (temperatureEl) temperatureEl.textContent = '--°C';
if (conditionEl) conditionEl.textContent = 'Fetching weather data...';
if (humidityValue) humidityValue.textContent = '--%';
if (windValue) windValue.textContent = '-- km/h';

// STEP 3: SEND COORDINATES TO API


// Coordinates for Harare, Zimbabwe
const coordinates = {
    lat: -17.824858,
    lng: 31.053028
};

// API key for authentication
const apiKey = "amveamcuz7sztbw47bskx3l0f1pai6rdr500bds9";

// Build API URL with coordinates
const apiUrl = `[{"https://www.meteosource.com/api/v1/free/point?lat=-17.825&lon=31.033&sections=current&timezone=Africa/Harare&language=en&units=metric&key=amveamcuz7sztbw47bskx3l0f1pai6rdr500bds9`;
console.log('Fetching weather from:', apiUrl);

// Send request to API
fetch(apiUrl, {

    // STEP 4: GET DATA AS JSON FROM API

    .then(response => {
        // Checks if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Convert response to JSON
        return response.json();
    })
    .then(apiData => {
        console.log("Weather Data Received:", apiData);
        window.apiRESULT = apiData;


        // STEP 5: UPDATE DISPLAY WITH DATA

        // Update location
        if (apiData.location) {
            locationEl.textContent = `${apiData.location.name || 'Harare'}, ${apiData.location.country || 'Zimbabwe'}`;
        } else {
            locationEl.textContent = 'Harare, Zimbabwe';
        }

        // Update temperature
        if (apiData.current && apiData.current.temperature !== undefined) {
            const temp = Math.round(apiData.current.temperature);
            temperatureEl.textContent = `${temp}°C`;
        }

        // Update condition
        if (apiData.current) {
            if (apiData.current.weather) {
                conditionEl.textContent = apiData.current.weather;
            } else if (apiData.current.summary) {
                conditionEl.textContent = apiData.current.summary;
            } else {
                conditionEl.textContent = 'Weather data available';
            }
        }

        // Update humidity
        if (apiData.current && apiData.current.humidity !== undefined) {
            humidityValue.textContent = `${Math.round(apiData.current.humidity)}%`;
        }

        // Update wind speed
        if (apiData.current && apiData.current.wind) {
            const windSpeed = apiData.current.wind.speed || 0;
            const windUnit = apiData.current.wind.unit || 'km/h';
            windValue.textContent = `${Math.round(windSpeed)} ${windUnit}`;
        }

        // Update weather icon
        if (apiData.current && apiData.current.icon) {
            const iconCode = apiData.current.icon;
            const iconMap = {
                'clear_day': '☀️',
                'clear_night': '🌙',
                'cloudy': '☁️',
                'partly_cloudy_day': '⛅',
                'partly_cloudy_night': '🌤️',
                'rain': '🌧️',
                'snow': '❄️',
                'thunderstorm': '⛈️',
                'fog': '🌫️',
                'wind': '💨'
            };

            // Get emoji for weather condition
            const emoji = iconMap[iconCode] || '🌤️';

            // Update icon source
            weatherIcon.src = `icons/${iconCode}.png`;
            weatherIcon.alt = emoji;

        };

    })
})