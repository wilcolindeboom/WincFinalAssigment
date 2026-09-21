import prisma from "../prismaClient.js";

const createHost = async (username, password, name, email, phoneNumber, pictureUrl, aboutMe) => {
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
