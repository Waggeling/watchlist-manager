import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import ListWatchedSeriesComponent from './components/ListWatchedSeriesComponent';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomeComponent />}></Route>
              <Route path="/watchedseries" element={<ListWatchedSeriesComponent />}></Route>
            </Routes>
          </div>
      </Router>
    </div>
  );
}

export default App;
