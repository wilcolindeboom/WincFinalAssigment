import prisma from "../prismaClient.js";

const getHostById = async (id) => {
  const host = await prisma.host.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      name: true,
      aboutMe: true,
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
