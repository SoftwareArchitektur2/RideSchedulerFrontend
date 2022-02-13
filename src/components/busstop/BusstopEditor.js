import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, TextField } from "@mui/material";
import React, { useRef } from "react";

import './BusstopEditor.css';

export default function BusstopEditor({open, handleClose, busstop, setBusstop}) {
    const wifiCheck = useRef(null);
    const stopName = useRef(null);

    function saveBusstop() {
        setBusstop(busstop);
        handleClose();
    }

    function setBusstopName(stopname) {
        if (busstop) {
            setBusstop({...busstop, name: stopname});
        } else {
            setBusstop({name: stopname, hasWifi: wifiCheck.current});
        }
    }

    function setWifi(wifi) {
        if (busstop) {
            setBusstop({...busstop, hasWifi: wifi});
        } else {
            setBusstop({name: stopName.current, hasWifi: wifi});
        }
    }

    return <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="busstopEditorTitle">Buslinien-Editor</DialogTitle>
            <DialogContent className="editorContent">
                <DialogContentText>
                    {busstop ? 'Haltestelle editieren' : 'Haltestelle anlegen'}
                </DialogContentText>
                <TextField
                    variant="outlined"
                    label="Haltestelle"
                    style={{'color': 'black'}}
                    className="busstopInput"
                    value={busstop ? busstop.name : undefined}
                    onChange={(event) => setBusstopName(event.target.value)}
                    ref={stopName}
                />
                <FormGroup>
                    <FormControlLabel control={<Checkbox ref={wifiCheck} onChange={(event) => setWifi(event.target.checked)}/>} label="WLan vorhanden" />
                </FormGroup>
            </DialogContent> 
            <DialogActions>
                <Button onClick={handleClose}>Abbrechen</Button>
                <Button onClick={() => saveBusstop()}>Speichern</Button>
            </DialogActions>
        </Dialog>
    </>;
}