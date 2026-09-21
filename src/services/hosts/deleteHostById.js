import prisma from "../prismaClient.js";
import deleteBookingsByPropertyId from "../bookings/deleteBookingsByPropertyId.js";
import deletePropertiesByHostId from "../properties/deletePropertiesByHostId.js";
import getPropertiesByHostId from "../properties/getPropertiesByHostId.js";

const deleteHostById = async (id) => {
  try {
    const properties = await getPropertiesByHostId(id); // Get properties for the host
    if (properties && properties.length > 0) {
      for (const property of properties) {
        await deleteBookingsByPropertyId(property.id); // Delete bookings for each property
      }
    }
    await deletePropertiesByHostId(id);
    return await prisma.host.delete({
      where: { id },
    });
  } catch (err) {
    console.error(`Error deleting host with id ${id}:`, err);
    if (err.code === "P2025") {
      const error = new Error(`Host with id ${id} not found`);
      error.name = "NotFoundError";
      throw error;
    }
    throw err;
  }
};

export default deleteHostById;
