import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const { createHash } = await import("node:crypto")
  const password = createHash("md5").update(`secret`).digest("hex")
  const user = await prisma.user.upsert({
    where: { email: "test@email.com" },
    update: {},
    create: {
      email: "test@test.com",
      name: "Test user2",
      password,
      role: "ADMIN",
    },
  })
  console.log({ user })
}

main()
  .then(() => prisma.$disconnect)
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
