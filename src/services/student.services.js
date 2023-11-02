let students = [];

if (typeof window !== "undefined") {
  students = JSON.parse(localStorage.getItem("students")) || [];
}

const getNewId = () => {
  return Math.max(...students.map((s) => s.id), 0) + 1;
};

const findStudents = async (filters, pagination) => {
  let filteredStudents = students;
  const searchTerm = filters.searchTerm?.trim().toLowerCase();
  if (filters.searchTerm.trim()) {
    filteredStudents = filteredStudents.filter((s) =>
      s.name.toLowerCase().includes(searchTerm)
    );
  }
  if (filters.address) {
    filteredStudents = filteredStudents.filter(
      (s) => s.address === filters.address
    );
  }

  const paginatedStudents = filteredStudents.filter((_, index) => {
    const startIndex = pagination.pageIndex * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage - 1;
    return index >= startIndex && index <= endIndex;
  });
  return {
    data: paginatedStudents,
    total: filteredStudents.length,
  };
};

const findStudentById = (id) => {
  return students.find((s) => s.id === id);
};

const createStudent = async (student) => {
  students.push({
    ...student,
    id: getNewId(),
  });
  localStorage.setItem("students", JSON.stringify(students));
};

const updateStudent = (student) => {
  students = students.map((s) => {
    if (s.id === student.id) {
      return student;
    }
    return s;
  });
  localStorage.setItem("students", JSON.stringify(students));
};

const deleteStudent = (id) => {
  students = students.filter((s) => s.id !== id);
  localStorage.setItem("students", JSON.stringify(students));
};

export const studentService = {
  findStudents,
  findStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
