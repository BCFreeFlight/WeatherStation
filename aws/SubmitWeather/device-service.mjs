// device-service.mjs
class DeviceService {
    constructor(deviceRepository) {
        this.deviceRepository = deviceRepository;
    }
    async validateDevice(uploadKey) {
        const deviceResult = await this.deviceRepository.findByUploadKey(uploadKey);
        return deviceResult.Items.length > 0;
    }
}

export { DeviceService };