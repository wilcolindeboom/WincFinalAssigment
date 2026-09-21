import prisma from "../prismaClient.js";
import deleteBookingsByUserId from "../bookings/deleteBookingsByUserId.js";
import deleteReviewsByUserId from "../reviews/deleteReviewsByUserId.js";

const deleteUserById = async (id) => {
  try {
    await deleteBookingsByUserId(id);
    await deleteReviewsByUserId(id);
    console.log(`Deleted bookings and reviews for user with id ${id}`);
    return await prisma.user.delete({
      where: { id },
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

export default deleteUserById;
