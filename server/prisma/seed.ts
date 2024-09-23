import { PrismaClient } from '@prisma/client';
import { faker, fakerUK } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const routes = [];

  for (let i = 0; i < 10000; i++) {
    const departureCity = fakerUK.location.city();
    const destinationCity = (() => {
      let destinationCity = fakerUK.location.city();
      while (destinationCity === departureCity) {
        destinationCity = fakerUK.location.city();
      }
      return destinationCity;
    })();
    const start = faker.date.future();
    const end = new Date(
      start.getTime() + Math.floor(Math.random() * 5 * 60 * 60 * 1000),
    ); // Random duration between 1 to 5 hours
    const duration = end.getTime() - start.getTime(); // Duration in minutes

    routes.push({
      name: `${departureCity} to ${destinationCity} Express`,
      price: parseFloat(
        faker.commerce.price({
          min: 50,
          max: 200,
        }),
      ), // Price between 50 and 200
      departure: departureCity,
      destination: destinationCity,
      start,
      end,
      duration,
    });
  }

  await prisma.route.createMany({
    data: routes,
  });

  console.log('10000 routes have been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
