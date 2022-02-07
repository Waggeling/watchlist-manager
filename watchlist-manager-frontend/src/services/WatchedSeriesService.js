import axios from 'axios';

const WATCHED_SERIES_API_BASE_URL = "http://localhost:8080/watchedseries";

class WatchedSeriesService {

    getWatchedSeries() {
        return axios.get(WATCHED_SERIES_API_BASE_URL);
    }
}

export default new WatchedSeriesService();