import { TimePicker } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import InputMask from 'react-input-mask';

import './AddSchedule.css';

export default function AddSchedule({open, handleClose, saveSchedule}) {
    const [schedule, setSchedule] = useState({line: "", startingTime: "", lastStop: {name: ""}});    
    const [startingTime, setStartingTime] = useState(null);
    const [lastStopDisabled, setLastStopDisabled] = useState(true);
    const [mockStops, setMockStops] = useState([
        {name: "Tibusstraße", hasWifi: false},
        {name: "Altstadt/Bült", hasWifi: true},
        {name: "Eisenbahnstraße", hasWifi: false},
        {name: "Hauptbahnhof", hasWifi: true},
        {name: "Domplatz", hasWifi: true},
        {name: "Hüfferstiftung", hasWifi: false},
        {name: "Aegidiimarkt", hasWifi: true}
    ]);
    const [mockLines, setMockLines] = useState([
        {id: 0, name: "1"},
        {id: 1, name: "11"},
        {id: 2, name: "15"},
        {id: 3, name: "16"},
        {id: 4, name: "22"}
    ]);

    function onSaveSchedule() {
        let finalSchedule = {...schedule, startingTime: startingTime.format('H:mm')};
        saveSchedule(finalSchedule);
        //TODO save service call
        onHandleClose();
    }

    function onHandleClose() {
        setSchedule({line: "", startingTime: "", lastStop: {name: ""}});
        setStartingTime(null);
        setLastStopDisabled(true);
        handleClose();
    }

    function onLineChange(line) {
        setSchedule({...schedule, line: line});
        setLastStopDisabled(false)
    }

    return <>
            <Dialog open={open} onClose={() => onHandleClose()}>
                <DialogTitle className="scheduleEditorTitle">Buslinien-Editor</DialogTitle>
                <DialogContent className="editorContent">
                    <DialogContentText>
                        Fahrplan hinzufügen
                    </DialogContentText>
                    <FormControl className="scheduleFormElement" fullWidth>
                        <InputLabel id="lineLabel">Buslinie</InputLabel>
                        <Select
                            fullWidth
                            value={schedule.line}
                            labelId="lineLabel"
                            label="Buslinie"
                            onChange={(event) => onLineChange(event.target.value)}
                        >
                            { mockLines.map(line =>
                                <MenuItem value={line.name}>{line.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TimePicker
                        label="Startzeit"
                        ampm={false}
                        value={startingTime}
                        onChange={(value) => setStartingTime(value)}
                        renderInput={(params) => <TextField className="scheduleFormElement" {...params} />}
                    />
                    <FormControl className="scheduleFormElement" fullWidth>
                        <InputLabel id="stopLabel">Endhaltestelle</InputLabel>
                        <Select
                            fullWidth
                            value={schedule.lastStop.name}
                            label="Endhaltestelle"
                            labelId="stopLabel"
                            onChange={(event) => setSchedule({...schedule, lastStop: {...schedule.lastStop, name: event.target.value}})}
                            disabled={lastStopDisabled}
                        >
                            { mockStops.map(stop =>
                                <MenuItem value={stop.name}>{stop.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </DialogContent> 
                <DialogActions>
                    <Button onClick={() => onHandleClose()}>Abbrechen</Button>
                    <Button onClick={() => onSaveSchedule()}>Speichern</Button>
                </DialogActions>
            </Dialog>
    </>;
}