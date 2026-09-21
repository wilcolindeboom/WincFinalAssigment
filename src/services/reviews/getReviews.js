import prisma from "../prismaClient.js";
import NotFoundError from "../../errors/NotFoundError.js";

const getReviews = async () => {
  const reviews = await prisma.review.findMany();
  if (!reviews || reviews.length === 0) {
    throw new NotFoundError("No reviews found");
  }
  return reviews;
};

export default getReviews;
