import { commonRequest } from "./commonRequest";
const server = "http://localhost:8010";

export const createTask = async (data, id) => {
  return await commonRequest("POST", `${server}/boards/${id}/tasks`, data);
};
export const getTask = async (id) => {
  return await commonRequest("GET", `${server}/boards/${id}/tasks`, "");
};
