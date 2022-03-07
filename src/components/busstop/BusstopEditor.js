import { Alert, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Snackbar, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { ApiService } from "../../api/ApiService";

import './BusstopEditor.css';

export default function BusstopEditor({open, handleClose, originalStop, busstop, setBusstop, setDisplayedBusstop}) {

    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const apiService = new ApiService();

    function saveBusstop() {
        if (!busstop.name || busstop.name == "") {
            setErrorMsg("Bitte einen Namen vergeben.");
            setErrorOpen(true);
            return;
        } 
        serviceCallSaveStop().then(res => {
            setBusstop(originalStop, busstop.name, busstop.hasWifi);
            handleClose();
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
                setErrorMsg(error.response.data);
                setErrorOpen(true);
            }
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
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="busstopEditorTitle">Haltstellen-Editor</DialogTitle>
                <DialogContent className="editorContent">
                    <DialogContentText>
                        {busstop.id ? 'Haltestelle editieren' : 'Haltestelle anlegen'}
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
            <Snackbar open={errorOpen} autoHideDuration={3000} onClose={() => setErrorOpen(false)}>
                <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>
        </>
        }
    </>;
}