import prisma from "../prismaClient.js";

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      name: true,
    },
  });

  if (!user) {
    const error = new Error(`User with id ${id} not found`);
    error.name = "NotFoundError";
    throw error;
  }

  return user;
};

export default getUserById;
