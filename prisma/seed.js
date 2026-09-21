import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bookingsData from "../src/data/bookings.json" with { type: "json" };
import hostsData from "../src/data/hosts.json" with { type: "json" };
import propertiesData from "../src/data/properties.json" with { type: "json" };
import reviewsData from "../src/data/reviews.json" with { type: "json" };
import usersData from "../src/data/users.json" with { type: "json" };

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter, log: ["query", "info", "warn", "error"] });

async function main() {
  const { bookings } = bookingsData;
  const { hosts } = hostsData;
  const { properties } = propertiesData;
  const { reviews } = reviewsData;
  const { users } = usersData;

  //create or update users
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }
  //create or update hosts
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }
  //create or update properties
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property,
    });
  }

  // create or update bookings
  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }
  //create or update reviews
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
