import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  },
  notFoundErrorHandler,
);

router.post("/", auth, async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  if (!req.body.userId || !req.body.propertyId || !req.body.rating) {
    return res.status(400).json({ error: "Missing required review fields" });
  }
  const { userId, propertyId, rating, comment } = req.body;
  const newReview = await createReview(userId, propertyId, rating, comment);
  res.status(201).json(newReview);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("Fetching review with id:", id);
      const review = await getReviewById(id);
      res.status(200).json(review);
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
      const review = await deleteReviewById(id);
      res.status(200).send({
        message: `Review with id ${id} successfully deleted`,
        review,
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
      const { userId, propertyId, rating, comment } = req.body;
      const review = await updateReviewById(id, { userId, propertyId, rating, comment });
      res.status(200).send({
        message: `Review with id ${id} successfully updated`,
        review,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

export default router;
