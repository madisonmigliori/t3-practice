import { faker, fakerRO } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // await prisma.listing.deleteMany();

  for (let i = 0; i < 100; i++) {
    await prisma.listing.create({
      data: {
        img: faker.image.urlLoremFlickr({ category: "business" }),
        name: `${faker.company.name()}`,
        location: `${faker.location.city()}, ${faker.location.state()}`,
        askingPrice: faker.number.int({ min: 1000, max: 100000000 }),
        grossRev: faker.number.int({ min: 1000, max: 10000000 }),
        adjCashFlow: faker.number.int({ min: 1000, max: 10000000 }),
        ebita: faker.number.int({ min: 1000, max: 10000000 }),
        ffe: faker.number.int({ min: 1000, max: 10000000 }),
        inventory: faker.number.int({ min: 1000, max: 10000 }),
        rent: faker.number.int({ min: 1000, max: 100000 }),
        est: faker.date.past(),
        description: faker.lorem.paragraph({ min: 1, max: 3 }),
        buildingSf: faker.lorem.lines({ min: 1, max: 7 }),
        realEstate: faker.lorem.lines({ min: 1, max: 7 }),
        leaseExp: faker.date.future(),
        employees: faker.number.int({ min: 1, max: 10000 }),
        facilities: faker.lorem.lines({ min: 1, max: 7 }),
        reasonForSelling: faker.lorem.lines({ min: 1, max: 7 }),
        franchise: faker.datatype.boolean(),
        liked: false,
      },
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
