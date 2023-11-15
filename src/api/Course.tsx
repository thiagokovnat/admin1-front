import LearningApi from "./LearningApi";

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
