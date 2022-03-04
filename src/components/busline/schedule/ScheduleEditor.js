import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import './ScheduleEditor.css';

export default function ScheduleEditor({open, name, handleClose, stops, isAdmin}) {
    const [mockStops, setMockStops] = useState([
        {name: "Tibusstraße", timeToNextStop: 5, nrReihenfolge: 1},
        {name: "Altstadt/Bült", timeToNextStop: 5, nrReihenfolge: 2},
        {name: "Eisenbahnstraße", timeToNextStop: 5, nrReihenfolge: 3},
        {name: "Hauptbahnhof", timeToNextStop: 5, nrReihenfolge: 4},
        {name: "Domplatz", timeToNextStop: 5, nrReihenfolge: 5},
        {name: "Hüfferstiftung", timeToNextStop: 5, nrReihenfolge: 6},
        {name: "Aegidiimarkt", timeToNextStop: 5, nrReihenfolge: 7}
    ]);

    function saveSchedule() {
        //TODO Service call save
        handleClose();
    }

    return <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="scheduleEditorTitle">Fahrplan-Editor</DialogTitle>
            <DialogContent className="editorContent">
                <DialogContentText>
                    {`Fahrplan für Buslinie ${name} bearbeiten`}
                </DialogContentText>
                <TableContainer className="scheduleContainer">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nr.-Reihenfolge</TableCell>
                                <TableCell>Dauer zur nächsten Haltestelle (Minuten)</TableCell>
                                <TableCell>Haltestelle</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockStops.map(stop =>
                                <TableRow key={stop.name}>
                                    <TableCell>
                                        <TextField variant="outlined" placeholder="Nummer" value={stop.nrReihenfolge} size="small"></TextField>
                                    </TableCell>
                                    <TableCell>
                                        <TextField variant="outlined" placeholder="Dauer" value={stop.timeToNextStop} size="small"></TextField>
                                    </TableCell>
                                    <TableCell>{stop.name}</TableCell>
                                </TableRow>    
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent> 
            <DialogActions>
                <Button onClick={handleClose}>Abbrechen</Button>
                <Button onClick={() => saveSchedule()}>Speichern</Button>
            </DialogActions>
        </Dialog>
    </>;
}