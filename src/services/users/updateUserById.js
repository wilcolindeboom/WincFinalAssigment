import prisma from "../prismaClient.js";

const updateUserById = async (id, updatedUser) => {
  const { username, password, name, email, phoneNumber, pictureUrl } = updatedUser;

  try {
    return await prisma.user.update({
      where: { id },
      data: {
        username,
        name,
        password,
        email,
        phoneNumber,
        pictureUrl,
      },
    });
  } catch (err) {
    if (err.code === "P2025") {
      const error = new Error(`User with id ${id} not found`);
      error.name = "NotFoundError";
      throw error;
    }
    throw err;
  }
};

export default updateUserById;
