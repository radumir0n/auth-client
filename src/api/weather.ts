const baseUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m';

const getWeather = async () => {
    const response = await fetch(baseUrl)
    const data = await response.json()

    return data
}

export {
    getWeather
}