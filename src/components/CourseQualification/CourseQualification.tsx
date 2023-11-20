interface CourseQualificationProps {
  setQualification: React.Dispatch<React.SetStateAction<number>>;
  qualification: number;
}

export const CourseQualification = ({
  qualification,
  setQualification,
}: CourseQualificationProps) => {
  return (
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
          textAlign: "center",
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
          textAlign: "center",
          color: "black",
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
          textAlign: "center",
        }}
        onClick={() => {
          setQualification((prev) => Math.min(prev + 1, 10));
        }}
      >
        +
      </div>
    </div>
  );
};
