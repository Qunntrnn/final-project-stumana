import { Student } from "@app/server/database/sequelize";
import { validateRequest } from "@app/server/firebase/firebase";

const getStudent = async (req, res) => {
  const id = +req.query.id;
  if (isNaN(id)) {
    res.status(400).json({
      message: "Id must be a number",
    });
    return;
  }
  const student = await Student.findByPk(id);
  if (!student) {
    res.status(404).json({
      message: "Student not found",
    });
    return;
  }
  res.status(200).json(student.toJSON());
};

const update = async (req, res) => {
  const id = +req.query.id;
  const updatedData = JSON.parse(req.body);
  const student = await Student.findByPk(id);
  if (!student) {
    res.status(404).json({
      message: "Student not found",
    });
    return;
  }
  student.update({
    name: updatedData.name,
    age: updatedData.age,
    address: updatedData.address,
  });
  res.status(200).json({});
};

const remove = async (req, res) => {
  await Student.destroy({
    where: {
      id: +req.query.id,
    },
  });
  res.status(200).json({});
};

export default async function handler(req, res) {
  const user = await validateRequest(req);
  if (!user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  if (req.method === "PATCH") {
    return update(req, res);
  } else if (req.method === "DELETE") {
    return remove(req, res);
  } else if (req.method === "GET") {
    return getStudent(req, res);
  }
  res.status(405).json({
    message: "Method not allowed",
  });
}
