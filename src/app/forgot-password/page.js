"use client";

import React from "react";
import {
  Card,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useExecute } from "@app/hooks/use-execute";
import { authService } from "@app/services/auth.service";

import { AppButton } from "@app/components/app-button";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPassword() {
  const { setNotification } = useDispatch();
  const { execute, busy } = useExecute();

  const resetPassword = (values) =>
    execute(async () => {
      await authService.resetPassword(values.email);
      setNotification({
        open: true,
        severity: "success",
        message:
          "Done, check ur gmail",
      });
    });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  const backToSignIn = () => {
    window.location.href = "/sign-in";
  };

  return (
    <div
      className="sticky top-0 z-50 bg-amber-300 min-h-screen text-black"
     
    >
      <div className="p-8">
        <Card
          className="w-96 p-8 text-center"
          elevation={8}
        >
          <Typography className="text-2xl font-bold mb-4 text-black">
            Forgot Password
          </Typography>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email && (
              <FormHelperText error>{formik.errors.email}</FormHelperText>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-3 mb-3"
              disabled={busy}
            >
              {busy ? "sending..." : "Reset Password"}
            </Button>
            <Button
              variant="contained"
              color="info"
              fullWidth
              className="mb-3"
              onClick={backToSignIn}
            >
              Sign in
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
