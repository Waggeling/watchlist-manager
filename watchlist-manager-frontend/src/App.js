import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateWatchedSeriesComponent from './components/CreateWatchedSeriesComponent';
import HeaderComponent from './components/HeaderComponent';
import HOCForRouteProps from './components/HOCForRouteProps';
import HomeComponent from './components/HomeComponent';
import ListWatchedSeriesComponent from './components/ListWatchedSeriesComponent';
import UpdateWatchedSeriesComponent from './components/UpdateWatchedSeriesComponent';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
          <div className="container">
            <Routes>
              <Route path="/" element={<HOCForRouteProps Component={HomeComponent} />}></Route>
              <Route path="/watchedseries" element={<HOCForRouteProps Component={ListWatchedSeriesComponent} />}></Route>
              <Route path="/add-watchedseries" element={<HOCForRouteProps Component={CreateWatchedSeriesComponent} />}></Route>
              <Route path="/update-watchedseries/:id" element={<HOCForRouteProps Component={UpdateWatchedSeriesComponent} />}></Route>
            </Routes>
          </div>
      </Router>
    </div>
  );
}

export default App;
