import { hash } from "../src/lib/utils"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const password = hash(`secret`)
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      name: "Test user2",
      password,
      role: "ADMIN",
    },
  })
  console.debug({ user })
}

main()
  .then(() => prisma.$disconnect)
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
