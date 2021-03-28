-- CreateTable
CREATE TABLE `admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(255) NOT NULL,
    `endereco` INTEGER NOT NULL,
UNIQUE INDEX `admins.email_unique`(`email`),
INDEX `endereco`(`endereco`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `arquivos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `data` MEDIUMBLOB NOT NULL,
    `mime` VARCHAR(50) NOT NULL,
    `size` BIGINT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configs` (
    `chave` VARCHAR(255) NOT NULL,
    `valor` VARCHAR(255) NOT NULL,
UNIQUE INDEX `configs.valor_unique`(`valor`),

    PRIMARY KEY (`chave`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paciente` INTEGER,
    `data` DATETIME(0) NOT NULL,
    `checkin` BOOLEAN NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `medico` INTEGER,
    `cid` VARCHAR(255),
    `retorno` BOOLEAN,
INDEX `medico`(`medico`),
INDEX `paciente`(`paciente`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enderecos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(255) NOT NULL,
    `numero` VARCHAR(255) NOT NULL,
    `complemento` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exames` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consulta` INTEGER,
    `tipo` VARCHAR(255) NOT NULL,
    `data` DATETIME(0) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `medico` INTEGER,
    `arquivo` INTEGER,
INDEX `arquivo`(`arquivo`),
INDEX `consulta`(`consulta`),
INDEX `medico`(`medico`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(255) NOT NULL,
    `endereco` INTEGER NOT NULL,
UNIQUE INDEX `funcionarios.email_unique`(`email`),
INDEX `endereco`(`endereco`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laudos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exame` INTEGER,
    `anotacao` VARCHAR(255) NOT NULL,
    `autor` INTEGER,
    `aprovado` BOOLEAN,
INDEX `autor`(`autor`),
INDEX `exame`(`exame`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(255) NOT NULL,
    `endereco` INTEGER NOT NULL,
    `tipo` VARCHAR(255) NOT NULL,
    `crm` VARCHAR(255),
    `titulacao` VARCHAR(255),
    `residenciainicio` DATETIME(0),
    `residenciafim` DATETIME(0),
UNIQUE INDEX `medicos.email_unique`(`email`),
INDEX `endereco`(`endereco`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pacientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(255) NOT NULL,
    `endereco` INTEGER NOT NULL,
    `nascimento` DATETIME(0) NOT NULL,
    `genero` VARCHAR(255),
    `nomesocial` VARCHAR(255),
    `sexo` VARCHAR(255),
    `pele` VARCHAR(255),
UNIQUE INDEX `pacientes.email_unique`(`email`),
INDEX `endereco`(`endereco`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL,
UNIQUE INDEX `tokens.token_unique`(`token`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admins` ADD FOREIGN KEY (`endereco`) REFERENCES `enderecos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultas` ADD FOREIGN KEY (`medico`) REFERENCES `medicos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultas` ADD FOREIGN KEY (`paciente`) REFERENCES `pacientes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exames` ADD FOREIGN KEY (`arquivo`) REFERENCES `arquivos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exames` ADD FOREIGN KEY (`consulta`) REFERENCES `consultas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exames` ADD FOREIGN KEY (`medico`) REFERENCES `medicos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcionarios` ADD FOREIGN KEY (`endereco`) REFERENCES `enderecos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laudos` ADD FOREIGN KEY (`autor`) REFERENCES `medicos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laudos` ADD FOREIGN KEY (`exame`) REFERENCES `exames`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicos` ADD FOREIGN KEY (`endereco`) REFERENCES `enderecos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pacientes` ADD FOREIGN KEY (`endereco`) REFERENCES `enderecos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
