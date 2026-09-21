import prisma from "../prismaClient.js";

const createProperty = async (title, description, location, pricePerNight, bedRoomCount, bathRoomCount, maxGuestCount, hostId, rating) => {
  console.log("Creating property with the following details:", {
    title,
    description,
    location,
    pricePerNight,
    bedRoomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating,
  });

  return await prisma.property.create({
    data: {
      title,
      description,
      location,
      pricePerNight: Number(pricePerNight),
      bedRoomCount: Number(bedRoomCount),
      bathRoomCount: Number(bathRoomCount),
      maxGuestCount: Number(maxGuestCount),
      host: {
        connect: {
          id: hostId,
        },
      },
      rating: Number(rating),
    },
  });
};

export default createProperty;
