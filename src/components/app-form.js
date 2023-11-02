import { Box } from "@mui/material";
import { AppField } from "./app-field";

const AppForm = ({ formik, className, fields, children }) => {
  return (
    <Box component="form" className={className} onSubmit={formik.handleSubmit}>
      {fields?.map((field) => (
        <AppField key={field.name} formik={formik} {...field} />
      ))}
      {children}
    </Box>
  );
};

export { AppForm };
