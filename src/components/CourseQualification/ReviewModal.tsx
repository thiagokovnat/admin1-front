import { useState } from "react";
import { uploadReview } from "../../api/Course";
import { Box, Modal, TextareaAutosize, Typography } from "@mui/material";
import { CourseQualification } from "./CourseQualification";

interface ReviewModalProps {
  reviews: any[];
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

export const ReviewModal = ({ reviews, open, close }: ReviewModalProps) => {
  return (
    <Modal open={open} onClose={close}>
      <Box sx={style}>
        <Typography variant="h4" style={{ color: "black", marginBottom: 30 }}>
          Reseñas de los estudiantes:
        </Typography>
        <div style={{ overflowY: "scroll", height: 300 }}>
          {reviews.length === 0 && (
            <p style={{ color: "black", fontSize: 23 }}>No hay reseñas</p>
          )}
          {reviews.map((review: any) => {
            return (
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderColor: "black",
                  borderWidth: 3,
                  borderStyle: "solid",
                  borderRadius: 10,
                  marginRight: 30,
                  paddingRight: 25,
                  paddingLeft: 25,
                  paddingTop: 10,
                  paddingBottom: 10,
                  overflowWrap: "break-word",
                }}
              >
                <p
                  style={{
                    color: "black",
                    fontSize: 15,
                    width: 600,
                    textAlign: "left",
                  }}
                >
                  {review.content}
                </p>
                <div
                  style={{
                    borderColor: "#b89e14",
                    borderWidth: 3,
                    borderStyle: "solid",
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    color: "black",
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {review.number}
                </div>
              </div>
            );
          })}
        </div>
        <button
          style={{
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            fontSize: 16,
            marginTop: 50,
          }}
          onClick={close}
        >
          Cerrar
        </button>
      </Box>
    </Modal>
  );
};
