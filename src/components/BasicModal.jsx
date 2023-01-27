import * as React from "react";
import Modal from "@mui/material/Modal";
import { ModalContext } from "../contexts";
import { Card, CardMedia } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {xs:"80%",md:"50%"},
  height: {sm:"70%",md:"50%"},
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export default function BasicModal() {
  const { isModal, setIsModal, videoUrl } = React.useContext(ModalContext);
  const handleClose = () => setIsModal(false);

  return (
    <div>
      <Modal open={isModal} onClose={handleClose}>
        <Card sx={style}>
          <CardMedia
            component="iframe"
            sx={{ height: 1, width: 1, objectFit: "contain" }}
            src={videoUrl}
          />
        </Card>
      </Modal>
    </div>
);
}
