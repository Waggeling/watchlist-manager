import React, { Component } from 'react';
import WatchedSeriesService from '../services/WatchedSeriesService';

export default class ListWatchedSeriesComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            watchedSeries: []
        }
        this.addWatchedSeries = this.addWatchedSeries.bind(this);
        this.updateWatchedSeries = this.updateWatchedSeries.bind(this);
        this.deleteWatchedSeries = this.deleteWatchedSeries.bind(this);
    }
  
    componentDidMount() {
        WatchedSeriesService.getWatchedSeries().then((res) => {
            this.setState({watchedSeries: res.data});
        });
    }

    addWatchedSeries() {
        this.props.navigate('/add-watchedseries');
    }

    deleteWatchedSeries(id) {
        WatchedSeriesService.deleteWatchedSeries(id).then(() => {
            this.setState({
                watchedSeries: this.state.watchedSeries.filter(watchedSeries => watchedSeries.id !== id)
            });
        });
    }

    updateWatchedSeries(id) {
        this.props.navigate(`/update-watchedseries/${id}`);
    }

    render() {
    const btnAdd = {
        width: "190px",
        marginBottom: "15px"
    };
    const btnDelete = {
        marginLeft: "10px"
    }
    return <div>
        <h2 className='text-center'>Watched Series List</h2>
        <div className='row'>
            <button className='btn btn-warning' onClick={this.addWatchedSeries} style={btnAdd}>Add Watched Series</button>
        </div>
        <div className='row'>
            <table className='table table-striped table-bordered'>
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
                                <td>
                                    <button onClick={() => this.updateWatchedSeries(watchedSeries.id)} className="btn btn-primary">Update</button>
                                    <button onClick={() => this.deleteWatchedSeries(watchedSeries.id)} className="btn btn-danger" style={btnDelete}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    </div>;
  }
}
