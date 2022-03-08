import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import './BuslineDetail.css';

export default function BuslineDetail({open, busline, handleClose, busstops}) {
    
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
                                <>
                                <li key={stop.busStopInBusLineId}>{stop.name}</li>
                                <li key={stop.busStopInBusLineId + "ttns"}>{`${stop.timeToNextStop} min`}</li>
                                </>   
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