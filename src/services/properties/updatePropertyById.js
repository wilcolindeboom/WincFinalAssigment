import prisma from "../prismaClient.js";

const updatePropertyById = async (id, updatedProperty) => {
  const { title, description, location, pricePerNight, bedRoomCount, bathRoomCount, maxGuestCount, rating } = updatedProperty;

  try {
    return await prisma.property.update({
      where: { id },
      data: {
        title,
        description,
        location,
        pricePerNight,
        bedRoomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
      },
    });
  } catch (err) {
    if (err.code === "P2025") {
      const error = new Error(`Property with id ${id} not found`);
      error.name = "NotFoundError";
      throw error;
    }
    throw err;
  }
};

export default updatePropertyById;
