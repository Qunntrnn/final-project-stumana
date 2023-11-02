"use client";

import React from "react";
import { studentBackendService } from "@app/services/student-backend.services";
import {
  Alert,
  Button,
  Card,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";


export default function EditStudent({ params }) {
  console.log(params.id);
  const user = useSelector((rootState) => rootState.user);
  const router = useRouter();
  const [student, setStudent] = useState({
    id: undefined,
    name: "",
    age: "",
    address: "",
  });
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

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!student.name.trim()) {
        alert("Please input name");
        return;
      }
      if (!student.age) {
        alert("Please input age");
        return;
      }
      if (!student.address) {
        alert("Please input address");
        return;
      }
      await studentBackendService.updateStudent(student);
      setAlert({
        open: true,
        message: "Saved successfully",
        severity: "success",
      });
      router.push("/students");
    } catch (e) {
      alert("Save failed. Please try again");
      console.error(e);
    }
  };

  useEffect(() => {
    const findStudent = async () => {
      const student = await studentBackendService.findStudentById(+params.id);
      if (!student) {
        alert("Student not found");
        return;
      }
      setStudent(student);
    };
    findStudent();
  }, []);

  if (!student.id) {
    return <div></div>;
  }

  

  return (
    <div className="sticky top-0 z-50 bg-amber-300 min-h-screen text-black p-10 justify-center items-center">
      <div className="p-8">
        <Card
          className="w-96  p-8 text-center "
          elevation={8}
        >
          <Typography className="text-2xl font-bold mb-4 text-black">
            Edit Student
          </Typography>
          <form onSubmit={onSubmit} className="form-container">
            <div className="mb-4">
              <label htmlFor="id" className="form-label">
                Id
              </label>
              <TextField
                type="text"
                name="id"
                id="id"
                value={student.id}
                disabled
                className="form-input"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <TextField
                type="text"
                name="name"
                id="name"
                value={student.name}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    name: e.target.value,
                  });
                }}
                className="form-input"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <TextField
                id="age"
                name="age"
                type="number"
                value={student.age}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    age: +e.target.value,
                  });
                }}
                className="form-input"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <TextField
                id="address"
                name="address"
                type="text"
                value={student.address}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    address: e.target.value,
                  });
                }}
                className="form-input"
              />
            </div>
            <Button type="submit" className="form-button">
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
