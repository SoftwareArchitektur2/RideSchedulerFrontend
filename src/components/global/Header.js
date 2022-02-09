import { Grid, Typography } from '@mui/material';
import React from 'react';
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
            <Grid item xs={3} className='headerField' onClick={() => navigate(menuData[0].link)}>
                <Typography variant='h6' className='menutext'>{menuData[0].text}</Typography>
            </Grid>
            <Grid item xs={3} className='headerField' onClick={() => navigate(menuData[1].link)}>
                <Typography variant='h6' className='menutext'>{menuData[1].text}</Typography>
            </Grid>
            <Grid item xs={3} className='headerField' onClick={() => navigate(menuData[2].link)}>
                <Typography variant='h6' className='menutext'>{menuData[2].text}</Typography>
            </Grid>
            <Grid item xs={3} className='headerField' onClick={() => navigate(menuData[3].link)}>
                <Typography variant='h6' className='menutext'>{menuData[3].text}</Typography>
            </Grid>
        </Grid>
    </div>
    </>;
}