import prisma from "../prismaClient.js";

const getHostById = async (id) => {
  const host = await prisma.host.findUnique({
    where: { id },
    select: {
      username: true,
      email: true,
    },
  });

  if (!host) {
    const error = new Error(`Host with id ${id} not found`);
    error.name = "NotFoundError";
    throw error;
  }

  return host;
};

export default getHostById;
