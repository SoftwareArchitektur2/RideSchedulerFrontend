import { Box, Button, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from "react";
import './BusstopOverview.css';
import BusstopEditor from "./BusstopEditor";
import sleep from "../../utils/Timer";
import BusstopDetail from "./BusstopDetail";
import { ApiService } from "../../api/ApiService";

export default function BusstopOverview({isAdmin}) {
    const [allBusstops, setAllBusstops] = useState([]);
    const [displayedBusstops, setDisplayedBusstops] = useState(allBusstops);
    const [editorOpen, setEditorOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedBusstop, setSelectedBusstop] = useState(undefined);
    const [search, setSearch] = useState(undefined);
    const [originalStop, setOriginalStop] = useState(undefined);
    
    const apiService = new ApiService()
    useEffect(() => {
        const fetchBusstops = async () => {
            const busstops = await apiService.getAllBusstops();
            setAllBusstops(busstops.data);
            setDisplayedBusstops(busstops.data);
        }
        fetchBusstops();
      }, []);

    function addBusstop() {
        setSelectedBusstop({name: null, hasWifi: false});
        setEditorOpen(true);
    }

    function onBusstopSearch(searchInput) {
        setSearch(searchInput);
        setDisplayedBusstops(allBusstops.filter(stop => stop.name.toLowerCase().includes(searchInput.toLowerCase())));
    }

    function onSelectBusstop(stop) {
        setSelectedBusstop({...stop});
        setOriginalStop(stop);
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
        setOriginalStop(undefined);
    }
    function removeBusStop(id) {
        let newList = allBusstops.filter(line => line.id !== id);
        setAllBusstops(newList);
        setDisplayedBusstops(newList);
    }

    function setEditedBusstop(stop, stopname, hasWifi) {
        if (stop) {
            let existingStop = allBusstops.filter(busstop => busstop.name == stop.name)[0];
            let editedStop;
            editedStop = {...existingStop, name: stopname, hasWifi: hasWifi};
            let index = allBusstops.indexOf(existingStop);
            let editedBusstops = [...allBusstops];
            editedBusstops.splice(index, 1, editedStop);
            setAllBusstops(editedBusstops);
            setDisplayedBusstops(editedBusstops);
        } else {
            let newStop = {name: stopname, hasWifi: hasWifi};
            let newList = [...allBusstops];
            newList.push(newStop);
            setAllBusstops(newList);
            setDisplayedBusstops(newList);
        }
        setSelectedBusstop(stop);
    }

    return <>
        <Box>
            <Typography variant='h4' sx={{'marginLeft': '25%'}}>Übersicht über die Haltestellen</Typography>
        </Box>
        <Box sx={{flexGrow: 1}}>
            <Toolbar sx={{'width': '50%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                {   isAdmin &&
                    <div>
                        <Button variant='contained' startIcon={<AddIcon />} className='tablebutton' onClick={() => addBusstop()}>
                            Hinzufügen
                        </Button>
                        <BusstopEditor open={editorOpen} handleClose={() => closeDialogs()} busstop={selectedBusstop}  originalStop={originalStop} setDisplayedBusstop={(stop) => setSelectedBusstop(stop)} setBusstop={(stop, stopname, hasWifi) => setEditedBusstop(stop, stopname, hasWifi)} removeBusStop={removeBusStop}  />
                    </div>
                }
                <BusstopDetail open={detailOpen} handleClose={()=> closeDialogs()} busstop={selectedBusstop} isAdmin={isAdmin}/>

                <div className='search'>
                    <div className='searchIconWrapper'>
                        <SearchIcon />
                    </div>
                    <InputBase
                            placeholder='Haltestelle'
                            className='searchfield'
                            onInput={(event) => onBusstopSearch(event.target.value)}
                            value={search}
                    />
                </div>
            </Toolbar>
        </Box>
        <Box sx={{marginBottom: '5vh'}}>
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
                                <TableRow key={stop.id} className='tablerow' onClick={(event) => onSelectBusstop(stop)}>
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