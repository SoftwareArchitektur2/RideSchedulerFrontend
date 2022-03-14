import axios from "axios";

const BASEPATH = process.env.REACT_APP_BACKEND_URL;

export class ApiService {
	getAllBuslines() {
		return axios({
			method: "get",
			url: BASEPATH + "/busLines/",
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	getStopsForLine(buslineId) {
		return axios({
			method: "get",
			url: `${BASEPATH}/busLines/${buslineId}/busStops`,
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	getLinesForStops(stopId) {
		return axios({
			method: "get",
			url: `${BASEPATH}/busStops/${stopId}/busLines`,
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}
	getSchedulesForBusStop(stopId, busId) {
		return axios({
			method: "get",
			url: `${BASEPATH}/busLines/${busId}/busStops/${stopId}/schedules`,
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	getAllBusstops() {
		return axios({
			method: "get",
			url: BASEPATH + "/busStops/",
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	saveBusline(buslinename) {
		return axios({
			method: "post",
			url: BASEPATH + "/busLines/",
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			data: {
				name: buslinename,
			},
		});
	}

	updateBusline(buslinename, buslineid) {
		return axios({
			method: "patch",
			url: BASEPATH + "/busLines/" + buslineid,
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			data: {
				name: buslinename,
			},
		});
	}

	saveBusstop(busstop) {
		return axios({
			method: "post",
			url: BASEPATH + "/busStops/",
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			data: {
				name: busstop.name,
				hasWifi: busstop.hasWifi,
			},
		});
	}

	updateBusstop(busstop) {
		return axios({
			method: "patch",
			url: BASEPATH + "/busStops/" + busstop.id,
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			data: {
				name: busstop.name,
				hasWifi: busstop.hasWifi,
			},
		});
	}

	getDestinationsStopsForLine(buslineid) {
		return axios({
			method: "get",
			url: `${BASEPATH}/busLines/${buslineid}/destinationStops`,
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	saveSchedule(schedule) {
		return axios({
			method: "post",
			url: BASEPATH + "/schedules/",
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			data: {
				busLineId: schedule.busLine.id,
				departureTime: schedule.departureTime,
				destinationStopId: schedule.destinationStop.id,
			},
		});
	}

	saveBusstopForBusline(lineId, stop) {
		return axios({
			method: "post",
			url: `${BASEPATH}/busLines/${lineId}/busStops`,
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			data: {
				id: stop.id,
				timeToNextStop: stop.timeToNextStop,
			},
		});
	}

	getAllSchedules() {
		return axios({
			method: "get",
			url: BASEPATH + "/schedules/",
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	deleteBusline(id) {
		return axios({
			method: "delete",
			url: `${BASEPATH}/busLines/${id}`,
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	getJourneyPlan(stopId, startingTime, duration) {
		return axios({
			method: "get",
			url: `${BASEPATH}/busStops/${stopId}/schedules`,
			params: {
				startingTime: startingTime,
				duration: duration,
			},
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	removeBusstopForBusline(stopId) {
		return axios({
			method: "delete",
			url: `${BASEPATH}/busLines/busStops/${stopId}`,
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	getSchedulesForLine(lineId) {
		return axios({
			method: "get",
			url: `${BASEPATH}/busLines/${lineId}/schedules`,
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	deleteSchedule(id) {
		return axios({
			method: "delete",
			url: `${BASEPATH}/schedules/${id}`,
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	deleteBusstop(id) {
		return axios({
			method: "delete",
			url: `${BASEPATH}/busStops/${id}`,
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}
}
