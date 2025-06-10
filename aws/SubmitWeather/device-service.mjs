// device-service.mjs
/**
 * Service class responsible for handling device-related operations.
 */
class DeviceService {
    constructor(deviceRepository) {
        this.deviceRepository = deviceRepository;
    }
    /**
     * Validates if a device exists in the repository using the provided upload key.
     *
     * @param {string} uploadKey - The unique key associated with the device upload.
     * @return {Promise<boolean>} - A promise that resolves to true if the device exists, false otherwise.
     */
    async validateDevice(uploadKey) {
        const deviceResult = await this.deviceRepository.findByUploadKey(uploadKey);
        return deviceResult.Items.length > 0;
    }
}

export { DeviceService };