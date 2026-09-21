import prisma from "../prismaClient.js";

const deleteReviewById = async (id) => {
  try {
    return await prisma.review.delete({
      where: { id },
    });
  } catch (err) {
    if (err.code === "P2025") {
      const error = new Error(`Review with id ${id} not found`);
      error.name = "NotFoundError";
      throw error;
    }
    throw err;
  }
};

export default deleteReviewById;
