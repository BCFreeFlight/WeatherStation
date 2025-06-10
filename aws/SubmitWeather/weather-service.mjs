// weather-service.mjs
import { nanoid } from "nanoid";

class WeatherService {
    constructor(weatherRepository) {
        this.weatherRepository = weatherRepository;
    }

    async saveWeatherData(uploadKey, data) {
        const timestamp = new Date().toISOString();
        const id = nanoid();
        await this.weatherRepository.saveWeatherData({ id, uploadKey, timestamp, data });
    }
}

export { WeatherService };