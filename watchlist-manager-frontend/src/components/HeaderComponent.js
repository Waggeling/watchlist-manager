import React, { Component } from 'react';

export default class HeaderComponent extends Component {
  render() {
    const headerTextStyle = {
      color: "white",
      margin: "5px",
      marginLeft: "15px"
    };
    return <div>
        <header>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <div><h4 style={headerTextStyle}>Watchlist Manager</h4></div>
            </nav>
        </header>
    </div>;
  }
}
