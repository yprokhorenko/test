import React from "react";
import { Modal, Backdrop, Fade, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/mainSlice";
import FormComponent from "./list/FormComponent";

const Requisition = ({ setIsRequisitionOpen, isRequisitionOpen }) => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.main.productsList);
  const maxId = productsList.length > 0 ? Math.max(...productsList.map((item) => item.id)) : -1;

  const initialValues = {
    category: "",
    name: "",
    text: "",
  };

  const handleSubmit = (values) => {
    const formData = {
      id: maxId + 1,
      category: values.category,
      name: values.name,
      text: values.text,
    };
    dispatch(addItem(formData));
    setIsRequisitionOpen(false);
  };

  return (
    <Modal
      style={{
        width: "700px",
        height: "400px",
        margin: "auto",
        padding: "40px",
      }}
      open={isRequisitionOpen}
      onClose={() => {
        setIsRequisitionOpen(!isRequisitionOpen);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 200,
      }}
    >
      <Fade in={isRequisitionOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            backgroundColor: "white",
            padding: "60px",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "30px" }}>Add Requisition</Typography>
          <FormComponent initialValues={initialValues} onSubmit={handleSubmit} onCancel={() => setIsRequisitionOpen(false)} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default Requisition;
