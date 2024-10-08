document.addEventListener('DOMContentLoaded', () => {
    const city = document.getElementById('cityName');
    const getWeatherBtn = document.getElementById('getWeather');
    const errorMsg = document.getElementById('error-msg');
    const weatherInfo = document.getElementById('weather-info');
    const API_KEY = '11d8f712fe52da4400bddcba87b500da';
    let cityName = '';

    getWeatherBtn.addEventListener('click', async () => {
        cityName = city.value.trim();
        if (!cityName) return;

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
            let data = await fetchWeatherData(url);
            displayWeatherData(data);
            weatherInfo.classList.remove('hidden');
        } catch (error) {
            showError();
            weatherInfo.classList.add('hidden');
        }

    });

    function displayWeatherData(data) {
        console.log(data);
        document.getElementById('city').textContent = `City : ${data.name}`;
        document.getElementById('temp').textContent = `Temperature : ${data.main.temp} °K`;
        document.getElementById('desc').textContent = `Description : ${data.weather[0].description}`;
        document.getElementById('humidity').textContent = `Humidity : ${data.main.humidity} %`;
        document.getElementById('pressure').textContent = `Pressure : ${data.main.pressure} hPa`;
        document.getElementById('wind-speed').textContent = `Wind Speed : ${data.wind.speed} m/s`;
        document.getElementById('visibility').textContent = `Visibility : ${data.visibility} m`;
        document.getElementById('sunrise').textContent = `Sunrise : ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
        document.getElementById('sunset').textContent = `Sunset : ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
    }

    function showError() {
        errorMsg.style.display = 'block';
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 2000);
    }

    async function fetchWeatherData(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch weather data');
        }
    }
});