import axios from "axios";

const BASEPATH = "http://localhost:8080";

export class ApiService {
    getAllBuslines() {
        return axios({
            method: 'get',
            url: BASEPATH + '/busLines/',
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    getStopsForLine(buslineId) {
        return axios({
            method: 'get',
            url: `${BASEPATH}/busLines/${buslineId}/busStops`,
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    getLinesForStops(stopId) {
        return axios({
            method: 'get',
            url: `${BASEPATH}/busStops/${stopId}/busLines`,
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    getAllBusstops() {
        return axios({
            method: 'get',
            url: BASEPATH + '/busStops/',
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    saveBusline(buslinename) {
        return axios({
            method: 'post',
            url: BASEPATH + '/busLines/',
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                name: buslinename
            }
        });
    }

    updateBusline(buslinename, buslineid) {
        return axios({
            method: 'patch',
            url: BASEPATH + '/busLines/' + buslineid,
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                name: buslinename
            }
        });
    }

    saveBusstop(busstop) {
        return axios({
            method: 'post',
            url: BASEPATH + "/busStops/",
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                name: busstop.name,
                hasWifi: busstop.hasWifi
            }
        })
    }

    updateBusstop(busstop) {
        return axios({
            method: 'patch',
            url: BASEPATH + '/busStops/' + busstop.id,
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                name: busstop.name,
                hasWifi: busstop.hasWifi
            }
        });
    }

    getDestinationsStopsForLine(buslineid) {
        return axios({
            method: 'get',
            url: `${BASEPATH}/busLines/${buslineid}/destinationStops`,
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    saveSchedule(schedule) {
        return axios({
            method: 'post',
            url: BASEPATH + "/schedules/",
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                busLineId: schedule.line.id,
                departureTime: schedule.startingTime,
                destinationStopId: schedule.lastStop.id
            }
        });
    }
}