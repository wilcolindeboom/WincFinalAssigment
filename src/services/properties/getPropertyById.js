import prisma from "../prismaClient.js";

const getPropertyById = async (id) => {
  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    const error = new Error(`Property with id ${id} not found`);
    error.name = "NotFoundError";
    throw error;
  }

  return property;
};

export default getPropertyById;
