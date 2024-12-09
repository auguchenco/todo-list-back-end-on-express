import { defaultResponseGenerator, successfulResponseGenerator, errorResponseGenerator } from "../config/generators/response.generator.js";
import { createTask, getTodoList, getTaskById, setTask, deletTask } from "../models/todo.model.js";

export const createTaskCtrl = async (req, res) => {
  const defaultResponse = defaultResponseGenerator(res, 'task', 'create', 'created');

  try {
    const { title, description } = req.body;
    const userId = req.user?.id;
    const task = await createTask(userId, title, description);

    successfulResponseGenerator({
      status: 200,
      data: task[1],
      ...defaultResponse
    });

  } catch (error) {
    errorResponseGenerator({
      status: 500,
      error: error,
      ...defaultResponse
    });
  };
};

export const getTodoListCtrl = async (req, res) => {
  const defaultResponse = defaultResponseGenerator(res, 'todo list', 'send', 'sent');

  try {
    const userId = req.user?.id;
    const todoList = await getTodoList(userId);

    successfulResponseGenerator({
      status: 201,
      data: todoList,
      ...defaultResponse
    });

  } catch (error) {
    errorResponseGenerator({
      status: 500,
      error: error,
      ...defaultResponse
    });
  };
};

export const getTaskCtrl = async (req, res) => {
  const defaultResponse = defaultResponseGenerator(res, 'task', 'send', 'sent');

  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const task = await getTaskById(id, userId);

    if (!task) {
      return errorResponseGenerator({
        status: 404,
        error: 'Task not found',
        ...defaultResponse
      });
    }

    successfulResponseGenerator({
      status: 200,
      data: task,
      ...defaultResponse
    });

  } catch (error) {
    errorResponseGenerator({
      status: 500,
      error: error,
      ...defaultResponse
    });
  };
};

export const setTaskCtrl = async (req, res) => {
  const defaultResponse = defaultResponseGenerator(res, 'task', 'update', 'updated');

  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { title, description, isCompleted } = req.body;
    const task = await setTask(id, userId, title, description, isCompleted);

    if (task[0] == undefined) {
      return errorResponseGenerator({
        status: 404,
        error: 'Task not found',
        ...defaultResponse
      });
    };

    successfulResponseGenerator({
      status: 200,
      data: task[1],
      ...defaultResponse
    });

  } catch (error) {
    errorResponseGenerator({
      status: 500,
      error: error,
      ...defaultResponse
    });
  };
};

export const deletTasksCtrl = async (req, res) => {
  const defaultResponse = defaultResponseGenerator(res, 'task', 'delete', 'deleted');

  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const task = await deletTask(id, userId);

    if (task[0] == undefined) {
      return errorResponseGenerator({
        status: 404,
        error: 'Task not found',
        ...defaultResponse
      });
    };

    successfulResponseGenerator({
      status: 202,
      data: task[1],
      ...defaultResponse
    });

  } catch (error) {
    errorResponseGenerator({
      status: 500,
      error: error,
      ...defaultResponse
    });
  };
};