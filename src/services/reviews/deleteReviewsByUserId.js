import prisma from "../prismaClient.js";

const deleteReviewsByUserId = async (userId) => {
  try {
    return await prisma.review.deleteMany({
      where: { userId },
    });
  } catch (err) {
    if (err.code === "P2025") {
      return null; // Return null if no review is found for the given userId
    }
    throw err;
  }
};

export default deleteReviewsByUserId;
