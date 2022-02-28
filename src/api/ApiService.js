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
}