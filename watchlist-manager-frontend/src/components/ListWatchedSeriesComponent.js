import React, { Component } from 'react';
import WatchedSeriesService from '../services/WatchedSeriesService';

export default class ListWatchedSeriesComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            watchedSeries: [],
            unfilteredWatchedSeries: [],
            sortBy: '',
            filterOption: '',
            filtering: ''
        }
        this.addWatchedSeries = this.addWatchedSeries.bind(this);
        this.changeFilteringHandler = this.changeFilteringHandler.bind(this);
        this.changeFilterOptionHandler = this.changeFilterOptionHandler.bind(this);
        this.filterWatchedSeries = this.filterWatchedSeries.bind(this);
        this.resetFiltering = this.resetFiltering.bind(this);
        this.updateWatchedSeries = this.updateWatchedSeries.bind(this);
        this.deleteWatchedSeries = this.deleteWatchedSeries.bind(this);
        this.sortWatchedSeries = this.sortWatchedSeries.bind(this);
    }
  
    componentDidMount() {
        WatchedSeriesService.getWatchedSeries().then((res) => {
            let data = res.data;
            data.sort((a, b) => a.id - b.id);
            this.setState({watchedSeries: data, unfilteredWatchedSeries: data, sortBy: 'id'});
        });
    }

    addWatchedSeries() {
        this.props.navigate('/add-watchedseries');
    }

    changeFilteringHandler = (event) => {
        this.setState({filtering: event.target.value});
    }

    changeFilterOptionHandler = (event) => {
        this.setState({filterOption: event.target.value});
    }

    deleteWatchedSeries(id) {
        WatchedSeriesService.deleteWatchedSeries(id).then(() => {
            let filteredWatchedSeries = this.state.watchedSeries.filter(watchedSeries => watchedSeries.id !== id);
            this.setState({
                watchedSeries: filteredWatchedSeries,
                unfilteredWatchedSeries: filteredWatchedSeries
            });
        });
    }

    filterWatchedSeries = (e) => {
        e.preventDefault();
        let filterOption = this.state.filterOption;
        let filtering = this.state.filtering;
        let watchedSeries = this.state.unfilteredWatchedSeries;
        let filtered = true;
        switch(filterOption) {
            case 'rating':
                watchedSeries = watchedSeries.filter(watchedSeries => watchedSeries.rating.toString() === filtering);
                break;
            case 'name':
                watchedSeries = watchedSeries.filter(watchedSeries => watchedSeries.name.toLowerCase().includes(filtering.toLowerCase()));
                break;
            case 'genre':
                watchedSeries = watchedSeries.filter(watchedSeries => watchedSeries.genre.toLowerCase().includes(filtering.toLowerCase()));
                break;
            case 'yearWatched':
                watchedSeries = watchedSeries.filter(watchedSeries => watchedSeries.yearWatched.toString() === filtering);
                break;
            case 'productionCountry':
                watchedSeries = watchedSeries.filter(watchedSeries => watchedSeries.productionCountry.toLowerCase().includes(filtering.toLowerCase()));
                break;
            default:
                filtered = false;
                break;
        }
        filtered? this.setState({watchedSeries: watchedSeries, filterOption: '', filtering: ''}) : this.setState({filterOption: '', filtering: ''});
    }

    resetFiltering = (e) => {
        e.preventDefault();
        this.setState({watchedSeries: this.state.unfilteredWatchedSeries});
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
        marginBottom: "20px"
    };
    const btnMargin = {
        marginLeft: "10px"
    };
    const formStyle = {
        marginBottom: "20px"
    }
    return <div>
        <h2 className='text-center'>Watched Series List</h2>
        <div className='row align-items-end'>
            <div className="col">
                <form style={formStyle}>
                    <div className='form-group'>
                        <select className="form-select form-select-sm" value={this.state.filterOption} onChange={this.changeFilterOptionHandler}>
                            <option defaultValue>Choose filtering option</option>
                            <option value="rating">Rating</option>
                            <option value="name">Name</option>
                            <option value="genre">Genre</option>
                            <option value="yearWatched">Year Watched</option>
                            <option value="productionCountry">Production Country</option>
                        </select>
                        <input placeholder='Filter according to..' name="filtering" className='form-control form-control-sm' value={this.state.filtering} onChange={this.changeFilteringHandler} />
                    </div>
                    <button className='btn btn-success' onClick={this.filterWatchedSeries} style={btnMargin}>Set Filter</button>
                    <button className='btn btn-outline-success' onClick={this.resetFiltering} style={btnMargin}>Reset Filter</button>
                </form>
            </div>
            <div className="col"></div>
            <div className="col-auto">
                <button className='btn btn-warning' onClick={this.addWatchedSeries} style={btnAdd}>Add Watched Series</button>
            </div>
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
                                    <button onClick={() => this.deleteWatchedSeries(watchedSeries.id)} className="btn btn-danger" style={btnMargin}>Delete</button>
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
