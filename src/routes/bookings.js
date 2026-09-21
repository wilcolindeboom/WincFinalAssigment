import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const { userid } = req.query;
      const bookings = await getBookings(userid);
      res.json(bookings);
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
  if (!req.body.userId || !req.body.propertyId || !req.body.checkinDate || !req.body.checkoutDate || !req.body.numberOfGuests || !req.body.totalPrice || !req.body.bookingStatus) {
    return res.status(400).json({ error: "Missing required booking fields" });
  }
  const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
  const newBooking = await createBooking(userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus);
  res.status(201).json(newBooking);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await getBookingById(id);
      res.status(200).json(booking);
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
      const booking = await deleteBookingById(id);
      res.status(200).send({
        message: `Booking with id ${id} successfully deleted`,
        booking,
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
      const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
      const booking = await updateBookingById(id, {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      });
      res.status(200).send({
        message: `Booking with id ${id} successfully updated`,
        booking,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

export default router;
