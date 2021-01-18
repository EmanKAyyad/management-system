import axios from 'axios';

const urls = {
    vehiclesURL: 'https://my-json-server.typicode.com/EmanKAyyad/management-system/vehicles'
}

class RestService {
    getVehicles = () => axios.get(urls.vehiclesURL);
}
const restService = new RestService();
export default restService;