import prisma from "../prismaClient.js";

const updateHostById = async (id, updatedHost) => {
  const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = updatedHost;

  try {
    return await prisma.host.update({
      where: { id },
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
  } catch (err) {
    if (err.code === "P2025") {
      const error = new Error(`Host with id ${id} not found`);
      error.name = "NotFoundError";
      throw error;
    }
    throw err;
  }
};

export default updateHostById;
