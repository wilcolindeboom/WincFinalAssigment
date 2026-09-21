import prisma from "../prismaClient.js";

const deleteBookingsByPropertyId = async (propertyId) => {
  try {
    return await prisma.booking.deleteMany({
      where: { propertyId },
    });
  } catch (err) {
    if (err.code === "P2025") {
      return null; // Return null if no booking is found for the given propertyId
    }
    throw err;
  }
};

export default deleteBookingsByPropertyId;
