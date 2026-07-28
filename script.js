// STEP 1: GET HTML ELEMENTS

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

// Get all metric cards (optional)
const metricCards = document.getElementsByClassName('metric-card');


// STEP 2: SEND COORDINATES TO API


// Coordinates for Harare, Zimbabwe
const coordinates = {
    lat: -17.824858,
    lng: 31.053028
};

// API key for authentication
const apiKey = "amveamcuz7sztbw47bskx3l0f1pai6rdr500bds9";

// Build API URL with coordinates
const apiUrl = `https://www.meteosource.com/api/v1/free/point?lat=${coordinates.lat}&lng=${coordinates.lng}`;

// Send request to API
fetch(apiUrl, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${apiKey}`
    }
})

// STEP 3: GET DATA AS JSON FROM API

// Process the response
.then(response => {
    // Checks if request was successful
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Convert response to JSON
    return response.json();
})

// STEP 4: GRABING THE DATA WE WANT FROM RESPONSE


// Extract specific data from API response
.then(apiData => {
    // Location data
    const cityName = apiData.location.name;
    const countryName = apiData.location.country;


    // Temperature data
    const temperature = apiData.current.temperature;
    const roundedTemp = Math.round(temperature);

    // Weather condition
    const weatherCondition = apiData.current.weather;

    // Humidity data
    const humidity = apiData.current.humidity;
    const roundedHumidity = Math.round(humidity);

    // Wind speed data
    const windSpeed = apiData.current.wind.speed;
    const windUnit = apiData.current.wind.unit;
    const roundedWind = Math.round(windSpeed);

    // Icon data
    const iconCode = apiData.current.icon;

    // STEP 5: SET DATA TO HTML ELEMENTS

    // Update location
    locationEl.textContent = `${cityName}, ${countryName}`;


    // Update temperature
    temperatureEl.textContent = `${roundedTemp}°C`;


    // Update condition
    conditionEl.textContent = weatherCondition;


    // Update humidity
    humidityValue.textContent = `${roundedHumidity}%`;


    // Update wind speed
    windValue.textContent = `${roundedWind} ${windUnit}`;


    // Update weather icon
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
    const weatherEmoji = iconMap[iconCode] || '🌤️';

    // Update icon source
    weatherIcon.src = `icons/${iconCode}.png`;
    weatherIcon.alt = weatherEmoji;

})