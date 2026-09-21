import prisma from "../prismaClient.js";

const updateReviewById = async (id, updatedReview) => {
  const { userId, propertyId, rating, comment } = updatedReview;

  try {
    return await prisma.review.update({
      where: { id },
      data: {
        userId,
        propertyId,
        rating,
        comment,
      },
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

export default updateReviewById;
