// weather-service.mjs
import { nanoid } from "nanoid";

class WeatherService {
    constructor(deviceRepository, weatherRepository) {
        this.deviceRepository = deviceRepository;
        this.weatherRepository = weatherRepository;
    }

    async validateDevice(uploadKey) {
        const deviceResult = await this.deviceRepository.findByUploadKey(uploadKey);
        return deviceResult.Items.length > 0;
    }

    async saveWeatherData(uploadKey, data) {
        const timestamp = new Date().toISOString();
        const id = nanoid();
        await this.weatherRepository.saveWeatherData({ id, uploadKey, timestamp, data });
    }
}

export { WeatherService };