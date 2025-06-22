/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `testimoni` table. All the data in the column will be lost.
  - Added the required column `deskripsiTestimoni` to the `Testimoni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaJamaah` to the `Testimoni` table without a default value. This is not possible if the table is not empty.
  - Made the column `fotoUrl` on table `testimoni` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `testimoni` DROP COLUMN `videoUrl`,
    ADD COLUMN `deskripsiTestimoni` TEXT NOT NULL,
    ADD COLUMN `namaJamaah` VARCHAR(191) NOT NULL,
    MODIFY `fotoUrl` TEXT NOT NULL;
