import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UsersCreateInput[] = [
  {
    username: "Tom",
    password: "tom12345",
    age: 7,
    city: "CN city",
    todos: {
      create: [
        {
          title: "Tease Jerry",
          description: "It's fun for tom",
          done: true,
        },
        {
          title: "baby sitter",
          description: "Take care of Tike",
          done: false,
        },
      ],
    },
  },
  {
    username: "Jerry",
    age: 6,
    password: "jerry12345",
    city: "CN city",
    todos: {
      create: {
        description: "Eat Food",
        title: "Eat food from Tom's refrigerator",
        done: false,
      },
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.users.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // @ts-ignore
    process.exit(1);
  });
