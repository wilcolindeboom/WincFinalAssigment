import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    const { name } = req.query;
    const hosts = await getHosts(name);
    res.status(200).json(hosts);
  },
  notFoundErrorHandler,
);

router.post("/", auth, async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  if (!req.body.username || !req.body.password || !req.body.name || !req.body.email) {
    return res.status(400).json({ error: "Missing required host fields" });
  }
  const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = req.body;
  const newHost = await createHost(username, password, name, email, phoneNumber, pictureUrl, aboutMe);
  res.status(201).json(newHost);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);
      res.status(200).json(host);
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
      const host = await deleteHostById(id);
      res.status(200).send({
        message: `Host with id ${id} successfully deleted`,
        host,
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
      const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = req.body;
      const host = await updateHostById(id, { username, password, name, email, phoneNumber, pictureUrl, aboutMe });
      res.status(200).send({
        message: `Host with id ${id} successfully updated`,
        host,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

export default router;
