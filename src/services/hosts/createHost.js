import prisma from "../prismaClient.js";

const createHost = async (username, password, name, email, phoneNumber, pictureUrl, aboutMe) => {
  const existingHost = await prisma.host.findUnique({
    where: { username },
  });

  if (existingHost) {
    const error = new Error(`Host with username ${username} already exists`);
    error.name = "createExistingError";
    error.status = 409;
    throw error;
  }

  return await prisma.host.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
    },
  });
};

export default createHost;
