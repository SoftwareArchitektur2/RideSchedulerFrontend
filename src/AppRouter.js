import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import BuslineDetail from './components/busline/BuslineDetail';
import Home from './components/Home';
import { useState } from 'react';
import Header from './components/global/Header';
import Footer from './components/global/Footer';

export default function AppRouter() {
    const [menu, setMenu] = useState([{text: "Buslinien", link: "/"}, {text: "Menü2", link: "/"}, {text: "Menü3", link: "/"}, {text: "Menü4", link: "/"}]);

    return <>
        <Router>
            <Switch>
                <Route path="/busline/:name">
                    <Header menuData={menu}/>
                    <BuslineDetail />
                    <Footer setMenuFunction={setMenu}/>
                </Route>
                <Route path="/">
                    <Header menuData={menu}/>
                    <Home />
                    <Footer setMenuFunction={setMenu}/>
                </Route>
            </Switch>
        </Router>
    </>;
}