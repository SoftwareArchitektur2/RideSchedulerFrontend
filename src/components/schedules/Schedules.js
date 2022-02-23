import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import './Schedules.css';
import AddSchedule from './AddSchedule';

export default function Schedules({isAdmin}) {
    const [schedules, setSchedules] = useState([
        {line: 1, startingTime: "8:01", lastStop: {name: "Tibusstraße"}},
        {line: 11, startingTime: "11:01", lastStop: {name: "Altstadt/Bült"}},
        {line: 15, startingTime: "12:01", lastStop: {name: "Domplatz"}},
        {line: 16, startingTime: "13:01", lastStop: {name: "Münster Hbf"}}
    ]);
    const [addScheduleOpen, setAddScheduleOpen] = useState(false);

    function addSchedule() {
        setAddScheduleOpen(true);
    }

    function displayAddedSchedule(schedule) {
        let newList = [...schedules];
        newList.push(schedule);
        setSchedules(newList);
    }

    return <>
        <Box>
            <Typography variant='h4' sx={{'marginLeft': '25%'}}>Fahrpläne</Typography>
        </Box>
        <Box sx={{flexGrow: 1}}>
            <Toolbar sx={{'width': '50%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                {   isAdmin &&
                    <div>
                        <Button variant='contained' startIcon={<AddIcon />} className='tablebutton' onClick={() => addSchedule()}>
                            Hinzufügen
                        </Button>
                        <AddSchedule open={addScheduleOpen} handleClose={() => setAddScheduleOpen(false)} saveSchedule={(schedule) => displayAddedSchedule(schedule)}></AddSchedule>
                    </div>
                }
            </Toolbar>
        </Box>
        <Box>
            <TableContainer component={Paper} sx={{'width': '50%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                <Table aria-label="Verfügbare Fahrpläne">
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableheader'>Buslinie</TableCell>
                            <TableCell className='tableheader'>Startzeit</TableCell>
                            <TableCell className='tableheader'>Endhaltestelle</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            schedules.map((schedule) => (
                                <TableRow key={schedule.line} className='tablerowSchedules'>
                                    <TableCell>{schedule.line}</TableCell>
                                    <TableCell>{schedule.startingTime}</TableCell>
                                    <TableCell>{schedule.lastStop.name}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </>;
}