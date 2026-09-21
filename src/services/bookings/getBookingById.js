import prisma from "../prismaClient.js";

const getBookingById = async (id) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    const error = new Error(`Booking with id ${id} not found`);
    error.name = "NotFoundError";
    throw error;
  }

  return booking;
};

export default getBookingById;
