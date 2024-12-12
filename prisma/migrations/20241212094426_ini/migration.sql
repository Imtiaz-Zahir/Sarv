/*
  Warnings:

  - Added the required column `linkId` to the `Connections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Connections" ADD COLUMN     "linkId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
