var contactBtn = document.querySelector('.contact-btn')
var homePageBtn = document.querySelector('.home-page')
var homePagePanner = document.querySelector('.home-panner')
var homeSec = document.querySelector('.home')
var contactSec = document.querySelector('.contact')
var dataDisplayBox = document.querySelector('.data-con')

document.body.addEventListener('click', function (e) {
    if (e.target == contactBtn) {
        homeSec.classList.add('d-none')
        contactSec.classList.remove('d-none')
    }
    if (e.target == homePageBtn) {
        homeSec.classList.remove('d-none')
        contactSec.classList.add('d-none')
    }
    if (e.target == homePagePanner) {
        homeSec.classList.remove('d-none')
        contactSec.classList.add('d-none')
    }
})



let apiKey = '7540f0f17196412fadc165637251411';



async function displayWeather() {

    // Get geolocation
    navigator.geolocation.getCurrentPosition(async (pos) => {

        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        // Convert coords to city name
        let geoRes = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${lat},${lon}`);
        let geoData = await geoRes.json();
        let city = geoData[0].name;

        // Get 3days forecast
        let weatherRes = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`
        );
        let weatherData = await weatherRes.json();

        let days = weatherData.forecast.forecastday;

        let str = "";

        // Day 1 (Today)
        str += `
        <div class="item px-0">
            <div class="inner bg-body-day rounded-start-lg-3 rd-start-lg text-white-50">
                <div class="bg-day rd-start-top-lg d-flex justify-content-between px-2">
                    <p class="m-0 py-2 px-2">${new Date(days[0].date).toLocaleDateString("en-US", { weekday: "long" })}</p>
                    <p class="m-0 py-2 px-2">${days[0].date}</p>
                </div>
                <div class="px-3 pb-4">
                    <p class="city my-3 fs-3">${city}</p>
                    <p class="text-white display-3 fw-semibold mb-4">${days[0].day.avgtemp_c}°C</p>

                    <div class="mb-2 mt-3">
                        <img src="https:${days[0].day.condition.icon}" width="80">
                    </div>

                    <strong class="main-color fs-5 mb-3 fw-semibold d-block">${days[0].day.condition.text}</strong>

                    <div class="d-flex gap-3">
                        <span><i class="fa-solid fa-umbrella"></i> ${days[0].day.daily_chance_of_rain}%</span>
                        <span><i class="fa-solid fa-wind"></i> ${days[0].day.maxwind_kph} km/h</span>
                        <span><i class="fa-regular fa-compass"></i> ${weatherData.current.wind_dir}</span>
                    </div>
                </div>
            </div>
        </div>
        `;

        //Day 2
        str += `
        <div class="item px-0">
            <div class="inner bg-body-day2 pb-5 text-white-50">
                <div class="bg-day2 d-flex justify-content-center px-2">
                    <p class="m-0 py-2 px-2">${new Date(days[1].date).toLocaleDateString("en-US", { weekday: "long" })}</p>
                </div>
                <div class="px-3 pb-3">
                    <div class="text-center">
                        <div class="pt-5 my-1">
                            <img src="https:${days[1].day.condition.icon}" width="70">
                        </div>
                        <p class="text-white fs-1 fw-semibold mb-4">${days[1].day.avgtemp_c}°C</p>
                        <strong class="main-color pb-4 pt-3 fs-5 mb-3 fw-semibold d-block">
                            ${days[1].day.condition.text}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
        `;

        //Day 3
        str += `
        <div class="item px-0">
            <div class="inner bg-body-day rd-end-lg pb-5 text-white-50">
                <div class="bg-day2 d-flex  rd-end-top-lg justify-content-center px-2">
                    <p class="m-0 py-2 px-2">${new Date(days[2].date).toLocaleDateString("en-US", { weekday: "long" })}</p>
                </div>
                <div class="px-3 pb-3">
                    <div class="text-center">
                        <div class="pt-5 my-1">
                            <img src="https:${days[2].day.condition.icon}" width="70">
                        </div>
                        <p class="text-white fs-1 fw-semibold mb-4">${days[2].day.avgtemp_c}°C</p>
                        <strong class="main-color pb-4 pt-3 fs-5 mb-3 fw-semibold d-block">
                            ${days[2].day.condition.text}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
        `;

        dataDisplayBox.innerHTML = str;

    }

);
}

displayWeather();


async function displaySearchWeather(city) {

        let weatherRes = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`
        );

        let weatherData = await weatherRes.json();
        let days = weatherData.forecast.forecastday;

        let str = "";

        // Day 1
        str += `
        <div class="item px-0">
            <div class="inner bg-body-day rounded-start-lg-3 rd-start-lg text-white-50">
                <div class="bg-day rd-start-top-lg d-flex justify-content-between px-2">
                    <p class="m-0 py-2 px-2">${new Date(days[0].date).toLocaleDateString("en-US", { weekday: "long" })}</p>
                    <p class="m-0 py-2 px-2">${days[0].date}</p>
                </div>
                <div class="px-3 pb-4">
                    <p class="city my-3 fs-3">${weatherData.location.name}</p>
                    <p class="text-white display-3 fw-semibold mb-4">${days[0].day.avgtemp_c}°C</p>

                    <div class="mb-2 mt-3">
                        <img src="https:${days[0].day.condition.icon}" width="80">
                    </div>

                    <strong class="main-color fs-5 mb-3 fw-semibold d-block">${days[0].day.condition.text}</strong>

                    <div class="d-flex gap-3">
                        <span><i class="fa-solid fa-umbrella"></i> ${days[0].day.daily_chance_of_rain}%</span>
                        <span><i class="fa-solid fa-wind"></i> ${days[0].day.maxwind_kph} km/h</span>
                        <span><i class="fa-regular fa-compass"></i> ${weatherData.current.wind_dir}</span>
                    </div>
                </div>
            </div>
        </div>
        `;

        // Day 2
        str += `
        <div class="item px-0">
            <div class="inner bg-body-day2 pb-5 text-white-50">
                <div class="bg-day2 d-flex justify-content-center px-2">
                    <p class="m-0 py-2 px-2">${new Date(days[1].date).toLocaleDateString("en-US", { weekday: "long" })}</p>
                </div>
                <div class="px-3 pb-3">
                    <div class="text-center">
                        <div class="pt-5 my-1">
                            <img src="https:${days[1].day.condition.icon}" width="70">
                        </div>
                        <p class="text-white fs-1 fw-semibold mb-4">${days[1].day.avgtemp_c}°C</p>
                        <strong class="main-color pb-4 pt-3 fs-5 mb-3 fw-semibold d-block">
                            ${days[1].day.condition.text}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
        `;

        // Day 3
        str += `
        <div class="item px-0">
            <div class="inner bg-body-day rd-end-lg pb-5 text-white-50">
                <div class="bg-day2 d-flex rd-end-top-lg justify-content-center px-2">
                    <p class="m-0 py-2 px-2">${new Date(days[2].date).toLocaleDateString("en-US", { weekday: "long" })}</p>
                </div>
                <div class="px-3 pb-3">
                    <div class="text-center">
                        <div class="pt-5 my-1">
                            <img src="https:${days[2].day.condition.icon}" width="70">
                        </div>
                        <p class="text-white fs-1 fw-semibold mb-4">${days[2].day.avgtemp_c}°C</p>
                        <strong class="main-color pb-4 pt-3 fs-5 mb-3 fw-semibold d-block">
                            ${days[2].day.condition.text}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
        `;

        dataDisplayBox.innerHTML = str;

}


let searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
    let city = searchInput.value.trim();

    // if input was empty 
    if (city === "") {
        displayWeather();
        return;
    }

    
    displaySearchWeather(city);
});
