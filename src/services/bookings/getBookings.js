import prisma from "../prismaClient.js";
import NotFoundError from "../../errors/NotFoundError.js";

const getBookings = async (userid) => {
  const bookings = await prisma.booking.findMany({
    where: {
      userId: userid,
    },
  });
  if (!bookings || bookings.length === 0) {
    const error = new Error(`${userid ? `booking for user ${userid} not found` : "No bookings found"}`);
    error.name = "NotFoundError";
    error.status = 404;
    throw error;
  }
  return bookings;
};

export default getBookings;
