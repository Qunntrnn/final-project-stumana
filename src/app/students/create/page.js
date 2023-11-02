"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormik } from "formik";
import MuiAlert from "@mui/material/Alert";
import * as yup from "yup";
import {
  Button,
  Card,
  FormHelperText,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { sleep } from "@app/utils/sleep";
import { studentBackendService } from "@app/services/student-backend.services";

import { user } from "@app/store/user.model";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .max(200, "Input name must be less than 200 characters"),
  age: yup
    .number("Age must be a number")
    .required("Age is required")
    .min(18, "Age must be greater than 18")
    .max(200, "Age must be less than 200"),
  address: yup
    .string()
    .required("Address is required")
    .max(200, "Input address must be less than 200 characters"),
});

export default function CreateNewStudent() {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const [alertState, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({
      open: false,
      message: "",
      severity: "success",
    });
  };

  const onSubmit = async (values) => {
    try {
      setBusy(true);
      await sleep(2000);
      await studentBackendService.createStudent({
        ...values,
        age: +values.age,
      });
      setAlert({
        open: true,
        message: "Saved successfully",
        severity: "success",
      });
      await sleep(1000);
      router.push("/students");
    } catch (e) {
      setAlert({
        open: true,
        message: "Save failed. Please try again",
        severity: "error",
      });
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      address: "",
    },
    validationSchema,
    onSubmit,
  });

  // if (!user.state.loaded) {
  //   return (
  //     <main
  //       className="sticky top-0 z-50 min-h-screen text-white p-10"
  //       style={{
  //         background:
  //           "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(83,9,121,1) 49%, rgba(134,0,255,1) 100%);",
  //       }}
  //     >
  //       <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  //         <div className="animate-pulse flex space-x-4">
  //           <div className="rounded-full bg-slate-700 h-10 w-10"></div>
  //           <div className="flex-1 space-y-6 py-1">
  //             <div className="h-2 bg-slate-700 rounded"></div>
  //             <div className="space-y-3">
  //               <div className="grid grid-cols-3 gap-4">
  //                 <div className="h-2 bg-slate-700 rounded col-span-2"></div>
  //                 <div className="h-2 bg-slate-700 rounded col-span-1"></div>
  //               </div>
  //               <div className="h-2 bg-slate-700 rounded"></div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <div className="sticky top-0 z-50 bg-amber-300 min-h-screen text-black p-10 justify-center items-center">
      <div>
        <Card
          className="w-96 text-center p-8"
          elevation={8}
        >
          <Typography className="text-2xl font-bold mb-4 text-black">
            Create Student
          </Typography>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <TextField
              variant="standard"
              id="name"
              name="name"
              label="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              autoFocus
            />
            {formik.touched.name && formik.errors.name && (
              <FormHelperText error>{formik.errors.name}</FormHelperText>
            )}
            <TextField
              variant="standard"
              id="age"
              name="age"
              label="Age"
              onChange={formik.handleChange}
              value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age && (
              <FormHelperText error>{formik.errors.age}</FormHelperText>
            )}
            <TextField
              variant="standard"
              id="address"
              name="address"
              label="Address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address && (
              <FormHelperText error>{formik.errors.address}</FormHelperText>
            )}
            <Button type="submit" className="mt-2" disabled={busy}>
              Save
            </Button>
          </form>
          {alertState.open && (
            <Snackbar
              open={alertState.open}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity={alertState.severity}
                sx={{ width: "100%" }}
              >
                {alertState.message}
              </Alert>
            </Snackbar>
          )}
        </Card>
      </div>
    </div>
  );
}
