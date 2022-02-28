import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import './BuslineDetail.css';

export default function BuslineDetail({open, busline, handleClose, busstops}) {
    // const [busstops, setBusstops] = useState([
    //     {name: "Tibusstraße", hasWifi: false},
    //     {name: "Altstadt/Bült", hasWifi: true},
    //     {name: "Eisenbahnstraße", hasWifi: false},
    //     {name: "Hauptbahnhof", hasWifi: true},
    //     {name: "Domplatz", hasWifi: true},
    //     {name: "Hüfferstiftung", hasWifi: false},
    //     {name: "Aegidiimarkt", hasWifi: true}
    // ]);
    
    return <>
        {busline &&
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="buslineDetailTitle">Fahrplan</DialogTitle>
                <DialogContent className="detailContent">
                    <DialogContentText>
                        {`Buslinie ${busline}`}
                    </DialogContentText>
                    <div className="busstopTable">
                        <ul className="busstops">
                            {busstops.map(stop => 
                                <li>{stop.name}</li>    
                            )}
                        </ul>
                    </div>
                </DialogContent> 
                <DialogActions>
                    <Button onClick={handleClose}>Schließen</Button>
                </DialogActions>
            </Dialog>
        }
    </>;
}