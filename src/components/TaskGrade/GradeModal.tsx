import { useState } from "react";
import { gradeResolution } from "../../api/Tasks";
import { Box, Modal, Typography } from "@mui/material";
import { CourseQualification } from "../CourseQualification/CourseQualification";

interface QualificationModalProps {
  taskId: string;
  userId: string;
  open: boolean;
  close: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  borderRadius: "10px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const GradeModal = ({
  taskId,
  userId,
  open,
  close,
}: QualificationModalProps) => {

  const [grade, setGrade] = useState(5);

  const uploadGrade = async () => {
    await gradeResolution(taskId,userId,grade);
    close();
  };

  return (
    <Modal open={open} onClose={close}>
      <Box sx={style}>
        <Typography variant="h4" style={{ color: "black" }}>
          Calificar tarea
        </Typography>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 40,
              marginTop: 20,
            }}
          >
            <p style={{ color: "black", fontSize: 23 }}>Calificación : </p>

            <CourseQualification
              qualification={grade}
              setQualification={setGrade}
            />

          </div>
          <button
            style={{
              padding: 10,
              paddingLeft: 15,
              paddingRight: 15,
              fontSize: 16,
              marginTop: 5,
            }}
            onClick={uploadGrade}
          >
            Calificar
          </button>
        </div>
      </Box>
    </Modal>
  );
};
