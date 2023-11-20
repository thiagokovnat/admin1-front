import {
  AddVideoToCourseParams,
  Lecture,
  LectureByCourse,
  UploadVideoResponse,
} from "../models/Lectures";
import LearningApi from "./LearningApi";

export const uploadVideo = async (file: File) => {
  try {
    let formData = new FormData();
    formData.append("file", file);
    const videoUploadResponse = await LearningApi.post<UploadVideoResponse>(
      "/lectures/video",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return videoUploadResponse.data.id;
  } catch (error) {
    throw error;
  }
};

export const createCourse = async (title: string) => {
  try {
    const token = localStorage.getItem("token");
    const results = await LearningApi.post("/courses",
      { title },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return results.data;
  } catch (error) {
    throw error;
  }
};

export const updateCoverCourse = async (id: string, cover: File) => {
  try {
    const token = localStorage.getItem("token");
    return await LearningApi.patch(`/courses/${id}/covers`, { cover }, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const addVideoToCourse = async (params: AddVideoToCourseParams) => {
  try {
    const token = localStorage.getItem("token");
    return await LearningApi.post("/lectures/info", params, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getLectures = async () => {
  try {
    const response = await LearningApi.get("/courses/list");
    return response.data.courses as Lecture[];
  } catch (error) {
    throw error;
  }
};

export const getMyLectures = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await LearningApi.get("/courses/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data.courses as Lecture[];
  } catch (error) {
    throw error;
  }
};

export const getLecture = async (id: string) => {
  try {
    const response = await LearningApi.get(`/lectures/id/${id}`);
    console.log(response.data);
    return response.data as Lecture;
  } catch (error) {
    throw error;
  }
};

export const getLecturesByCourseId = async (courseId: number) => {
  try {
    const response = await LearningApi.get(`/lectures/list/${courseId}`);
    return response.data.lectures as LectureByCourse[];
  } catch (error) {
    throw error;
  }
};
