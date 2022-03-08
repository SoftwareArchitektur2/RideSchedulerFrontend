import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { ApiService } from "../../../api/ApiService";
import './AddStopDialog.css';

export default function AddStopDialog({open, line, handleClose, isAdmin, isDelete}) {
    const [allBusstops, setAllBusstops] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    
    const apiService = new ApiService();
    useEffect(() => {
        const fetchBusstops = async () => {
            apiService.getAllBusstops().then(allstops => {
                apiService.getStopsForLine(line.id).then(busstops => {
                    setAllBusstops(allstops.data.filter(stop => busstops.data.filter(includedStop => includedStop.id === stop.id).length === 0));
                })
            })
        }
        if (isAdmin && open && !isDelete) {
            fetchBusstops();
        }
    }, [open]);

    
    useEffect(() => {
        const fetchBusstops = async () => {
                apiService.getStopsForLine(line.id).then(busstops => {
                    setAllBusstops(busstops.data);
                })
        }
        if (isAdmin && open && isDelete) {
            fetchBusstops();
        }
    }, [open]);

    function addStop(stop) {
        if (isDelete) {
            apiService.removeBusstopForBusline(line.id, stop.id).then(res => handleClose()).catch(error => {
                setErrorMsg(error.response.data);
                setIsError(true);
            });
        } else {
            apiService.saveBusstopForBusline(line.id, stop).then(res => handleClose()).catch(error => {
                setErrorMsg(error.response.data);
                setIsError(true);
            });
        }
    }

    return <>
        {line && open &&
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="addStopTitle">{isDelete ? 'Bushaltestelle entfernen' : 'Bushaltestelle hinzufügen'}</DialogTitle>
                <DialogContent className="editorContent">
                    <DialogContentText>
                        {isDelete ? `Haltestelle für Buslinie ${line.name} entfernen` : `Haltestelle für Buslinie ${line.name} hinzufügen`}
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
            <Snackbar open={isError} onClose={() => setIsError(false)} autoHideDuration={3000}>
                <Alert severity="error">{errorMsg}</Alert>    
            </Snackbar>
        </>
        }
    </>;
}