import { Box, Button, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect } from 'react';
import { useState } from 'react';
import './BuslineOverview.css';
import AddIcon from '@mui/icons-material/Add';
import BuslineEditor from './BuslineEditor';
import BuslineDetail from './BuslineDetail';
import { ApiService } from '../../api/ApiService';
import AddStopDialog from './addStopDialog/AddStopDialog';

export default function BuslineOverview({isAdmin}) {
    const [editorOpen, setEditorOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [scheduleEditorOpen, setScheduleEditorOpen] = useState(false);
    const [selectedBusline, setSelectedBusline] = useState(undefined);
    const [displayedName, setDisplayedName] = useState(undefined);
    const [allBuslines, setAllBuslines] = useState([]);
    const [busStops, setBusStops] = useState([]);
    const [selectedId, setSelectedId] = useState("");

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
        setSelectedId(buslineId);
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

    function setNameAndIdForBusline(buslineName, id) {
        var editedBusline = allBuslines.filter(busline => selectedBusline == busline.name)[0];
        if (editedBusline) {
            editedBusline.name = buslineName;
        } else {
            allBuslines.push({id: id, name: buslineName});
        }
        onBusSearch("");
    }

    function openScheduleEditor(line) {
        setEditorOpen(false);
        setDetailOpen(false);
        setSelectedBusline(line);
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
                        <BuslineEditor isAdmin={isAdmin} id={selectedId} open={editorOpen} name={selectedBusline} handleClose={() => closeDialogs()} setNameAndId={setNameAndIdForBusline} busstops={busStops} displayedName={displayedName} setDisplayedName={setDisplayedName}/> 
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
        <Box sx={{marginBottom: '5vh'}}>
            <TableContainer component={Paper} sx={{'width': '50%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                <Table aria-label="Verfügbare Linien">
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableheader'>Nummer</TableCell>
                            {isAdmin &&
                                <TableCell className='tableheader'></TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            displayedBuslines.map((line) => (
                                <TableRow key={line.id} className='tablerow'>
                                    <TableCell onClick={(event) => onSelectBusline(line.name, line.id)}>{line.name}</TableCell>
                                    {isAdmin &&
                                    <>
                                        <TableCell>
                                            <Button variant='contained' className='scheduleButton' onClick={() => openScheduleEditor(line)}>Haltestelle hinzufügen</Button>
                                        </TableCell>
                                        {/* <ScheduleEditor open={scheduleEditorOpen} name={line.name} handleClose={() => closeDialogs()}></ScheduleEditor> */}
                                    </>}
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        <AddStopDialog open={scheduleEditorOpen} line={selectedBusline} handleClose={() => closeDialogs()} isAdmin={isAdmin}></AddStopDialog>
        <BuslineDetail open={detailOpen} busline={selectedBusline} busstops={busStops} handleClose={() => closeDialogs()} isAdmin={isAdmin}></BuslineDetail>
    </>;
}