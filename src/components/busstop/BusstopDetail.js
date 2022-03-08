import {Autocomplete, Toolbar,InputBase, Button,Box,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControlLabel, FormGroup, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputMask from 'react-input-mask';
import React, { useEffect, useRef, useState } from "react";
import moment from 'moment'
import './BusstopDetail.css';
import { ApiService } from "../../api/ApiService";

export default function BusstopDetail({open, handleClose,  busstop,  isAdmin}) {
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedBusline, setSelectedBusline] = useState(undefined);
    const apiService = new ApiService();
    const [allBuslines, setAllBuslines] = useState([]);
    const [allSchedules, setAllSchedules] = useState([]);

    const [displayedBuslines, setDisplayedBuslines] = useState(allBuslines);
    useEffect(() => {
        const fetchBusstops = async () => {
            const res = await apiService.getLinesForStops(busstop.id);
            setAllBuslines(res.data);
            setDisplayedBuslines(res.data);
        }
        if (!isAdmin && open) {
            fetchBusstops();
        }
      }, [busstop]);

      useEffect(() => {
        const fetchTimes = async () => {
            const res = await apiService.getSchedulesForBusStop( selectedBusline.id,busstop.id);
            
            setAllSchedules(res.data.map(schedule=>getdepartureTimeFromSchedule(schedule)));
            
        }
        if (!isAdmin && open) {
            fetchTimes();
        }
      }, [selectedBusline]);
 function getdepartureTimeFromSchedule(schedule){
     if(schedule.departureTime.length>10){
         return {...schedule,departureTime:moment(schedule.departureTime,"YYYY-MM-DD[T]HH:mm:ss[.000+00:00]").format("HH:mm")} 
     }else {
         return  {...schedule,departureTime:moment(schedule.departureTime,"HH:mm:ss").format("HH:mm")} 
     }
    
 }
    function onBusSearch(value) {
        setDisplayedBuslines(allBuslines.filter(bus => bus.name.toLowerCase().includes(value.toLowerCase())));
    }
    function onSelectBusline(busline) {
        setSelectedBusline(busline);
       
        setDetailOpen(true)
    }

    function close() {
        setSelectedBusline(undefined);
        
        handleClose();
      
    }


    return <>
        {busstop &&
            <Dialog open={open} onClose={()=>close()} >
                <DialogTitle className="busstopDetailTitle">Fahrplan</DialogTitle>
                <DialogContent className="detailContent">
                    <DialogContentText>
                        {`Haltestelle: ${busstop.name}` }
                    </DialogContentText>
                  
                  {!selectedBusline? 
                  <div>
                    <Box sx={{flexGrow: 1}}>
            <Toolbar sx={{'width': '90%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
               
                <div className='search' style={{width: "50%"}} >
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
            <TableContainer component={Paper} sx={{'width': '100%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                <Table aria-label="Verfügbare Linien">
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableheader'>Buslinien</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            displayedBuslines.map((line) => (
                                <TableRow key={line.id} className='tablerow'>
                                    <TableCell onClick={(event) => onSelectBusline(line)}>{line.name}</TableCell>
                                    
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        </div> : 
         <Box>
         <TableContainer component={Paper} sx={{'width': '100%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
             <Table aria-label="Verfügbare Linien">
                 <TableHead>
                     <TableRow>
                         <TableCell className='tableheader'>{"Abfahrtszeiten "+ selectedBusline.name}</TableCell>
                      
                     </TableRow>
                 </TableHead>
                 <TableBody>
                     {
                         allSchedules.map((line) => (
                             <TableRow key={line.departureTime} className='tablerowSchedules'>
                                 <TableCell >{line.departureTime}</TableCell>
                                 
                             </TableRow>
                         ))
                     }
                 </TableBody>
             </Table>
         </TableContainer>
     </Box>}
                    
                    
                </DialogContent> 
                <DialogActions>
                    <Button onClick={()=>close()}>SCHLIESSEN</Button>
                </DialogActions>
            </Dialog>
        }
    </>;
}