import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const { location, pricePerNight } = req.query;
      const properties = await getProperties(location, pricePerNight);
      res.status(200).json(properties);
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
  if (!req.body.title || !req.body.description || !req.body.location || !req.body.pricePerNight || !req.body.bedroomCount || !req.body.bathRoomCount || !req.body.maxGuestCount || !req.body.hostId) {
    return res.status(400).json({ error: "Missing required property fields" });
  }
  const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body;

  if (!title || !description || !location || !pricePerNight || !bedroomCount || !bathRoomCount || !maxGuestCount || !hostId) {
    return res.status(400).json({ error: "Missing required property fields" });
  }

  const numericPricePerNight = Number(pricePerNight);
  const numericBedroomCount = Number(bedroomCount);
  const numericBathRoomCount = Number(bathRoomCount);
  const numericMaxGuestCount = Number(maxGuestCount);
  const numericRating = rating ? Number(rating) : null;

  if (isNaN(numericPricePerNight) || isNaN(numericBedroomCount) || isNaN(numericBathRoomCount) || isNaN(numericMaxGuestCount) || (rating && isNaN(numericRating))) {
    return res.status(400).json({ error: "Price, bedroom count, bathroom count, max guest count, and rating must be valid numbers" });
  }

  const titleTrimmed = title.trim();
  const descriptionTrimmed = description.trim();
  const locationTrimmed = location.trim();

  if (!titleTrimmed || !descriptionTrimmed || !locationTrimmed) {
    return res.status(400).json({ error: "Title, description, and location cannot be empty" });
  }
  const newProperty = await createProperty(title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating);
  res.status(201).json(newProperty);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const property = await getPropertyById(id);
      res.status(200).json(property);
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
      const property = await deletePropertyById(id);
      res.status(200).send({
        message: `Property with id ${id} successfully deleted`,
        property,
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
      const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating } = req.body;
      const property = await updatePropertyById(id, { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating });
      res.status(200).send({
        message: `Property with id ${id} successfully updated`,
        property,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

export default router;
