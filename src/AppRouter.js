import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import BuslineDetail from './components/busline/BuslineDetail';
import Home from './components/Home';
import { useState } from 'react';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import BusstopOverview from './components/busstop/BusstopOverview';

export default function AppRouter() {
    const [menu, setMenu] = useState([{text: "Buslinien", link: "/"}, {text: "Menü2", link: "/"}, {text: "Menü3", link: "/"}, {text: "Menü4", link: "/"}]);
    const [isAdmin, setIsAdmin] = useState(false);

    return <>
        <Router>
            <Switch>
                 <Route path="/busstops">
                    <Header menuData={menu}/>
                    <BusstopOverview isAdmin={isAdmin}/>
                    <Footer setMenuFunction={setMenu} isAdmin={isAdmin} setIsAdminFunction={setIsAdmin}/>
                </Route> 
                <Route path="/">
                    <Header menuData={menu}/>
                    <Home isAdmin={isAdmin}/>
                    <Footer setMenuFunction={setMenu} isAdmin={isAdmin} setIsAdminFunction={setIsAdmin}/>
                </Route>
            </Switch>
        </Router>
    </>;
}