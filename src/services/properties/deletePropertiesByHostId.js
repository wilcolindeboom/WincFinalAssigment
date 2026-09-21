import prisma from "../prismaClient.js";

const deletePropertiesByHostId = async (hostId) => {
  try {
    return await prisma.property.deleteMany({
      where: { hostId },
    });
  } catch (err) {
    console.error(`Error deleting properties for host with id ${hostId}:`, err);
    return null; // Return null if no property is found for the given hostId
  }
};

export default deletePropertiesByHostId;
