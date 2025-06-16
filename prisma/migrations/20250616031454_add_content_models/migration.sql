/*
  Warnings:

  - You are about to drop the column `asal` on the `testimoni` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `testimoni` table. All the data in the column will be lost.
  - You are about to drop the column `pesan` on the `testimoni` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `testimoni` DROP COLUMN `asal`,
    DROP COLUMN `nama`,
    DROP COLUMN `pesan`;
