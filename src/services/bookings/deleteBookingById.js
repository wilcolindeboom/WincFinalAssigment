import prisma from "../prismaClient.js";

const deleteBookingById = async (id) => {
  try {
    return await prisma.booking.delete({
      where: { id },
    });
  } catch (err) {
    if (err.code === "P2025") {
      const error = new Error(`Booking with id ${id} not found`);
      error.name = "NotFoundError";
      throw error;
    }
    throw err;
  }
};

export default deleteBookingById;
