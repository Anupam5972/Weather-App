const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');

const API_KEY = 'YOUR_API_KEY';

locationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value;
    getWeatherData(location);
});

async function getWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error(error);
    }
}

function displayWeatherData(data) {
    const { name, main: { temp, temp_min, temp_max, humidity }, weather: [{ description, icon }], sys: { sunrise, sunset }, wind: { speed } } = data;

    // Create middle card with temperature data
    const middleCard = document.createElement("div");
    middleCard.classList.add("weather-card");
    middleCard.innerHTML = `
        <div class="weather-card-body blur-background">
            <style>
                .weather-card {
                    background-image: url("https://source.unsplash.com/1600x900/?${description}");
                    border-radius: 10px;
                }
            </style>
            <h2>${name}</h2>
            <p>Humidity: ${humidity}%&nbsp;&nbsp;&nbsp;&nbsp;Wind Speed: ${speed} m/s</p>
            <p>Max Temp: ${temp_max} &deg;C&nbsp;&nbsp;&nbsp;&nbsp;Min Temp: ${temp_min} &deg;C</p>
            <p>Description: ${description}</p>
            <p>Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString()}&nbsp;&nbsp;&nbsp;&nbsp;Sunset: ${new Date(sunset * 1000).toLocaleTimeString()}<br><img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}"></p>
        </div>
    `;
    weatherInfo.innerHTML = "";
    weatherInfo.appendChild(middleCard);

}
