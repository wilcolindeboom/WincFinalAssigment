import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const { username, email } = req.query;
      const users = await getUsers(username, email);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

router.post("/", auth, async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  const { name, password, username, email, phoneNumber, pictureUrl } = req.body;
  if (!name || !password || !username || !email) {
    return res.status(400).json({ error: "Missing required user fields" });
  }
  const newUser = await createUser(username, password, name, email, phoneNumber, pictureUrl);
  res.status(201).json(newUser);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

router.delete(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await deleteUserById(id);
      res.status(200).send({
        message: `User with id ${id} successfully deleted`,
        user,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

router.put(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, password, username, email, phoneNumber, pictureUrl } = req.body;
      const user = await updateUserById(id, { name, password, username, email, phoneNumber, pictureUrl });
      res.status(200).send({
        message: `User with id ${id} successfully updated`,
        user,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

export default router;
