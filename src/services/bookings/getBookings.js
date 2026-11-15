import prisma from "../prismaClient.js";
import NotFoundError from "../../errors/NotFoundError.js";

const getBookings = async (userid) => {
  const bookings = await prisma.booking.findMany({
    where: {
      userId: userid,
    },
  });

  if (!bookings || bookings.length === 0) {
    if (!userid) throw new NotFoundError("No bookings found");
    else throw new NotFoundError(`Booking for user ${userid} not found`);
  }

  return bookings;
};

export default getBookings;
