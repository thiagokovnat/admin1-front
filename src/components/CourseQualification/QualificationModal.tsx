import { useState } from "react";
import { uploadReview } from "../../api/Course";
import { Box, Modal, TextareaAutosize, Typography } from "@mui/material";
import { CourseQualification } from "./CourseQualification";

interface QualificationModalProps {
  courseId: string;
  onReview: () => void;
  open: boolean;
  close: () => void;
}

const style = {
  position: "absolute" as "absolute",
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

export const QualificationModal = ({
  courseId,
  onReview,
  open,
  close,
}: QualificationModalProps) => {
  const [qualification, setQualification] = useState(5);
  const [review, setReview] = useState("");

  const uploadReviewF = async () => {
    await uploadReview(courseId, qualification, review);
    onReview();
    close();
  };

  return (
    <Modal open={open} onClose={close}>
      <Box sx={style}>
        <Typography variant="h4" style={{ color: "black" }}>
          Deja tu reseña!
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
              qualification={qualification}
              setQualification={setQualification}
            />
          </div>

          <p style={{ color: "black", fontSize: 23 }}>Reseña : </p>
          <textarea
            placeholder="Escribe tu reseña aquí"
            style={{
              width: "100%",
              height: 150,
              fontSize: 16,
              padding: 10,
              borderRadius: 5,
            }}
            maxLength={250}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            style={{
              padding: 10,
              paddingLeft: 15,
              paddingRight: 15,
              fontSize: 16,
              marginTop: 5,
            }}
            onClick={uploadReviewF}
          >
            Subir
          </button>
        </div>
      </Box>
    </Modal>
  );
};
