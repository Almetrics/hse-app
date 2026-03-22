import {
  getProjectData,
  getProjects,
} from "../repositories/projectRepository.js";
import Joi from "joi";

// for Frontend to retrieve project names and id
export const readAll = async (req, res) => {
  try {
    const projects = await getProjects();
    return res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// input validation
const inputValidation = Joi.object({
  projectId: Joi.number().integer().required(),
});

// for Frontend to retrieve lagging indicators
export const readData = async (req, res) => {
  const { error, value } = inputValidation.validate(req.query, {
    abortEarly: false,
  });

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const projectData = await getProjectData(value);
    return res.status(200).json(projectData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
