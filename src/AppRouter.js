import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/Home';
import { useState } from 'react';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import BusstopOverview from './components/busstop/BusstopOverview';
import Schedules from './components/schedules/Schedules';
import JourneyPlanner from './components/journey-planner/JourneyPlanner';

export default function AppRouter() {
    const [menu, setMenu] = useState([{text: "Buslinien", link: "/"}, {text: "Menü2", link: "/"}, {text: "Fahrplanauskunft", link: "/journeyplanner"}, {text: "Menü4", link: "/"}]);
    const [isAdmin, setIsAdmin] = useState(false);

    return <>
        <Router>
            <Switch>
                <Route path="/schedules">
                    <Header menuData={menu}/>
                    <Schedules isAdmin={isAdmin}/>
                    <Footer setMenuFunction={setMenu} isAdmin={isAdmin} setIsAdminFunction={setIsAdmin}/>
                </Route> 
                <Route path="/busstops">
                    <Header menuData={menu}/>
                    <BusstopOverview isAdmin={isAdmin}/>
                    <Footer setMenuFunction={setMenu} isAdmin={isAdmin} setIsAdminFunction={setIsAdmin}/>
                </Route> 
                <Route path="/journeyplanner">
                    <Header menuData={menu}/>
                    <JourneyPlanner isAdmin={isAdmin}/>
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