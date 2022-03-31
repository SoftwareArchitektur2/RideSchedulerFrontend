import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Toolbar,
	Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import "./Schedules.css";
import AddSchedule from "./AddSchedule";
import { ApiService } from "../../api/ApiService";
import moment from "moment";
import { useHistory } from "react-router-dom";
import SchedulesEditor from "./SchedulesEditor";

export default function Schedules({ isAdmin }) {
	const [schedule, setSchedule] = useState([]);
	const [addScheduleOpen, setAddScheduleOpen] = useState(false);
	const [editorOpen, setEditorOpen] = useState(false);
	const [selectedSchedule, setSelectedSchedule] = useState(undefined);
	const [allSchedules, setAllSchedules] = useState([]);

	let history = useHistory();

	const apiService = new ApiService();
	useEffect(() => {
		if (isAdmin) {
			const fetchSchedules = async () => {
				const fetchedSchedules = await apiService.getAllSchedules();
				setAllSchedules(fetchedSchedules.data);
			};
			fetchSchedules();
		} else {
			history.push("/");
		}
	}, []);
	const [displayedSchedules, setDisplayedSchedules] = useState(allSchedules);
	function addSchedule() {
		setAddScheduleOpen(true);
	}

	function onSelectSchedules(schedules) {
		setSelectedSchedule({ ...schedules });

		if (isAdmin) {
			setEditorOpen(true);
		}
	}
	function closeDialogs() {
		setEditorOpen(false);

		setSelectedSchedule(undefined);
	}

	function removeSchedule(id) {
		let newList = allSchedules.filter((schedule) => schedule.id !== id);
		setAllSchedules(newList);
		setDisplayedSchedules(newList);
	}
	function displayAddedSchedule(schedule) {
		const fetchSchedules = async () => {
			const fetchedSchedules = await apiService.getAllSchedules();
			setAllSchedules(fetchedSchedules.data);
		};
		fetchSchedules();
	}
	return (
		<>
			<Box>
				<Typography variant="h4" sx={{ marginLeft: "25%" }}>
					Fahrpläne
				</Typography>
			</Box>
			<Box sx={{ flexGrow: 1 }}>
				<Toolbar
					sx={{
						width: "50%",
						marginLeft: "auto",
						marginRight: "auto",
					}}
				>
					{isAdmin && (
						<div>
							<Button
								variant="contained"
								startIcon={<AddIcon />}
								className="tablebutton"
								onClick={() => addSchedule()}
							>
								Hinzufügen
							</Button>
							<AddSchedule
								open={addScheduleOpen}
								handleClose={() => setAddScheduleOpen(false)}
								saveSchedule={(schedule) =>
									displayAddedSchedule(schedule)
								}
							></AddSchedule>
						</div>
					)}
					<SchedulesEditor
						open={editorOpen}
						handleClose={() => closeDialogs()}
						schedule={selectedSchedule}
						removeSchedule={removeSchedule}
					/>
				</Toolbar>
			</Box>
			<Box sx={{ marginBottom: "5vh" }}>
				<TableContainer
					component={Paper}
					sx={{
						width: "50%",
						marginLeft: "auto",
						marginRight: "auto",
					}}
				>
					<Table aria-label="Verfügbare Fahrpläne">
						<TableHead>
							<TableRow>
								<TableCell className="tableheader">
									Buslinie
								</TableCell>
								<TableCell className="tableheader">
									Startzeit
								</TableCell>
								<TableCell className="tableheader">
									Endhaltestelle
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{allSchedules.map((schedule) => (
								<TableRow
									key={schedule.id}
									className="tablerow"
									onClick={(event) =>
										onSelectSchedules(schedule)
									}
								>
									<TableCell>
										{schedule.busLine.name}
									</TableCell>
									<TableCell>
										{moment(
											schedule.departureTime,
											"HH:mm:ss"
										).format("HH:mm")}
									</TableCell>
									<TableCell>
										{schedule.destinationStop.name}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
}
