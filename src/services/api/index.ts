import axios from "axios";

export const api = axios.create({
  baseURL: `http://${process.env.WINDOWS_IP}:3333`
})