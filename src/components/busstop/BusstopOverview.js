import { Box, Button, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from "react";
import './BusstopOverview.css';

export default function BusstopOverview({isAdmin}) {
    const [allBusstops, setAllBusstops] = useState([
        {name: "Tibusstraße", hasWifi: false},
        {name: "Altstadt/Bült", hasWifi: true},
        {name: "Eisenbahnstraße", hasWifi: false},
        {name: "Hauptbahnhof", hasWifi: true},
        {name: "Domplatz", hasWifi: true},
        {name: "Hüfferstiftung", hasWifi: false},
        {name: "Aegidiimarkt", hasWifi: true}
    ]);
    const [displayedBusstops, setDisplayedBusstops] = useState(allBusstops);
    const [editorOpen, setEditorOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedBusstop, setSelectedBusstop] = useState(undefined);

    function addBusstop() {
        setSelectedBusstop(undefined);
        setEditorOpen(true);
    }

    function onBusstopSearch(search) {
        setDisplayedBusstops(allBusstops.filter(stop => stop.name.includes(search)));
    }

    function onSelectBusstop(stop) {
        setSelectedBusstop(stop);
        if (isAdmin) {
            setEditorOpen(true);
        } else {
            setDetailOpen(true);
        } 
    }

    function closeDialogs() {
        setEditorOpen(false);
        setDetailOpen(false);
        setSelectedBusstop(undefined);
    }

    return <>
         <Box>
            <Typography variant='h4' sx={{'marginLeft': '25%'}}>Übersicht über die Buslinien</Typography>
        </Box>
        <Box sx={{flexGrow: 1}}>
            <Toolbar sx={{'width': '50%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                {   isAdmin &&
                    <div>
                        <Button variant='contained' startIcon={<AddIcon />} className='tablebutton' onClick={() => addBusstop()}>
                            Hinzufügen
                        </Button>
                    </div>
                }
                <div className='search'>
                    <div className='searchIconWrapper'>
                        <SearchIcon />
                    </div>
                    <InputBase
                            placeholder='Haltestelle'
                            className='searchfield'
                            onInput={(event) => onBusstopSearch(event.target.value)}
                    />
                </div>
            </Toolbar>
        </Box>
        <Box>
            <TableContainer component={Paper} sx={{'width': '50%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                <Table aria-label="Verfügbare Haltestellen">
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableheader'>Haltestelle</TableCell>
                            <TableCell className='tableheader'>WLan vorhanden</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            displayedBusstops.map((stop) => (
                                <TableRow key={stop.name} className='tablerow' onClick={(event) => onSelectBusstop(stop)}>
                                    <TableCell>{stop.name}</TableCell>
                                    <TableCell>{stop.hasWifi ? 'Ja' : 'Nein'}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </>;
}