import LearningApi from "./LearningApi";
import fiubaLogo from "/Logo-fiuba_big.png";

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
    let formData = new FormData();
    formData.append("file", cover);
    const token = localStorage.getItem("token");
    return await LearningApi.patch(`/courses/${id}/covers`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getCoverCourseURL = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    await LearningApi.get(`/courses/${id}/covers`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return `https://staging-acp-api.onrender.com/courses/${id}/covers`;
  } catch (error) {
    return fiubaLogo;
  }
};

export const getCourseTitleById = async (courseId: number) => {
  try {
    const token = localStorage.getItem("token");
    const result = await LearningApi.get(`/courses/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const course = result.data.courses.find(
      (course: any) => course.id === courseId
    );
    return course.title;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadReview = async (
  courseId: string,
  qualification: number,
  content: string
) => {
  try {
    const token = localStorage.getItem("token");
    await LearningApi.post(
      `/courses/${courseId}/reviews`,
      { number: qualification, content: content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReviews = async (courseId: string) => {
  try {
    const token = localStorage.getItem("token");
    const result = await LearningApi.get(`/courses/${courseId}/reviews`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return result.data.reviews;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
