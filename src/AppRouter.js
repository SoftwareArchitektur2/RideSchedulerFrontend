import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Home from './components/Home';

export default function AppRouter() {
    return <>
        <Router>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    </>;
}