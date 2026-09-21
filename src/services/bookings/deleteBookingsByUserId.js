import prisma from "../prismaClient.js";

const deleteBookingsByUserId = async (userId) => {
  try {
    return await prisma.booking.deleteMany({
      where: { userId },
    });
  } catch (err) {
    if (err.code === "P2025") {
      return null; // Return null if no booking is found for the given userId
    }
    throw err;
  }
};

export default deleteBookingsByUserId;
