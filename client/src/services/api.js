import { commonRequest } from "./commonRequest";
const server = "https://collabboards.vercel.app";

export const createTask = async (data, id) => {
  return await commonRequest("POST", `${server}/boards/${id}/tasks`, data);
};
export const getTask = async (id) => {
  return await commonRequest("GET", `${server}/boards/${id}/tasks`, "");
};
