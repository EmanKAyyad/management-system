import React from 'react';
import './dashboard.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import FuelHistory from './FuelHistory/FuelHistory';
import asyncComponent from '../../hoc/asyncComponent';


const asyncOperatingCost = asyncComponent(() => import('./OperatingCost/OperatingCost'));

const Dashboard = () => {
    return <React.Fragment>
        <Switch>
            <Route path="/fuel-history" component={FuelHistory}></Route>
            <Route path="/operating-cost" component={asyncOperatingCost}></Route>
            <Redirect from="/" to="/fuel-history"></Redirect>
        </Switch>
    </React.Fragment >
}

export default Dashboard;