import React from 'react'
import './App.css';
import Navbar from './components/Navbar'
import SearchPage from './pages/SearchPage'
import FavPlacePage from './pages/FavPlacePage'
import WeatherDetailPage from './pages/WeatherDetailPage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  return (

    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={SearchPage}/>
          <Route path="/WeatherDetailPage/:id" component={WeatherDetailPage}/>
          <Route path="/FavPlacePage"  component={FavPlacePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
