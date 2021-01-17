import './scss/App.scss';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Header from './components/shared/Header/Header';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import FuelHistory from './components/Dashboard/FuelHistory/FuelHistory';

function App() {

  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="right-screen">
          <Header />
          <Switch>
            <Route path="/fuel-history" component={FuelHistory}></Route>
            <Redirect from="/" to="/fuel-history"></Redirect>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
