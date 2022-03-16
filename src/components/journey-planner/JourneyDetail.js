import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { ApiService } from "../../api/ApiService";
import "./JourneyDetail.css";

export default function JourneyDetail({
	open,
	journey,
	selectedStop,
	handleClose,
}) {
	const [busstops, setBusstops] = useState([]);
	const apiService = new ApiService();

	useEffect(() => {
		const fetchBusstops = async () => {
			apiService
				.getBusstopsForSchedule(journey.id, selectedStop.id)
				.then((res) => {
					setBusstops(res.data);
				});
		};
		if (open && journey && selectedStop) {
			fetchBusstops();
		}
	}, [journey]);

	return (
		<>
			{journey && (
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle className="journeyDetailTitle">
						Fahrplan
					</DialogTitle>
					<DialogContent className="detailContent">
						<DialogContentText>
							{`Buslinie ${journey.busLine.name}`}
						</DialogContentText>
						<div className="busstopTable">
							<ul className="busstops">
								{busstops.map((stop) => (
									<>
										<li key={stop.busStopInBusLineId}>
											{stop.name}
										</li>
										<li
											key={
												stop.busStopInBusLineId + "time"
											}
										>
											{moment(
												stop.arrivalTime,
												"YYYY-MM-DD[T]HH:mm:ss[.000+00:00]"
											).format("HH:mm")}
										</li>
									</>
								))}
							</ul>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Schließen</Button>
					</DialogActions>
				</Dialog>
			)}
		</>
	);
}
