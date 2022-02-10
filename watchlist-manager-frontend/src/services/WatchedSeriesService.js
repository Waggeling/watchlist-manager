import axios from 'axios';

const WATCHED_SERIES_API_BASE_URL = "http://localhost:8080/watchedseries";

class WatchedSeriesService {

    getWatchedSeries() {
        return axios.get(WATCHED_SERIES_API_BASE_URL);
    }

    createWatchedSeries(watchedSeries) {
        return axios.post(WATCHED_SERIES_API_BASE_URL, watchedSeries);
    }

    getWatchedSeriesById(watchedSeriesId) {
        return axios.get(WATCHED_SERIES_API_BASE_URL + '/' + watchedSeriesId);
    }

    updateWatchedSeries(watchedSeriesId, watchedSeries) {
        return axios.put(WATCHED_SERIES_API_BASE_URL + '/' + watchedSeriesId, watchedSeries);
    }

    deleteWatchedSeries(watchedSeriesId) {
        return axios.delete(WATCHED_SERIES_API_BASE_URL + '/' + watchedSeriesId);
    }
}

export default new WatchedSeriesService();