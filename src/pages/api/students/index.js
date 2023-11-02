import { Student } from "@app/server/database/sequelize";
import { validateRequest } from "@app/server/firebase/firebase";
import { Op } from "sequelize";

const searchStudents = async (req, res) => {
  const query = {
    ...req.query,
    pageIndex: +req.query.pageIndex || 0,
    itemsPerPage: +req.query.itemsPerPage || 5,
  };
  const where = {};
  if (req.query.searchTerm?.trim()) {
    where.name = {
      [Op.like]: `%${req.query.searchTerm}%`,
    };
  }
  if (req.query.address?.trim()) {
    where.address = {
      [Op.eq]: req.query.address,
    };
  }
  const result = await Student.findAll({
    attributes: ["id", "name", "address", "age"],
    where,
    offset: query.pageIndex * query.itemsPerPage,
    limit: query.itemsPerPage,
    order: [["name", "ASC"]],
  });
  const total = await Student.count({
    where,
  });

  res.status(200).json({
    data: result,
    total,
  });
};

const createStudent = async (req, res) => {
  try {
    const newStudent = JSON.parse(req.body);

    const newRecord = await Student.create({
      name: newStudent.name,
      age: newStudent.age,
      address: newStudent.address,
    });

    res.status(200).json({
      id: newRecord.id,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad Request",
    });
  }
};

export default async function handler(req, res) {
  const user = await validateRequest(req);
  if (!user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  if (req.method === "POST") {
    return createStudent(req, res);
  } else if (req.method === "GET") {
    return searchStudents(req, res);
  }
  res.status(405).json({
    message: "Method not allowed",
  });
}
