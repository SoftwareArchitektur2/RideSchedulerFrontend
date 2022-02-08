import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import BuslineDetail from './components/busline/BuslineDetail';
import Home from './components/Home';

export default function AppRouter() {
    return <>
        <Router>
            <Switch>
                <Route path="/busline/:name">
                    <BuslineDetail />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    </>;
}