import { Autocomplete, Box, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputMask from 'react-input-mask';
import React from 'react';
import { useState } from 'react';
import './BuslineOverview.css';
import { useHistory } from 'react-router-dom';

export default function BuslineOverview() {
    let history = useHistory();

    var allBuslines = [
        {id: 0, name: "1", destination: "Roxel"},
        {id: 1, name: "11", destination: "Münster Hbf"},
        {id: 2, name: "15", destination: "Kinderhaus"},
        {id: 3, name: "16", destination: "Coerde"},
        {id: 4, name: "22", destination: "Gievenbeck"}
    ];
    const [displayedBuslines, setDisplayedBuslines] = useState(allBuslines);

    function onBusSearch(value) {
        setDisplayedBuslines(allBuslines.filter(bus => bus.name.includes(value)));
    }

    function onSelectBusline(busline) {
        console.log(busline);
        history.push(`/busline/${busline}`);
    }

    return <>
        <Box sx={{flexGrow: 1}}>
            <Toolbar>
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
            <TableContainer component={Paper}>
                <Table aria-label="Verfügbare Linien">
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableheader'>ID</TableCell>
                            <TableCell className='tableheader'>Nummer</TableCell>
                            <TableCell className='tableheader'>Endhaltestation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            displayedBuslines.map((line) => (
                                <TableRow key={line.id} className='tablerow' onClick={(event) => onSelectBusline(line.name)}>
                                    <TableCell>{line.id}</TableCell>
                                    <TableCell>{line.name}</TableCell>
                                    <TableCell>{line.destination}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </>;
}