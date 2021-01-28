import React from 'react';
import './dashboard.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import FuelHistory from './FuelHistory/FuelHistory';

const Dashboard = () => {
    return <React.Fragment>
        <Switch>
            <Route path="/fuel-history" component={FuelHistory}></Route>
            <Redirect from="/" to="/fuel-history"></Redirect>
        </Switch>
    </React.Fragment >
}

export default Dashboard;