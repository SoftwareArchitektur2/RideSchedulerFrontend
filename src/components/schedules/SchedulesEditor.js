import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import moment from 'moment';
import React, { useEffect } from "react";
import { useState } from "react";
import './SchedulesEditor.css';

import { ApiService } from "../../api/ApiService";

export default function SchedulesEditor({open, handleClose, schedule,  removeSchedule}) {
    
    const [getAllSchedules, setAllSchedules] = useState([]);

    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const apiService = new ApiService();

     
    

    function deleteSchedule() {
        
          
            apiService.deleteSchedule(schedule.id).then(res => {
                removeSchedule(schedule.id);
                handleClose();
            }).catch(error => {
                setIsError(true);
                setErrorMsg(error.response.data);
            
            })
        } 
    
    
    return <>
        {schedule &&
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="schedulesEditorTitle">Schedules-Editor</DialogTitle>
                <DialogContent className="editorContent">
                    <DialogContentText>
                        {`Fahrplan ${schedule.busLine.name} ${moment(schedule.departureTime, "HH:mm:ss").format("HH:mm")}  ${schedule.destinationStop.name}` }
                        </DialogContentText>
                    
                    
                        <Button variant="contained" className="scheduleButton" style={{display: 'block', marginRight: 'auto', marginLeft: 'auto', marginTop: '10px'}} onClick={() => deleteSchedule()}>Löschen</Button>
                    
                </DialogContent> 
                <DialogActions>
                    <Button onClick={handleClose}>Abbrechen</Button>
                 </DialogActions>
            </Dialog>
        }
        <Snackbar open={isError} onClose={() => setIsError(false)} autoHideDuration={3000}>
            <Alert severity="error">{errorMsg}</Alert>    
        </Snackbar>
    </>;
}