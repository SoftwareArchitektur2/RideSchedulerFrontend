import { TimePicker } from "@mui/lab";
import { AppBar, Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Toolbar, Typography, Card, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { ApiService } from "../../api/ApiService";
import moment from "moment";

import './JourneyPlanner.css';

export default function JourneyPlanner({isAdmin}) {    
    const [selectedStop, setSelectedStop] = useState(null);
    const [startingTime, setStartingTime] = useState(null);
    const [isSearched, setIsSearched] = useState(false);

    const [isError, setIsError] = useState(false);

    const selectScheduleTime = ["0:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00"];
    const [scheduleTime, setScheduleTime] = useState("");

    const [busstops, setBusstops] = useState([]);
    const [journeys, setJourneys] = useState([]);
  
    const apiService = new ApiService();
    useEffect(() => {
        const fetchBusstops = async () => {
            const fetchedBusstops = await apiService.getAllBusstops();
            setBusstops(fetchedBusstops.data);
        }
        fetchBusstops();
      }, []);

    function onSearchJourney() {
        if (selectedStop === null || startingTime === null || scheduleTime == "") {
            setIsError(true);
        } else {
            apiService.getJourneyPlan(selectedStop.id, startingTime.toISOString(true), moment.duration(scheduleTime, "HH:mm").as('minutes').toString()).then(res => { 
                setJourneys(res.data);
                setIsSearched(true);
            });
        }
    }

    return <>
        <Box>
            <Typography variant='h4' sx={{'marginLeft': '20%'}}>Fahrplanauskunft</Typography>
        </Box>
        <Box>
            <Card sx={{width: '60vw', 'marginLeft': 'auto', 'marginRight': 'auto', marginTop: '20px'}}>
               <Toolbar sx={{margin: '20px', 'width': '90%', display: 'flex', justifyContent: 'space-between'}}>
                    <FormControl>
                        <InputLabel id="journeyStopLabel">Starthaltestelle</InputLabel>
                        <Select
                            value={selectedStop}
                            labelId="journeyStopLabel"
                            label="Starthaltestelle"
                            onChange={(event) => {
                                setSelectedStop(event.target.value);
                                setIsError(false);
                            }}
                            sx={{width: '12vw'}}
                        >
                            { busstops.map(stop =>
                                <MenuItem value={stop}>{stop.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TimePicker
                        label="Startzeit"
                        ampm={false}
                        value={startingTime}
                        onChange={(value) => {
                            setStartingTime(value);
                            setIsError(false);
                        }}
                        renderInput={(params) => <TextField sx={{width: '12vw'}} {...params} />}
                    />
                    <FormControl>
                        <InputLabel id="scheduleTimeLabel">Zeithorizont in Stunden</InputLabel>
                        <Select
                            value={scheduleTime}
                            labelId="scheduleTimeLabel"
                            label="Zeithorizont in Stunden"
                            onChange={(event) => {
                                setScheduleTime(event.target.value);
                                setIsError(false);
                            }}
                            sx={{width: '12vw'}}
                        >
                                { selectScheduleTime.map(time =>
                                    <MenuItem value={time}>{time}</MenuItem>
                                )}
                        </Select>
                    </FormControl>
                    <Button variant="contained" sx={{height: '56px'}} className="journeySearch" onClick={() => onSearchJourney()}>Suchen</Button>
               </Toolbar>
            </Card>
        </Box>
        <Snackbar open={isError} onClose={() => setIsError(false)} autoHideDuration={2000}>
            <Alert severity="error">Felder wurden nicht gefüllt!</Alert>
        </Snackbar>
        {isSearched &&
            <Box sx={{marginBottom: '5vh'}}>
                    <TableContainer component={Paper} sx={{'width': '50%', 'marginLeft': 'auto', 'marginRight': 'auto', marginTop: '40px'}}>
                        <Table aria-label="Verfügbare Abfahrten">
                            <TableHead>
                                <TableRow>
                                    <TableCell className='tableheader'>Buslinie</TableCell>
                                    <TableCell className='tableheader'>Endhaltestelle</TableCell>
                                    <TableCell className='tableheader'>Abfahrtszeit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    journeys.map((journey) => (
                                        <TableRow key={journey.id} className='tablerowSchedules'>
                                            <TableCell>{journey.busLine.name}</TableCell>
                                            <TableCell>{journey.destinationStop.name}</TableCell>
                                            <TableCell>{moment(journey.departureTime, "YYYY-MM-DD[T]HH:mm:ss[.000+00:00]").format("HH:mm")}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
            </Box>
        }
    </>;
}