import prisma from "../prismaClient.js";

const createUser = async (username, password, name, email, phoneNumber, pictureUrl) => {
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
