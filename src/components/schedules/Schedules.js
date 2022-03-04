import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import './Schedules.css';
import AddSchedule from './AddSchedule';
import { ApiService } from '../../api/ApiService';
import moment from 'moment';

export default function Schedules({isAdmin}) {
    const [schedules, setSchedules] = useState([]);
    const [addScheduleOpen, setAddScheduleOpen] = useState(false);

    const apiService = new ApiService();
    useEffect(() => {
        const fetchSchedules = async () => {
            const fetchedSchedules = await apiService.getAllSchedules();
            setSchedules(fetchedSchedules.data);
        }
        fetchSchedules();
      }, []);

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
        <Box sx={{marginBottom: '5vh'}}>
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
                                <TableRow key={schedule.id} className='tablerowSchedules'>
                                    <TableCell>{schedule.busLine.name}</TableCell>
                                    <TableCell>{moment(schedule.departureTime, "HH:mm:ss").format("HH:mm")}</TableCell>
                                    <TableCell>{schedule.destinationStop.name}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </>;
}