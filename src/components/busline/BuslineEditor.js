import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import InputMask from 'react-input-mask';
import React from "react";
import { useState } from "react";

export default function BuslineEditor({open, name, handleClose, setName}) {
    const [displayedName, setDisplayedName] = useState(name);

    return <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Buslinien-Editor</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {name ? `Buslinie ${name} editieren` : "Neue Buslinie anlegen"}
                </DialogContentText>
                <InputMask
                    mask="9999"
                    maskChar={null}
                    value={displayedName}
                    onChange={(e) => setDisplayedName(e.target.value)}
                >
                    {() =>
                        <TextField
                            variant="outlined"
                            label="Buslinien-Nr."
                            style={{'color': 'black'}}
                        />
                    }
                </InputMask>

            </DialogContent> 
        </Dialog>
    </>;
}