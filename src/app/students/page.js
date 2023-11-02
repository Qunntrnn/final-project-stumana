"use client";

import { AppButton } from "@app/components/app-button";
import { AppPagination } from "@app/components/app-pagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Alert, Snackbar } from "@mui/material";
import { studentBackendService } from "@app/services/student-backend.services";


import "bootstrap-icons/font/bootstrap-icons.css";
import { user } from "@app/store/user.model";
import { Button } from "bootstrap";

export default function Students() {
  const [searchResult, setSearchResult] = useState({
    data: [],
    total: 0,
  });
  const [filters, setFilters] = useState({
    searchTerm: "",
  });
  const [searchTermDebounced] = useDebounce(filters.searchTerm, 300);
  const [pagination, setPagination] = useState({
    itemsPerPage: 5,
    pageIndex: 0,
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

  const router = useRouter();
  const createNew = () => {
    router.push("/students/create");
  };

  const editStudent = (id) => {
    router.push(`/students/${id}`);
  };

  const searchStudents = async () => {
    try {
      const result = await studentBackendService.findStudents(
        filters,
        pagination
      );
      setSearchResult(result);
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const confirmDelete = async (student) => {
    try {
      if (
        !window.confirm(`Are you sure to delete student "${student.name}"?`)
      ) {
        return;
      }
      await studentBackendService.deleteStudent(student.id);
      alert("Delete success");
      searchStudents();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      pageIndex: 0,
    });
    searchStudents();
  }, [searchTermDebounced]);

  useEffect(() => {
    searchStudents();
  }, [pagination.pageIndex]);

  

  return (
    <>
      <div className="sticky top-0 z-50 bg-amber-300 min-h-screen text-black p-10">
        <div className="container mx-auto py-4">
          <div className="text-2xl font-bold text-align-center text-black">
            Students
          </div>
          <section className="">
            <div className="w-full flex justify-between">
              <div class="flex items-center w-full">
                
                <input
                  type="text"
                  name="name"
                  placeholder="Search"
                  className="w-1/3 py-2 border-b-2 border-solid outline-none bg-transparent"
                  required=""
                  value={filters.searchTerm}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      searchTerm: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="">
                <AppButton
                  onClick={createNew}
                  color="red">
                     Add
                </AppButton>
              </div>
            </div>
          </section>
          <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-black border border-solid">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Age{" "}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Address{" "}
                
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Action{" "}
                
                      </div>
                    </th>
    
                  </tr>
                </thead>
                <tbody>
                  {searchResult.data.map((student) => (
                    <tr
                      key={student.id}
                      className="bg-white border-b "
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap"
                      >
                        {student.name}
                      </th>
                      <td className="px-6 py-4">{student.age}</td>
                      <td className="px-6 py-4">{student.address}</td>
                      <td className="px-6 py-4">
                        <AppButton
                          className=""
                          onClick={() => confirmDelete(student)}
                        >
                          Delete
                        </AppButton>
                      </td>
                      <td className="px-6 py-4">
                        <AppButton
                        
                          onClick={() => editStudent(student.id)}
                        >
                          Edit
                        </AppButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AppPagination
              {...pagination}
              total={searchResult.total}
              setPageIndex={(newPageIndex) => {
                setPagination({
                  ...pagination,
                  pageIndex: newPageIndex,
                });
              }}
            />
          </div>
        </div>
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
    </>
  );
}
