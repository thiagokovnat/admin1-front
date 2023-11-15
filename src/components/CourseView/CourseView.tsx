import { Lecture } from "../../models/Lectures";
import fiubaLogo from "/Logo-fiuba_big.png";
import "./CourseView.scss";
import { useEffect, useState } from "react";
import { getReviews } from "../../api/Course";
import { CourseQualification } from "../CourseQualification/CourseQualification";

interface Props {
  lecture: Lecture;
  onClick?: () => void;
  showQualification?: boolean;
  canQualify?: boolean;
}

export const CourseView = ({
  lecture,
  onClick,
  showQualification = false,
  canQualify = false,
}: Props) => {
  const [qualification, setQualification] = useState(-1);
  const [isReviewing, setIsReviewing] = useState(false);

  const getAvaregeQualification = async () => {
    try {
      const reviews = await getReviews(lecture.id);
      let average = 0;
      reviews.forEach((element: any) => {
        average += element.number;
      });
      average = average / reviews.length;
      setQualification(average);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAvaregeQualification();
  }, []);

  return (
    <div className="CourseView__Container" onClick={onClick}>
      <p>{lecture.title}</p>
      {showQualification && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ display: "flex", position: "absolute", right: 20, gap: 10 }}
        >
          {canQualify &&
            (isReviewing ? (
              <CourseQualification
                courseId={lecture.id}
                onReview={() => {
                  getAvaregeQualification();
                  setIsReviewing(false);
                }}
              />
            ) : (
              <button
                style={{
                  width: 60,
                  height: 35,
                  textAlign: "center",
                  alignSelf: "center",
                  padding: 5,
                }}
                onClick={() => {
                  setIsReviewing(true);
                }}
              >
                Calificar
              </button>
            ))}

          <div style={{ width: 30 }}>
            <p
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {qualification !== -1
                ? qualification.toString().slice(0, 3)
                : "?"}
            </p>
          </div>
        </div>
      )}

      <img src={fiubaLogo} alt="" className="CourseView__BackgroundImage" />
    </div>
  );
};
