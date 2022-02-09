import { Grid, Typography } from '@mui/material';
import React from 'react';
import './Header.css';

export default function Header() {
    return <>
    <div style={{'display': 'flex'}}>
        <Grid container spacing={0} className='header'>
            <Grid item xs={3} className='headerField'>
                <Typography variant='h6' className='menutext'>Menü1</Typography>
            </Grid>
            <Grid item xs={3} className='headerField'>
                <Typography variant='h6' className='menutext'>Menü2</Typography>
            </Grid>
            <Grid item xs={3} className='headerField'>
                <Typography variant='h6' className='menutext'>Menü3</Typography>
            </Grid>
            <Grid item xs={3} className='headerField'>
                <Typography variant='h6' className='menutext'>Menü4</Typography>
            </Grid>
        </Grid>
    </div>
    </>;
}