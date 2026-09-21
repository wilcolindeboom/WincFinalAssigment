import prisma from "../prismaClient.js";

const deletePropertyById = async (id) => {
  try {
    return await prisma.property.delete({
      where: { id },
    });
  } catch (err) {
    // // if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // //   console.log("handlePrismaError");
    // //   err.name = "PrismaClientKnownRequestError";

    // if (err.code === "P2025") {
    //   const error = new Error(`Property with id ${id} not found`);
    //   error.name = "NotFoundError";
    //   throw error;
    // }
    // console.error(`Error deleting property with id ${id}:`, err);
    // console.dir(err, { depth: null, colors: true });
    throw err;
  }
};

export default deletePropertyById;
