import { CreateTaskRequest, Resolution } from "../models/Tasks";
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

export const createResolution = async (taskId: string, resolution: string) => {
  try {
    const token = localStorage.getItem("token");
    return await LearningApi.post(
      "/resolutions",
      { resolution, task_id: taskId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const editResolution = async (taskId: string, resolution: string) => {
  try {
    const token = localStorage.getItem("token");
    return await LearningApi.put(
      "/resolutions/" + taskId,
      { resolution, task_id: taskId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getResolutions = async (taskId: string): Promise<Resolution[]> => {
  try {
    const token = localStorage.getItem("token");
    const results = await LearningApi.get(`/resolutions/${taskId}/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return results.data.resolutions;
  } catch (error) {
    throw error;
  }
};

export const getResolutionByUser = async (taskId: string, userId: string) => {
  try {
    const token = localStorage.getItem("token");
    const results = await LearningApi.get(`/resolutions/${taskId}/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return results.data.resolutions;
  } catch (error) {
    throw error;
  }
};

export const getOwnResolution = async (taskId: string) => {
  try {
    const token = localStorage.getItem("token");
    const results = await LearningApi.get(`/resolutions/${taskId}/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return results.data;
  } catch (error) {
    throw error;
  }
};
export const gradeResolution = async (taskId: string, userId: string, grade: number ) => {
  try {
    const token = localStorage.getItem("token");
    return await LearningApi.post(
      `/resolutions/${taskId}/user/${userId}/grades`,
      { grade:grade},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};