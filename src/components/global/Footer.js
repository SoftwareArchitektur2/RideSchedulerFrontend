import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';

import './Footer.css';

export default function Footer({setMenuFunction}) {
    const [isAdmin, setIsAdmin] = useState(false);

    function switchMenu() {
        setIsAdmin(!isAdmin);
        if (isAdmin) {
            setMenuFunction([{text: "Menü1", link: "/"}, {text: "Menü2", link: "/"}, {text: "Menü3", link: "/"}, {text: "Menü4", link: "/"}]);
        } else {
            setMenuFunction([{text: "Buslinien", link: "/"}, {text: "Menü2", link: "/"}, {text: "Menü3", link: "/"}, {text: "Menü4", link: "/"}]);
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