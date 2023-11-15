import { useEffect, useMemo, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Lecture } from "../models/Lectures";
import { getLectures, getMyLectures } from "../api/Lectures";
import { CourseView } from "../components/CourseView/CourseView";
import { useNavigate } from "react-router";
import { Input } from "../components/input/Input";

export const AllCourses = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [myCourses, setMyCourses] = useState<Lecture[]>([]);
  const [searchParam, setSearchParam] = useState<string>("");
  const lecturesFiltered = useMemo(
    () =>
      lectures.filter((lecture) =>
        lecture.title.toLowerCase().includes(searchParam.toLowerCase())
      ),
    [lectures, searchParam]
  );
  const navigate = useNavigate();

  const onCourseSelect = (lecture: Lecture) => {
    navigate("/courses/" + lecture.id + "/view");
  };

  useEffect(() => {
    getLectures().then(setLectures);
    getMyLectures().then(setMyCourses);
  }, []);

  return (
    <Layout>
      <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
        <Input
          title="Buscar curso"
          onChange={(e: any) => setSearchParam(e.target.value)}
        />
        {lecturesFiltered.map((lecture) => (
          <CourseView
            lecture={lecture}
            onClick={() => {
              onCourseSelect(lecture);
            }}
            showQualification={true}
            canQualify={
              myCourses.find((course) => course.id === lecture.id) === undefined
            }
          />
        ))}
      </div>
    </Layout>
  );
};
