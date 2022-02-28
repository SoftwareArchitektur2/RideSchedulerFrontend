import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Footer.css';

export default function Footer({setMenuFunction, isAdmin, setIsAdminFunction}) {
    let history = useHistory();

    function switchMenu() {
        history.push("/");
        setIsAdminFunction(!isAdmin);
        if (!isAdmin/*Somehow admin is set after the function*/) {
            setMenuFunction([{text: "Buslinien", link: "/"}, {text: "Haltestellen", link: "/busstops"}, {text: "Fahrpläne", link: "/schedules"}, {text: "Menü4", link: "/"}]);
        } else {

            setMenuFunction([{text: "Buslinien", link: "/"}, {text: "Haltestellen", link: "/busstops"}, {text: "Fahrplanauskunft", link: "/journeyplanner"}, {text: "Menü4", link: "/"}]);

        }
    }

    return <>
        <div style={{'display': 'flex'}}>
        <Grid container spacing={0} className='footer'>
            <Grid item xs={9}></Grid>
            <Grid item xs={3} className='footerLeft' justifyContent="flex-end" onClick={() => switchMenu()}>
                <Typography variant='h6' className='footertext'>{isAdmin ? "Benutzeransicht" : "Adminansicht"}</Typography>
            </Grid>
        </Grid>
    </div>
    </>;
}