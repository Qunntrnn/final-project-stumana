"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Alert,
  Card,
  IconButton,
  InputAdornment,
  Snackbar,
  Typography,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { useFormik } from "formik";
import * as yup from "yup";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { useExecute } from "@app/hooks/use-execute";
import { authService } from "@app/services/auth.service";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validationSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must contain at least 8 character, one uppercase, one lowercase, one number and one special case character"
    ),
});

export default function Register() {
  const router = useRouter();
  const { busy } = useExecute();
  const [alertState, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentAction, setCurrentAction] = useState("sign-up-google");

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
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      window.location.href = "/sign-in";
    } catch (e) {
      setAlert({
        open: true,
        message: e.message,
        severity: "error",
      });
      console.error(e);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      setCurrentAction("sign-up-google");
      await authService.signUpWithGoogle();
      window.location.href = "/";
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        severity: "error",
      });
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div
      className="sticky top-0 z-50 bg-amber-300 min-h-screen text-black"
    >
      <div className="p-8">
        <Card
          className="w-96  p-8 text-center "
          elevation={8}
        >
          <Typography className="text-2xl font-bold mb-4 text-black">
            Register
          </Typography>
          <div className="flex flex-col gap-3">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-3"
            >
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email &&
                formik.errors.email &&
                formik.errors.email && (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                )}
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="standard"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                value={formik.values.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        size="small"
                        tabIndex={-1}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formik.touched.email &&
                formik.errors.password &&
                formik.errors.password && (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                )}
              <Button variant="contained" type="submit" color="primary">
                Register
              </Button>
              <Button
                variant="contained"
                color="inherit"
                fullWidth
                className="mb-3 bg-red-500 hover:bg-red-600 text-white"
                startIcon={<Google />}
                onClick={signUpWithGoogle}
                disabled={busy}
              >
                {busy && currentAction === "sign-up-google"
                  ? "Processing..."
                  : "Sign Up with Google"}
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
          </div>
        </Card>
      </div>
    </div>
  );
}
