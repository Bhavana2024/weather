const apiKey = 'cb75dc8efbd416b9f4eb6fa1b10a66fd';  
const weatherDataContainer = document.querySelector('.weather-data');

 async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw error;
  }
}

 function updateWeatherData(city) {
  getWeatherData(city)
    .then((data) => {
      const { name, main, weather } = data;
      const temperature = main.temp;
      const description = weather[0].description;

      const weatherHtml = `
        <h2>${name}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
      `;

      weatherDataContainer.innerHTML = weatherHtml;
    })
    .catch(() => {
      weatherDataContainer.innerHTML = '<p>City not found</p>';
    });
}

 document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const cityInput = document.querySelector('#city-input').value;
  updateWeatherData(cityInput);
});
