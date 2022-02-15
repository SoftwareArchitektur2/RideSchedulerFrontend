import { Autocomplete, Box, Button, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputMask from 'react-input-mask';
import React from 'react';
import { useState } from 'react';
import './BuslineOverview.css';
import { useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import BuslineEditor from './BuslineEditor';
import BuslineDetail from './BuslineDetail';

export default function BuslineOverview({isAdmin}) {
    const [editorOpen, setEditorOpen] = useState(false);
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
        setDisplayedBuslines(allBuslines.filter(bus => bus.name.includes(value)));
    }

    function onSelectBusline(busline) {
        setSelectedBusline(busline);
        setDisplayedName(busline + "");
        if (isAdmin) {
            setEditorOpen(true);
        } else {
            setDetailOpen(true);
        } 
    }

    function addBusline() {
        setSelectedBusline(undefined);
        setDisplayedName(undefined);
        setEditorOpen(true);
    }

    function closeDialogs() {
        setEditorOpen(false);
        setDetailOpen(false);
        setSelectedBusline(undefined);
    }

    function setNameForBusline(buslineName) {
        var editedBusline = allBuslines.filter(busline => selectedBusline == busline.name)[0];
        if (editedBusline) {
            editedBusline.name = buslineName;
        } else {
            allBuslines.push({id: allBuslines[allBuslines.length - 1].id + 1, name: buslineName});
        }
        onBusSearch("");
    }

    return <>
        <Box>
            <Typography variant='h4' sx={{'marginLeft': '25%'}}>Übersicht über die Buslinien</Typography>
        </Box>
        <Box sx={{flexGrow: 1}}>
            <Toolbar sx={{'width': '50%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                {   isAdmin &&
                    <div>
                        <Button variant='contained' startIcon={<AddIcon />} className='tablebutton' onClick={() => addBusline()}>
                            Hinzufügen
                        </Button>
                        <BuslineEditor open={editorOpen} name={selectedBusline} handleClose={() => closeDialogs()} setName={setNameForBusline} displayedName={displayedName} setDisplayedName={setDisplayedName}/> 
                    </div>
                }
                <div className='search'>
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
            <TableContainer component={Paper} sx={{'width': '50%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                <Table aria-label="Verfügbare Linien">
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableheader'>Nummer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            displayedBuslines.map((line) => (
                                <TableRow key={line.name} className='tablerow' onClick={(event) => onSelectBusline(line.name)}>
                                    <TableCell>{line.name}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        <BuslineDetail open={detailOpen} busline={selectedBusline} handleClose={() => closeDialogs()}></BuslineDetail>
    </>;
}