import prisma from "../prismaClient.js";
import NotFoundError from "../../errors/NotFoundError.js";

const getUsers = async (username, email) => {
  const users = await prisma.user.findMany({
    where: {
      username,
      email,
    },
  });
  if (!users || users.length === 0) {
    if (!username && !email) {
      throw new NotFoundError("No users found");
    }
    throw new NotFoundError(`User with ${username ? `username ${username}` : `email ${email}`} not found`);
  }
  return users;
};

export default getUsers;
