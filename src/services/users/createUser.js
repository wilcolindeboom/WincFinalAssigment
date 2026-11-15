import prisma from "../prismaClient.js";

const createUser = async (username, password, name, email, phoneNumber, pictureUrl) => {
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    const error = new Error(`User with username ${username} already exists`);
    error.name = "createExistingError";
    error.status = 409;
    throw error;
  }

  return await prisma.user.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    },
  });
};

export default createUser;
