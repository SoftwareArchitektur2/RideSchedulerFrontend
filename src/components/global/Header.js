import { Avatar, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';

export default function Header({menuData}) {
    let history = useHistory();

    function navigate(link) {
        history.push(link);
    }

    return <>
    <div style={{'display': 'flex'}}>
        <Grid container spacing={0} className='header'>
            <Grid item xs={4} className={window.location.pathname == menuData[0].link ? 'headerFieldSelected' : 'headerField'} onClick={() => navigate(menuData[0].link)}>
                <Typography variant='h6' className='menutext'>{menuData[0].text}</Typography>
            </Grid>
            <Grid item xs={4} className={window.location.pathname == menuData[1].link ? 'headerFieldSelected' : 'headerField'} onClick={() => navigate(menuData[1].link)}>
                <Typography variant='h6' className='menutext'>{menuData[1].text}</Typography>
            </Grid>
            <Grid item xs={4} className={window.location.pathname == menuData[2].link ? 'headerFieldSelected' : 'headerField'} onClick={() => navigate(menuData[2].link)}>
                <Typography variant='h6' className='menutext'>{menuData[2].text}</Typography>
            </Grid>
        </Grid>
    </div>
    <img alt='Logo' src='bus.png' style={{width: '128px', marginLeft: '40px', marginTop: '40px', marginBottom: '-64px'}}></img>
    </>;
}