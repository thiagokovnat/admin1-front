import LearningApi from "./LearningApi";

export const getCourseTitleById = async (courseId: number) => {
  try {
    const token = localStorage.getItem("token");
    const result = await LearningApi.get(
      `/courses/list`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const course = result.data.courses.find((course: any) => course.id === courseId);
    return course.title;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadReview = async (courseId: string, qualification: number) => {
  try {
    const token = localStorage.getItem("token");
    await LearningApi.post(
      `/courses/${courseId}/reviews`,
      { number: qualification },
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
