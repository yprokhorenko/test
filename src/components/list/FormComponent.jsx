import React from "react";
import { Button, TextField, Grid, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormComponent = ({ initialValues, onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      category: Yup.string()
        .required("Category is required")
        .max(10, "Category should be at most 10 characters"),
      name: Yup.string()
        .required("Name is required")
        .max(10, "Name should be at most 10 characters"),
      text: Yup.string(),
    }),
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="category"
            name="category"
            size="small"
            label="Category"
            variant="outlined"
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            id="text"
            name="text"
            label="Text"
            variant="outlined"
            multiline
            rows={4}
            value={formik.values.text}
            onChange={formik.handleChange}
            error={formik.touched.text && Boolean(formik.errors.text)}
            helperText={formik.touched.text && formik.errors.text}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "30px",
          gap: "20px",
        }}
      >
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" size="small" variant="contained" color="success">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default FormComponent;
