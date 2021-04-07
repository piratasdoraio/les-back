const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
    const admin = await prisma.admins.upsert({
        where: { email: 'raiomarco@piratasdoraio.com' },
        update: {},
        create: {
            email: `raiomarco@piratasdoraio.com`,
            senha: "5fd924625f6ab16a19cc9807c7c506ae1813490e4ba675f843d5a10e0baacdb8",
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
    .finally(async() => {
        await prisma.$disconnect()
    })