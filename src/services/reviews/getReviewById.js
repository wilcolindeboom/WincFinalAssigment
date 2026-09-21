import prisma from "../prismaClient.js";

const getReviewById = async (id) => {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    const error = new Error(`Review with id ${id} not found`);
    error.name = "NotFoundError";
    throw error;
  }

  return review;
};

export default getReviewById;
