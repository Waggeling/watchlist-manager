import React, { Component } from 'react';
import WatchedSeriesService from '../services/WatchedSeriesService';

export default class ListWatchedSeriesComponent extends Component {
  
    constructor(props) {
        super(props)

        this.state = {
            watchedSeries: []
        }
    }
  
    componentDidMount() {
        WatchedSeriesService.getWatchedSeries().then((res) => {
            this.setState({watchedSeries: res.data});
        })
    }

    render() {
    return <div>
        <h2 className='text-center'>Watched Series List</h2>
        <div className='row'>
            <table className='table table-spriped table-bordered'>
                <thead>
                    <tr>
                        <th>Rating</th>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Year Watched</th>
                        <th>Production Country</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.watchedSeries.map(
                            watchedSeries =>
                            <tr key={watchedSeries.id}>
                                <td>{watchedSeries.rating}</td>
                                <td>{watchedSeries.name}</td>
                                <td>{watchedSeries.genre}</td>
                                <td>{watchedSeries.yearWatched}</td>
                                <td>{watchedSeries.productionCountry}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    </div>;
  }
}
