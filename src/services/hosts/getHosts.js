import prisma from "../prismaClient.js";
import NotFoundError from "../../errors/NotFoundError.js";

const getHosts = async (name) => {
  const hosts = await prisma.host.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
  if (!hosts || hosts.length === 0) {
    if (!name) throw new NotFoundError("No hosts found");
    throw new NotFoundError(`Host with name ${name} not found`);
  }
  return hosts;
};

export default getHosts;
