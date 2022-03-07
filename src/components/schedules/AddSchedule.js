import { TimePicker } from "@mui/lab";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormGroup, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { ApiService } from "../../api/ApiService";

import './AddSchedule.css';

export default function AddSchedule({open, handleClose, saveSchedule}) {
    const [schedule, setSchedule] = useState({busLine: null, departureTime: null, destinationStop: {name: null, id: null}});    
    const [startingTime, setStartingTime] = useState(null);
    const [lastStopDisabled, setLastStopDisabled] = useState(true);
    const [busstops, setBusstops] = useState([]);
    const [buslines, setBuslines] = useState([]);

    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const apiService = new ApiService();

    useEffect(() => {
      const fetchBuslines = async () => {
          const fetchedBuslines = await apiService.getAllBuslines();
          setBuslines(fetchedBuslines.data);
      }
      fetchBuslines();
    }, []);

    useEffect(() => {
        if (schedule.busLine) {
            const fetchBusstops = async () => {
                const fetchedBusstops= await apiService.getDestinationsStopsForLine(schedule.busLine.id);
                setBusstops(fetchedBusstops.data);
            }
            fetchBusstops();
        }
    }, [schedule.busLine]);

    function onSaveSchedule() {
        if (!schedule.busLine || !startingTime || !schedule.destinationStop || !schedule.destinationStop.id) {
            setIsError(true);
            setErrorMsg("Es müssen alle Felder gefüllt werden!");
        }

        let finalSchedule = {...schedule, departureTime: startingTime.format('HH:mm:ss')};
        apiService.saveSchedule(finalSchedule).then(res => {
            finalSchedule.departureTime = startingTime.format("HH:mm");
            saveSchedule(finalSchedule);
            onHandleClose(); 
        }).catch(error => {
            setIsError(true);
            setErrorMsg(error.response.data);
        });
    }

    function onHandleClose() {
        setSchedule({busLine: null, departureTime: null, destinationStop: {name: null, id: null}});
        setStartingTime(null);
        setLastStopDisabled(true);
        handleClose();
    }

    function onLineChange(line) {
        setSchedule({...schedule, busLine: line});
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
                            { buslines.map(line =>
                                <MenuItem value={line}>{line.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TimePicker
                        fullWidth
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
                            value={schedule.lastStop}
                            label="Endhaltestelle"
                            labelId="stopLabel"
                            onChange={(event) => setSchedule({...schedule, destinationStop: event.target.value})}
                            disabled={lastStopDisabled}
                        >
                            { busstops.map(stop =>
                                <MenuItem value={stop}>{stop.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </DialogContent> 
                <DialogActions>
                    <Button onClick={() => onHandleClose()}>Abbrechen</Button>
                    <Button onClick={() => onSaveSchedule()}>Speichern</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={isError} autoHideDuration={3000} onClose={() => setIsError(false)}>
                <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>
    </>;
}