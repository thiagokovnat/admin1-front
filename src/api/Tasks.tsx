import { CreateTaskRequest } from "../models/Tasks";
import LearningApi from "./LearningApi";

export const uploadTask = async (params: CreateTaskRequest) => {
  try {
    const token = localStorage.getItem("token");
    return await LearningApi.post("/tasks", params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (params: CreateTaskRequest, taskId: string) => {
  try {
    const token = localStorage.getItem("token");
    return await LearningApi.put("/tasks/" + taskId, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const token = localStorage.getItem("token");
    return await LearningApi.delete("/tasks/" + taskId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getTask = async (taskId: string) => {
  try {
    const token = localStorage.getItem("token");
    return await LearningApi.get("/tasks/" + taskId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    throw error;
  }
};
