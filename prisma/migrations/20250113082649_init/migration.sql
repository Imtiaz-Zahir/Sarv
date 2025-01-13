-- CreateEnum
CREATE TYPE "Protocol" AS ENUM ('HTTP', 'HTTPS', 'TCP', 'SSH', 'RDP', 'UNIX', 'SMB', 'HTTP_STATUS', 'BASTION');

-- CreateTable
CREATE TABLE "Users" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tunnelId" TEXT NOT NULL,
    "tunnelToken" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connections" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serviceIp" TEXT NOT NULL,
    "servicePort" INTEGER NOT NULL,
    "serviceProtocol" "Protocol" NOT NULL,
    "recordId" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Links_name_key" ON "Links"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Connections_name_linkId_key" ON "Connections"("name", "linkId");

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
