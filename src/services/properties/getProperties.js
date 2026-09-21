import prisma from "../prismaClient.js";
import NotFoundError from "../../errors/NotFoundError.js";

const getProperties = async (location, pricePerNight) => {
  const properties = await prisma.property.findMany({
    where: {
      location,
      pricePerNight: pricePerNight ? Number(pricePerNight) : undefined,
    },
  });
  if (!properties || properties.length === 0) {
    if (!location && !pricePerNight) throw new NotFoundError("No properties found");
    if (!location || !pricePerNight) throw new NotFoundError(`Property with ${location ? `location ${location}` : `price per night ${pricePerNight}`} not found`);
    throw new NotFoundError(`Property with location ${location} and price per night ${pricePerNight} not found`);
  }
  return properties;
};

export default getProperties;
