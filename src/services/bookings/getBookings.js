import prisma from "../prismaClient.js";
import NotFoundError from "../../errors/NotFoundError.js";

const getBookings = async (userid) => {
  const bookings = await prisma.booking.findMany({
    where: {
      userId: userid,
    },
  });
  if (!bookings || bookings.length === 0) throw new NotFoundError(`${userid ? `booking for user ${userid} not found` : "No bookings found"}`);
  return bookings;
};

export default getBookings;
