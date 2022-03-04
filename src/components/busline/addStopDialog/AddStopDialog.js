import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { ApiService } from "../../../api/ApiService";
import './AddStopDialog.css';

export default function AddStopDialog({open, line, handleClose, isAdmin}) {
    const [allBusstops, setAllBusstops] = useState([]);
    
    const apiService = new ApiService();
    useEffect(() => {
        const fetchBusstops = async () => {
            apiService.getAllBusstops().then(allstops => {
                apiService.getStopsForLine(line.id).then(busstops => {
                    setAllBusstops(allstops.data.filter(stop => busstops.data.filter(includedStop => includedStop.id === stop.id).length === 0));
                })
            })
        }
        if (isAdmin) {
            fetchBusstops();
        }
    }, [line]);

    function addStop(stop) {
        apiService.saveBusstopForBusline(line.id, stop).then(res => handleClose());
    }

    return <>
        {line &&
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="addStopTitle">Bushaltestelle hinzufügen</DialogTitle>
                <DialogContent className="editorContent">
                    <DialogContentText>
                        {`Haltestelle für Buslinie ${line.name} hinzufügen`}
                    </DialogContentText>
                    <TableContainer className="addStopContainer">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Bushaltestelle</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allBusstops.map(stop =>
                                    <TableRow key={stop.id}>
                                        <TableCell onClick={() => addStop(stop)} className="stopListEntry">{stop.name}</TableCell>
                                    </TableRow>    
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent> 
                <DialogActions>
                    <Button onClick={handleClose}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        }
    </>;
}