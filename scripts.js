// STEP 1 : GETTING HTML ELEMENTS
const locationEl = document.getElementsByClassName('location');


//STATE LOADING STATE
if (locationEl) locationEl(text.content) = "Loading ...."
    //STEP 2: SETTING AND SENJDING COORDINATE TO API

// setting coordinates
const coordinate = {
        lat: -17.824858,
        lon: 31.053028
    }
    //setting api key
const apikey = "amveamcuz7sztbw47bskx3l0f1pai6rdr500bds9";
//built api urlwith coordinates and key
const apiUrl = "https://www.meteosource.com/api/v1/free/point?lat=-17.825&lon=31.033&sections=current&timezone=Africa/Harare&language=en&units=metric&key=amveamcuz7sztbw47bskx3l0f1pai6rdr500bds9";