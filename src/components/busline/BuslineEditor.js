import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import InputMask from 'react-input-mask';
import React, { useEffect } from "react";
import { useState } from "react";
import './BuslineEditor.css';
import { DataGrid } from "@mui/x-data-grid";
import { ApiService } from "../../api/ApiService";

export default function BuslineEditor({open, name, handleClose, setNameAndId, displayedName, setDisplayedName, busstops, id, isAdmin, removeLine}) {

    const [allBusstops, setAllBusstops] = useState([]);

    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const apiService = new ApiService();

    useEffect(() => {
        const fetchBusstops = async () => {
            const res = await apiService.getAllBusstops();
            setAllBusstops(res.data);
            // setSelectionModel(res.data.filter(stop => busstops.filter(mappedStop => mappedStop.name == stop.name).length > 0).map(stop => stop.name));
        }
        if (isAdmin) {
            fetchBusstops();
        }
      }, [busstops]);

    function saveBusline() {
        if (!displayedName || displayedName == "") {
            setIsError(true);
            setErrorMsg("Felder dürfen nicht leer sein")
            return;
        } else if (name && allBusstops.filter(stop => stop.nrReihenfolge).length === 0) {
            setIsError(true);
            setErrorMsg("Mindestens eine Haltestelle muss ausgewählt sein");
            return;
        }
        
        let savedId;
        if (name) {
            apiService.updateBusline(displayedName, id).then(res => {
                setNameAndId(displayedName, id);
                handleClose();
            }).catch(error => {
                setIsError(true);
                setErrorMsg(error.response.data);
            });
        } else {
            apiService.saveBusline(displayedName).then(savedLine => {
                savedId = savedLine.data.id;
               let sortedStops = allBusstops.filter(stop => stop.nrReihenfolge).sort((a, b) => {return a.nrReihenfolge - b.nrReihenfolge});
                sortedStops.forEach(stop => {
                    apiService.saveBusstopForBusline(savedLine.data.id, stop).catch(error => {
                        setIsError(true);
                        setErrorMsg(error.response.data);
                    });
                }).catch(error => {
                    setIsError(true);
                    setErrorMsg(error.response.data);
                });
                setNameAndId(displayedName, savedId ? savedId : id);
                handleClose(); 
            });
        }
    }

    function deleteBusline() {
        apiService.getStopsForLine(id).then(res => {
            if (res.data.length > 0) {
                setIsError(true);
                setErrorMsg("Buslinie enthält Haltestellen und kann nicht gelöscht werden!");
                return;
            }
            apiService.deleteBusline(id).then(res => {
                removeLine(id);
                handleClose();
            }).catch(error => {
                setIsError(true);
                setErrorMsg(error.response.data);
            })
        })
    }

    // const busstopColumns = [
    //     {field: 'name', headerName: 'Haltestelle', flex: 1},
    //     {field: 'hasWifi', headerName: 'WLan vorhanden', valueGetter: (params) => params.row.hasWifi ? "Ja" : "Nein", flex: 0.5}
    // ]

    // const [selectionModel, setSelectionModel] = useState([]);

    return <>
        {busstops &&
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="buslineEditorTitle">Buslinien-Editor</DialogTitle>
                <DialogContent className="editorContent">
                    <DialogContentText>
                        {name ? `Buslinie ${name} editieren` : "Neue Buslinie anlegen"}
                    </DialogContentText>
                            <TextField
                                variant="outlined"
                                label="Buslinien-Nr."
                                style={{'color': 'black'}}
                                className="buslineInput"
                                value={displayedName}
                                onChange={(e) => setDisplayedName(e.target.value)}
                            />
                    {!name && 
                        <div className="busstopTable">
                            {/* <DataGrid
                                rows={allBusstops}
                                columns={busstopColumns}
                                checkboxSelection   
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                getRowId={(row) => row.name}
                                autoHeight={true}
                                disableExtendRowFullWidth={true}
                                selectionModel={selectionModel}
                                onSelectionModelChange={setSelectionModel}
                            /> */}
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nr. Reihenfolge</TableCell>
                                        <TableCell>Minuten bis zum nächsten Halt</TableCell>
                                        <TableCell>Haltestelle</TableCell>
                                        <TableCell>WLan vorhanden</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allBusstops.map(stop =>
                                        <TableRow key={stop.id}>
                                            <TableCell>
                                                <TextField variant="outlined" placeholder="Nummer" value={stop.nrReihenfolge} size="small" onChange={(event) => {stop.nrReihenfolge = parseInt(event.target.value)}}></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField variant="outlined" placeholder="Dauer" value={stop.timeToNextStop} size="small" onChange={(event) => {stop.timeToNextStop = parseInt(event.target.value)}}></TextField>
                                            </TableCell>
                                            <TableCell>{stop.name}</TableCell>
                                            <TableCell>{stop.hasWifi ? "Ja" : "Nein"}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    }
                    {name &&
                        <Button variant="contained" className="scheduleButton" style={{display: 'block', marginRight: 'auto', marginLeft: 'auto', marginTop: '10px'}} onClick={() => deleteBusline()}>Löschen</Button>
                    }
                </DialogContent> 
                <DialogActions>
                    <Button onClick={handleClose}>Abbrechen</Button>
                    <Button onClick={() => saveBusline()}>Speichern</Button>
                </DialogActions>
            </Dialog>
        }
        <Snackbar open={isError} onClose={() => setIsError(false)} autoHideDuration={3000}>
            <Alert severity="error">{errorMsg}</Alert>    
        </Snackbar>
    </>;
}