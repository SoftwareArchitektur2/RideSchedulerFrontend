import axios from "axios";

const BASEPATH = "http://localhost:8080";

export default function getAllBuslines() {
    return axios({
        method: 'get',
        url: BASEPATH + '/busLines',
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
}