import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { ApiService } from "../../api/ApiService";

import './BusstopEditor.css';

export default function BusstopEditor({open, handleClose, originalStop, busstop, setBusstop, setDisplayedBusstop}) {

    const apiService = new ApiService();

    function saveBusstop() {
        serviceCallSaveStop().then(res => {
            setBusstop(originalStop, busstop.name, busstop.hasWifi);
            handleClose();
        }); 
    }

    function serviceCallSaveStop() {
        if (originalStop) {
            return apiService.updateBusstop(busstop);
        } else {
            return apiService.saveBusstop(busstop);
        }
    }

    return <>
        {busstop &&
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="busstopEditorTitle">Haltstellen-Editor</DialogTitle>
                <DialogContent className="editorContent">
                    <DialogContentText>
                        {busstop ? 'Haltestelle editieren' : 'Haltestelle anlegen'}
                    </DialogContentText>
                    <TextField
                        variant="outlined"
                        label="Haltestelle"
                        style={{'color': 'black'}}
                        className="busstopInput"
                        onChange={(event) => setDisplayedBusstop({...busstop, name: event.target.value})}
                        value={busstop.name}
                    />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={busstop.hasWifi} onChange={(event) => setDisplayedBusstop({...busstop, hasWifi: event.target.checked})}/>} label="WLan vorhanden" />
                    </FormGroup>
                </DialogContent> 
                <DialogActions>
                    <Button onClick={handleClose}>Abbrechen</Button>
                    <Button onClick={() => saveBusstop()}>Speichern</Button>
                </DialogActions>
            </Dialog>
        }
    </>;
}