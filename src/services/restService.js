import axios from 'axios';

const urls = {
    historyItems: ''
}

class RestService {
    getHistoryItems = () => axios.get(urls.historyItems)
}