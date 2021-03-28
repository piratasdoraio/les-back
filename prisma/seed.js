const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
    const admin = await prisma.admins.upsert({
        where: { email: 'raiomarco@piratasdoraio.com' },
        update: {},
        create: {
            email: `raiomarco@piratasdoraio.com`,
            senha: "123",
            nome: "Marco",
            cpf: "12345678909",
            telefone: "12345678900",
            enderecos: {
                create: {
                    cep: "1234",
                    numero: "123",
                    complemento: "queijo azul",
                }
            }
        },
    })
    console.log({ admin })
}
main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
