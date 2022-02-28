import {Autocomplete, Toolbar,InputBase, Button,Box, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControlLabel, FormGroup, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputMask from 'react-input-mask';
import React, { useRef, useState } from "react";

import './BusstopDetail.css';

export default function BusstopDetail({open, handleClose,  busstop}) {
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedBusline, setSelectedBusline] = useState(undefined);
    const [displayedName, setDisplayedName] = useState(undefined);
    const [allBuslines, setAllBuslines] = useState([
        {id: 0, name: "1"},
        {id: 1, name: "11"},
        {id: 2, name: "15"},
        {id: 3, name: "16"},
        {id: 4, name: "22"}
    ]);

    const [displayedBuslines, setDisplayedBuslines] = useState(allBuslines);

    function onBusSearch(value) {
        setDisplayedBuslines(allBuslines.filter(bus => bus.name.toLowerCase().includes(value.toLowerCase())));
    }
    function onSelectBusline(busline) {
        setSelectedBusline(busline);
        setDisplayedName(busline + "");
        setDetailOpen(true)
    }

    // function addBusline() {
    //     setSelectedBusline(undefined);
    //     setDisplayedName(undefined);
    //     setEditorOpen(true);
    // }


    return <>
        {busstop &&
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle className="busstopDetailTitle">BusStop-Editor</DialogTitle>
                <DialogContent className="detailContent">
                    <DialogContentText>
                        {`Haltestelle: ${busstop.name}` }
                    </DialogContentText>
                    <Box sx={{flexGrow: 1}}>
            <Toolbar sx={{'width': '90%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
               
                <div className='search' style={{width: "50%"}} >
                    <div className='searchIconWrapper'>
                        <SearchIcon />
                    </div>
                    <InputMask
                        mask="9999"
                        maskChar={null}
                    >
                        {() => <InputBase
                            placeholder='Buslinien-Nr.'
                            className='searchfield'
                            onInput={(event) => onBusSearch(event.target.value)}
                        />}
                    </InputMask>
                </div>
            </Toolbar>
        </Box>
                    <Box>
            <TableContainer component={Paper} sx={{'width': '100%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                <Table aria-label="Verfügbare Linien">
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableheader'>Buslinien</TableCell>
                            {/* {isAdmin &&
                                <TableCell className='tableheader'>Fahrplan</TableCell>
                            } */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            displayedBuslines.map((line) => (
                                <TableRow key={line.name} className='tablerow'>
                                    <TableCell onClick={(event) => onSelectBusline(line.name)}>{line.name}</TableCell>
                                    
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
                    {/* <TextField
                        variant="outlined"
                        label="Haltestelle"
                        style={{'color': 'black'}}
                        className="busstopInput"
                       // onChange={(event) => setDisplayedBusstop({...busstop, name: event.target.value})}
                        value={busstop.name}
                    />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox value={busstop.hasWifi} onChange={(event) => setDisplayedBusstop({...busstop, hasWifi: event.target.checked})}/>} label="WLan vorhanden" />
                    </FormGroup> */}
                </DialogContent> 
                <DialogActions>
                    <Button onClick={handleClose}>Abbrechen</Button>
                    {/* <Button onClick={() => saveBusstop()}>Speichern</Button> */}
                </DialogActions>
            </Dialog>
        }
    </>;
}