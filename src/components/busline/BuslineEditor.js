import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import InputMask from 'react-input-mask';
import React, { useEffect } from "react";
import { useState } from "react";
import './BuslineEditor.css';
import { DataGrid } from "@mui/x-data-grid";
import { ApiService } from "../../api/ApiService";

export default function BuslineEditor({open, name, handleClose, setName, displayedName, setDisplayedName, busstops, id}) {

    const [allBusstops, setAllBusstops] = useState([]);
    const apiService = new ApiService();

    useEffect(() => {
        const fetchBusstops = async () => {
            const res = await apiService.getAllBusstops();
            setAllBusstops(res.data);
            setSelectionModel(res.data.filter(stop => busstops.filter(mappedStop => mappedStop.name == stop.name).length > 0).map(stop => stop.name));
        }
        fetchBusstops();
      }, [busstops]);

    function saveBusline() {
        if (name) {
            apiService.updateBusline(displayedName, id);
        } else {
            apiService.saveBusline(displayedName);
        }
        setName(displayedName);
        handleClose();
    }

    const busstopColumns = [
        {field: 'name', headerName: 'Haltestelle', flex: 1},
        {field: 'hasWifi', headerName: 'WLan vorhanden', valueGetter: (params) => params.row.hasWifi ? "Ja" : "Nein", flex: 0.5}
    ]

    const [selectionModel, setSelectionModel] = useState([]);

    return <>
        {busstops &&
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
                        />
                    </div>
                </DialogContent> 
                <DialogActions>
                    <Button onClick={handleClose}>Abbrechen</Button>
                    <Button onClick={() => saveBusline()}>Speichern</Button>
                </DialogActions>
            </Dialog>
        }
    </>;
}