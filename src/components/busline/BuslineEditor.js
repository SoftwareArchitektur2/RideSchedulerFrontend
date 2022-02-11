import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import InputMask from 'react-input-mask';
import React from "react";
import { useState } from "react";
import './BuslineEditor.css';
import { DataGrid } from "@mui/x-data-grid";

export default function BuslineEditor({open, name, handleClose, setName, displayedName, setDisplayedName}) {

    const [busstops, setBusstops] = useState([{name: "Tibusstraße", hasWifi: false},
                                              {name: "Altstadt/Bült", hasWifi: true},
                                              {name: "Eisenbahnstraße", hasWifi: false},
                                              {name: "Hauptbahnhof", hasWifi: true},
                                              {name: "Domplatz", hasWifi: true},
                                              {name: "Hüfferstiftung", hasWifi: false},
                                              {name: "Aegidiimarkt", hasWifi: true}]);

    function saveBusline() {
        setName(displayedName);
        //TODO service calls
        handleClose();
    }

    const busstopColumns = [
        {field: 'name', headerName: 'Haltestelle', flex: 1},
        {field: 'hasWifi', headerName: 'WLan vorhanden', valueGetter: (params) => params.row.hasWifi ? "Ja" : "Nein", flex: 0.5}
    ]

    const [selectionModel, setSelectionModel] = useState(() => busstops.filter(stop => stop.hasWifi).map(stop => stop.name));

    return <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="buslineEditorTitle">Buslinien-Editor</DialogTitle>
            <DialogContent className="editorContent">
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
                            className="buslineInput"
                        />
                    }
                </InputMask>
                <div className="busstopTable">
                    <DataGrid
                        rows={busstops}
                        columns={busstopColumns}
                        checkboxSelection   
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        getRowId={(row) => row.name}
                        autoHeight={true}
                        disableExtendRowFullWidth={true}
                        selectionModel={selectionModel}
                        onSelectionModelChange={setSelectionModel}
                    />
                </div>
            </DialogContent> 
            <DialogActions>
                <Button onClick={handleClose}>Abbrechen</Button>
                <Button onClick={() => saveBusline()}>Speichern</Button>
            </DialogActions>
        </Dialog>
    </>;
}