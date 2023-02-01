import axios from "axios";

export const api = axios.create({
  baseURL: `http://192.166.10.12:3333`
})