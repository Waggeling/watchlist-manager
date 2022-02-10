import React, { Component } from 'react'
import WatchedSeriesService from '../services/WatchedSeriesService';

export default class UpdateWatchedSeriesComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
        id: this.props.params.id,
        name: '',
        genre: '',
        yearWatched: 0,
        productionCountry: '',
        rating: 0
    }
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeGenreHandler = this.changeGenreHandler.bind(this);
    this.changeYearWatchedHandler = this.changeYearWatchedHandler.bind(this);
    this.changeProductionCountryHandler = this.changeProductionCountryHandler.bind(this);
    this.changeRatingHandler = this.changeRatingHandler.bind(this);
    this.updateWatchedSeries = this.updateWatchedSeries.bind(this);
  }

  componentDidMount() {
    WatchedSeriesService.getWatchedSeriesById(this.state.id).then((res) => {
      let watchedSeries = res.data;
      this.setState({
        name: watchedSeries.name,
        genre: watchedSeries.genre,
        yearWatched: watchedSeries.yearWatched,
        productionCountry: watchedSeries.productionCountry,
        rating: watchedSeries.rating
      });
    });
  }

  updateWatchedSeries = (e) => {
    e.preventDefault();
    let watchedSeries = {
      name: this.state.name,
      genre: this.state.genre,
      yearWatched: this.state.yearWatched,
      productionCountry: this.state.productionCountry,
      rating: this.state.rating
    }
    WatchedSeriesService.updateWatchedSeries(this.state.id, watchedSeries)
      .then(() => {
        this.props.navigate('/watchedseries');
      });
  }

  changeNameHandler = (event) => {
    this.setState({name: event.target.value});
  }

  changeGenreHandler = (event) => {
    this.setState({genre: event.target.value});
  }

  changeYearWatchedHandler = (event) => {
    this.setState({yearWatched: event.target.value});
  }

  changeProductionCountryHandler = (event) => {
    this.setState({productionCountry: event.target.value});
  }

  changeRatingHandler = (event) => {
    this.setState({rating: event.target.value});
  }

  cancel() {
    this.props.navigate('/watchedseries');
}

render() {
  const btnStyle = {
    margin: "10px"
  };
  return <div>
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3'>
            <h3 className='text-center'>Update Watched Series</h3>
            <div className='card-body'>
              <form>
                <div className='form-group'>
                  <label>Name:</label>
                  <input placeholder='Name' name="name" className='form-control' value={this.state.name} onChange={this.changeNameHandler} />
                </div>
                <div className='form-group'>
                  <label>Genre:</label>
                  <input placeholder='Genre' name="genre" className='form-control' value={this.state.genre} onChange={this.changeGenreHandler} />
                </div>
                <div className='form-group'>
                  <label>Year Watched:</label>
                  <input placeholder='Year Watched' name="yearWatched" className='form-control' value={this.state.yearWatched} onChange={this.changeYearWatchedHandler} />
                </div>
                <div className='form-group'>
                  <label>Production Country:</label>
                  <input placeholder='Production Country' name="productionCountry" className='form-control' value={this.state.productionCountry} onChange={this.changeProductionCountryHandler} />
                </div>
                <div className='form-group'>
                  <label>Rating:</label>
                  <input placeholder='Rating' name="rating" className='form-control' value={this.state.rating} onChange={this.changeRatingHandler} />
                </div>

                <button className='btn btn-success float-end' onClick={this.updateWatchedSeries} style={btnStyle}>Save</button>
                <button className='btn btn-danger float-end' onClick={this.cancel.bind(this)} style={btnStyle}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  </div>;
}
}
