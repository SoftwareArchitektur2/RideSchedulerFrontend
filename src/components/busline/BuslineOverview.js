import { Autocomplete, Box, Button, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputMask from 'react-input-mask';
import React, { useEffect } from 'react';
import { useState } from 'react';
import './BuslineOverview.css';
import { useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import BuslineEditor from './BuslineEditor';
import BuslineDetail from './BuslineDetail';
import ScheduleEditor from './schedule/ScheduleEditor';
import { ApiService } from '../../api/ApiService';

export default function BuslineOverview({isAdmin}) {
    const [editorOpen, setEditorOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [scheduleEditorOpen, setScheduleEditorOpen] = useState(false);
    const [selectedBusline, setSelectedBusline] = useState(undefined);
    const [displayedName, setDisplayedName] = useState(undefined);
    const [allBuslines, setAllBuslines] = useState([]);
    const [busStops, setBusStops] = useState([]);

    const apiService = new ApiService();

    useEffect(() => {
      const fetchBuslines = async () => {
          const buslines = await apiService.getAllBuslines();
          setAllBuslines(buslines.data);
          setDisplayedBuslines(buslines.data);
      }
      fetchBuslines();
    }, []);
    

    const [displayedBuslines, setDisplayedBuslines] = useState(allBuslines);

    function onBusSearch(value) {
        setDisplayedBuslines(allBuslines.filter(bus => bus.name.toLowerCase().includes(value.toLowerCase())));
    }

    function onSelectBusline(busline, buslineId) {
        apiService.getStopsForLine(buslineId).then((busstops) => {
            setBusStops(busstops.data);
        });
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
        setBusStops([]);
        setScheduleEditorOpen(false);
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

    function openScheduleEditor() {
        setEditorOpen(false);
        setScheduleEditorOpen(true);
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
                        <BuslineEditor open={editorOpen} name={selectedBusline} handleClose={() => closeDialogs()} setName={setNameForBusline} busstops={busStops} displayedName={displayedName} setDisplayedName={setDisplayedName}/> 
                    </div>
                }
                <div className='search'>
                    <div className='searchIconWrapper'>
                        <SearchIcon />
                    </div>
                    <InputBase
                            placeholder='Buslinien-Nr.'
                            className='searchfield'
                            onInput={(event) => onBusSearch(event.target.value)}
                    />
                </div>
            </Toolbar>
        </Box>
        <Box>
            <TableContainer component={Paper} sx={{'width': '50%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                <Table aria-label="Verfügbare Linien">
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableheader'>Nummer</TableCell>
                            {isAdmin &&
                                <TableCell className='tableheader'>Fahrplan</TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            displayedBuslines.map((line) => (
                                <TableRow key={line.name} className='tablerow'>
                                    <TableCell onClick={(event) => onSelectBusline(line.name, line.id)}>{line.name}</TableCell>
                                    {isAdmin &&
                                    <>
                                        <TableCell>
                                            <Button variant='contained' className='scheduleButton' onClick={() => openScheduleEditor()}>Fahrplan bearbeiten</Button>
                                        </TableCell>
                                        <ScheduleEditor open={scheduleEditorOpen} name={line.name} handleClose={() => closeDialogs()}></ScheduleEditor>
                                    </>}
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        <BuslineDetail open={detailOpen} busline={selectedBusline} busstops={busStops} handleClose={() => closeDialogs()}></BuslineDetail>
    </>;
}