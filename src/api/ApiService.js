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
}