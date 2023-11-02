import { getAuth } from "firebase/auth";

export const clearAccessToken = () => {
  accessToken = "";
  expiresAt = 0;
};

export const getAuthorizationHeader = async () => {
  const auth = getAuth();
  const token = await auth.currentUser?.getIdToken();
  console.log(token);
  return {
    authorization: `Bearer ${token}`,
  };
};

const findStudents = async (filters, pagination) => {
  let url = `/api/students?`;
  url += `searchTerm=${encodeURIComponent(filters.searchTerm)}`;
  url += `&pageIndex=${encodeURIComponent(pagination.pageIndex)}`;
  url += `&itemsPerPage=${encodeURIComponent(pagination.itemsPerPage)}`;
  const response = await fetch(url, {
    headers: {
      ...(await getAuthorizationHeader()),
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const findStudentById = async (id) => {
  const response = await fetch(`/api/students/${id}`, {
    headers: {
      ...(await getAuthorizationHeader()),
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const createStudent = async (student) => {
  const url = `/api/students`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(student),
    headers: {
      ...(await getAuthorizationHeader()),
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

const updateStudent = async (student) => {
  const url = `/api/students/${student.id}`;
  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(student),
    headers: {
      ...(await getAuthorizationHeader()),
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

const deleteStudent = async (id) => {
  const url = `/api/students/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      ...(await getAuthorizationHeader()),
    },
  });
  debugger;
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const studentBackendService = {
  findStudents,
  findStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
