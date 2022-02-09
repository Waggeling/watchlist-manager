import axios from 'axios';

const WATCHED_SERIES_API_BASE_URL = "http://localhost:8080/watchedseries";

class WatchedSeriesService {

    getWatchedSeries() {
        return axios.get(WATCHED_SERIES_API_BASE_URL);
    }

    createWatchedSeries(watchedSeries) {
        return axios.post(WATCHED_SERIES_API_BASE_URL, watchedSeries);
    }
}

export default new WatchedSeriesService();