import { useEffect, useState } from "react";
import { uploadReview } from "../../api/Course";

interface CourseQualificationProps {
  courseId: string;
  onReview: () => void;
}

export const CourseQualification = ({
  courseId,
  onReview,
}: CourseQualificationProps) => {
  const [qualification, setQualification] = useState(5);

  const uploadReviewF = async () => {
    await uploadReview(courseId, qualification);
    onReview();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: 35,
          alignSelf: "center",
        }}
      >
        <div
          style={{
            cursor: "pointer",
            fontSize: 20,
            fontWeight: "bold",
            backgroundColor: "red",
            color: "white",
            width: 25,
            borderRadius: "5px 0px 0px 5px",
          }}
          onClick={() => {
            setQualification((prev) => Math.max(prev - 1, 1));
          }}
        >
          -
        </div>
        <div
          style={{
            cursor: "pointer",
            fontSize: 16,
            fontWeight: "bold",
            backgroundColor: "lightgrey",
            width: 40,
            padding: 5,
          }}
        >
          {qualification}
        </div>
        <div
          style={{
            cursor: "pointer",
            fontSize: 20,
            fontWeight: "bold",
            backgroundColor: "green",
            color: "white",
            width: 25,
            borderRadius: "0px 5px 5px 0px",
          }}
          onClick={() => {
            setQualification((prev) => Math.min(prev + 1, 10));
          }}
        >
          +
        </div>
      </div>
      <button
        style={{
          width: 60,
          height: 35,
          textAlign: "center",
          alignSelf: "center",
          padding: 5,
        }}
        onClick={uploadReviewF}
      >
        Calificar
      </button>
    </>
  );
};
