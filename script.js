// STEP 1 : GETTING HTML ELEMENTS
const locationEl = document.getElementsByClassName('location');
const temperatureEl = document.getElementsByClassName('temperature')[0];
const conditionEl = document.getElementsByClassName('condition')[0];
const weatherIcon = document.getElementsByClassName('weather-icon')[0];
const values = document.getElementsByClassName('value');
const humidityValue = values[0];
const windValue = values[1];


//STEP 2: SETTING AND SENJDING COORDINATE TO API

// setting coordinates
const coordinate = {
        lat: -17.824858,
        lon: 31.053028
    }
    //setting api key
const apikey = "amveamcuz7sztbw47bskx3l0f1pai6rdr500bds9";

//built api urlwith coordinates and key
const apiUrl = `https://www.meteosource.com/api/v1/free/point?lat=-17.825&lon=31.033&sections=current&timezone=Africa/Harare&language=en&units=metric&key=amveamcuz7sztbw47bskx3l0f1pai6rdr500bds9`;
console.log("Fetching weather from:", apiUrl);

//Sending Request to API
fetch(apiUrl)
    // STEP 3: GET DATA AS JSON FROM API
    .then(response => response.json())
    .then(data => {
        console.log("Data parsed from JSON:", data);


        // STEP 4: UPDATE DISPLAY WITH DATA

        //update temperature
        document.querySelector(".temperature").textContent =
            `${data.current.temperature}°C`;

        //update condition
        document.querySelector(".condition").textContent =
            data.current.summary;

        //update location
        document.querySelector(".location").textContent =
            "Harare, Zimbabwe";

        // Update wind speed
        document.querySelector(".wind-speed").textContent =
            `${Math.round(data.current.wind.speed)} km/h`;

        // Update weather icon
        if (data.current && data.current.icon) {
            const iconCode = data.current.icon;

            const iconMap = {
                clear: "☀️",
                clear_day: "☀️",
                clear_night: "🌙",
                cloudy: "☁️",
                partly_cloudy: "⛅",
                partly_cloudy_day: "⛅",
                partly_cloudy_night: "🌤️",
                rain: "🌧️",
                snow: "❄️",
                thunderstorm: "⛈️",
                fog: "🌫️",
                wind: "💨"
            };

            const weatherIcon = document.querySelector(".weather-icon");

            if (weatherIcon) {
                weatherIcon.textContent = iconMap[iconCode] || "🌤️";
            }
        }

    })
    .catch(error => {
        console.error(error);
    });