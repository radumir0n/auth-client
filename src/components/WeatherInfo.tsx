import { useQuery } from "react-query"
import { getWeather } from "../api/weather"

const WeatherInfo: React.FC = () => {
    const { data, isError, isLoading } = useQuery<any>('weather', getWeather)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error!</div>

    return (
      <div className="container">
        <div className="container block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h1 className="mb-4 text-4xl">Weather Info</h1>
            <ul>
                <li key='0'>Latitude: { data.latitude }</li>
                <li key='1'>Longitude: { data.longitude }</li>
                <li key='2'>Temperature: {data.current_weather.temperature}{data.hourly_units.temperature_2m}</li>
            </ul>
        </div>
      </div>
    );
}

export default WeatherInfo
