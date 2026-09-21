import prisma from "../prismaClient.js";

const getPropertiesByHostId = async (hostId) => {
  return await prisma.property.findMany({
    where: { hostId },
  });
};

export default getPropertiesByHostId;
