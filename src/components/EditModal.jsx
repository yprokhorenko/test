// EditModal.js
import React from "react";
import { Modal, Backdrop, Fade, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "../redux/mainSlice";
import * as Yup from "yup";
import FormComponent from "./list/FormComponent";

const EditModal = ({ editModalOpen, setEditModalOpen, editItemID }) => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.main.productsList);
  const itemToEdit = productsList.find((item) => item.id === editItemID);

  const validationSchema = Yup.object().shape({
    category: Yup.string()
      .required("Category is required")
      .max(20, "Category should be at most 20 characters"),
    name: Yup.string()
      .required("Name is required")
      .max(20, "Name should be at most 20 characters"),
    text: Yup.string()
      .required("Text is required")
      .max(200, "Text should be at most 200 characters"),
  });

  const initialValues = {
    category: itemToEdit.category,
    name: itemToEdit.name,
    text: itemToEdit.text,
    id: itemToEdit.id,
  };

  const handleSubmit = (values) => {
    const formData = {
      id: itemToEdit.id,
      category: values.category,
      name: values.name,
      text: values.text,
    };
    dispatch(updateItem(formData));
    setEditModalOpen(false);
  };

  return (
    <Modal
      style={{
        width: "700px",
        height: "400px",
        margin: "auto",
        padding: "40px",
      }}
      open={editModalOpen}
      onClose={() => setEditModalOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 200,
      }}
    >
      <Fade in={editModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            color: "success",
            backgroundColor: "white",
            padding: "60px",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "30px" }}>Edit</Typography>
          <FormComponent
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onCancel={() => setEditModalOpen(false)}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditModal;
