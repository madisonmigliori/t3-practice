import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function Seed() {
  for (let i = 0; i < 100; i++) {
    await prisma.listing.create({
      data: {
        name: `${faker.company.name()}`,
        location: `${faker.location.city()} , ${faker.location.state()}`,
        askingPrice: faker.number.int({ min: 1000 }),
        grossRev: faker.number.int({ min: 1000 }),
        adjCashFlow: faker.number.int({ min: 1000 }),
        liked: false,
      },
    });
  }
}