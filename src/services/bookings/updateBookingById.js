import prisma from "../prismaClient.js";

const updateBookingById = async (id, updatedBooking) => {
  const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = updatedBooking;

  try {
    return await prisma.booking.update({
      where: { id },
      data: {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      },
    });
  } catch (err) {
    if (err.code === "P2025") {
      const error = new Error(`Booking with id ${id} not found`);
      error.name = "NotFoundError";
      throw error;
    }
  }
};
export default updateBookingById;
