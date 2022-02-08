import { Box, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import React from 'react';
import './BuslineOverview.css';

export default function BuslineOverview() {
    var buslines = [
        {id: 0, name: "1", destination: "Roxel"},
        {id: 1, name: "11", destination: "Münster Hbf"},
        {id: 2, name: "15", destination: "Kinderhaus"},
        {id: 3, name: "16", destination: "Coerde"},
        {id: 4, name: "22", destination: "Gievenbeck"}
    ];

    return <>
        <Box sx={{flexGrow: 1}}>
            <Toolbar>
                <div className='search'>
                    <div className='searchIconWrapper'>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder='Buslinie'
                        className='searchfield'
                    />
                </div>
            </Toolbar>
        </Box>
        <Box>
            <TableContainer component={Paper}>
                <Table aria-label="Verfügbare Linien">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nummer</TableCell>
                            <TableCell>Endhaltestation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            buslines.map((line) => (
                                <TableRow key={line.id}>
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