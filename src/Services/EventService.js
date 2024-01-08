import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://hwsrv-966807.hostwindsdns.com:8080',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers':
        'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
        'Access-Control-Max-Age': '86400',
    },
  })

  export default {
    //Unidades
    getUnit(id) {
        return apiClient.get(`/dataSnap/rest/TUnitType/UnitType/${id}`)
    }
  }