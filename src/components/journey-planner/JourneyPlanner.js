import { TimePicker } from "@mui/lab";
import { AppBar, Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Toolbar, Typography, Card } from "@mui/material";
import { useState } from "react";

import './JourneyPlanner.css';

export default function JourneyPlanner({isAdmin}) {    
    const [selectedStop, setSelectedStop] = useState("");
    const [startingTime, setStartingTime] = useState(null);

    const selectScheduleTime = ["0:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00"];
    const [scheduleTime, setScheduleTime] = useState("");

    const [mockStops, setMockStops] = useState([
        {name: "Tibusstraße", hasWifi: false},
        {name: "Altstadt/Bült", hasWifi: true},
        {name: "Eisenbahnstraße", hasWifi: false},
        {name: "Hauptbahnhof", hasWifi: true},
        {name: "Domplatz", hasWifi: true},
        {name: "Hüfferstiftung", hasWifi: false},
        {name: "Aegidiimarkt", hasWifi: true}
    ]);

    return <>
        <Box>
            <Typography variant='h4' sx={{'marginLeft': '25%'}}>Fahrplanauskunft</Typography>
        </Box>
        <Box>
            <Card sx={{width: '50vw', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
               <Toolbar sx={{margin: '20px', 'width': '100%', display: 'flex', justifyContent: 'space-between'}}>
                    <FormControl>
                        <InputLabel id="journeyStopLabel">Starthaltestelle</InputLabel>
                        <Select
                            value={selectedStop}
                            labelId="journeyStopLabel"
                            label="Starthaltestelle"
                            onChange={(event) => setSelectedStop(event.target.value)}
                            sx={{width: '12vw'}}
                        >
                            { mockStops.map(stop =>
                                <MenuItem value={stop.name}>{stop.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TimePicker
                        label="Startzeit"
                        ampm={false}
                        value={startingTime}
                        onChange={(value) => setStartingTime(value)}
                        renderInput={(params) => <TextField sx={{width: '12vw'}} {...params} />}
                    />
                    <FormControl>
                        <InputLabel id="scheduleTimeLabel">Zeithorizont in Stunden</InputLabel>
                        <Select
                            value={scheduleTime}
                            labelId="scheduleTimeLabel"
                            label="Zeithorizont in Stunden"
                            onChange={(event) => setScheduleTime(event.target.value)}
                            sx={{width: '12vw'}}
                        >
                                { selectScheduleTime.map(time =>
                                    <MenuItem value={time}>{time}</MenuItem>
                                )}
                        </Select>
                    </FormControl>
                    <Button variant="contained" sx={{height: '56px'}} className="journeySearch">Suchen</Button>
               </Toolbar>
            </Card>
        </Box>
    </>;
}