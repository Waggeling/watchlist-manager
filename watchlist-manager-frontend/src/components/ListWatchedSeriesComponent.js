import React, { Component } from 'react';
import WatchedSeriesService from '../services/WatchedSeriesService';

export default class ListWatchedSeriesComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            watchedSeries: [],
            sortBy: ''
        }
        this.addWatchedSeries = this.addWatchedSeries.bind(this);
        this.updateWatchedSeries = this.updateWatchedSeries.bind(this);
        this.deleteWatchedSeries = this.deleteWatchedSeries.bind(this);
        this.sortWatchedSeries = this.sortWatchedSeries.bind(this);
    }
  
    componentDidMount() {
        WatchedSeriesService.getWatchedSeries().then((res) => {
            let data = res.data;
            data.sort((a, b) => a.id - b.id);
            this.setState({watchedSeries: data, sortBy: 'id'});
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

    sortWatchedSeries(sortBy) {
        let sortedBy = this.state.sortBy;
        let watchedSeries = this.state.watchedSeries;
        if (sortBy === sortedBy) {
            this.setState({watchedSeries: watchedSeries.reverse()});
        } else {
            switch(sortBy) {
                case 'rating':
                    watchedSeries.sort((a, b) => a.rating > b.rating);
                    break;
                case 'name':
                    watchedSeries.sort((a, b) => a.name > b.name);
                    break;
                case 'yearWatched':
                    watchedSeries.sort((a, b) => a.yearWatched > b.yearWatched);
                    break;
                case 'productionCountry':
                    watchedSeries.sort((a, b) => a.productionCountry > b.productionCountry);
                    break;
                default: 
                    break;
            }
            this.setState({watchedSeries: watchedSeries, sortBy: sortBy});
        }
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
    };
    return <div>
        <h2 className='text-center'>Watched Series List</h2>
        <div className='row'>
            <button className='btn btn-warning' onClick={this.addWatchedSeries} style={btnAdd}>Add Watched Series</button>
        </div>
        <div className='row'>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr className='text-center'>
                        <th>Rating <button onClick={() => this.sortWatchedSeries('rating')} className="btn btn-outline-primary btn-bordered btn-sm float-end">sort</button></th>
                        <th>Name <button onClick={() => this.sortWatchedSeries('name')} className="btn btn-outline-primary btn-sm float-end">sort</button></th>
                        <th>Genre</th>
                        <th>Year Watched <button onClick={() => this.sortWatchedSeries('yearWatched')} className="btn btn-outline-primary btn-sm float-end">sort</button></th>
                        <th>Production Country <button onClick={() => this.sortWatchedSeries('productionCountry')} className="btn btn-outline-primary btn-sm float-end">sort</button></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.watchedSeries.map(
                            watchedSeries =>
                            <tr key={watchedSeries.id}>
                                <td className='text-center'>{watchedSeries.rating}</td>
                                <td>{watchedSeries.name}</td>
                                <td>{watchedSeries.genre}</td>
                                <td className='text-center'>{watchedSeries.yearWatched}</td>
                                <td>{watchedSeries.productionCountry}</td>
                                <td className='text-center'>
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
