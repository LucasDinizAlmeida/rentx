import axios from "axios";
const WINDOWS_IP = process.env.WINDOWS_IP

export const api = axios.create({
  baseURL: `http://${WINDOWS_IP}:3333`
})