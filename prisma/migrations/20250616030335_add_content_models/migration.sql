/*
  Warnings:

  - You are about to drop the column `name` on the `paket` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `paket` table. All the data in the column will be lost.
  - Added the required column `deskripsi` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durasi` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoUrl` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `harga` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotelMadinah` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotelMakkah` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaPaket` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pesawat` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sisaKursi` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalKeberangkatan` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Paket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `paket` DROP COLUMN `name`,
    DROP COLUMN `price`,
    ADD COLUMN `deskripsi` TEXT NOT NULL,
    ADD COLUMN `durasi` INTEGER NOT NULL,
    ADD COLUMN `fotoUrl` TEXT NOT NULL,
    ADD COLUMN `harga` INTEGER NOT NULL,
    ADD COLUMN `hotelMadinah` VARCHAR(191) NOT NULL,
    ADD COLUMN `hotelMakkah` VARCHAR(191) NOT NULL,
    ADD COLUMN `namaPaket` VARCHAR(191) NOT NULL,
    ADD COLUMN `pesawat` VARCHAR(191) NOT NULL,
    ADD COLUMN `ratingHotelMadinah` INTEGER NOT NULL DEFAULT 5,
    ADD COLUMN `ratingHotelMakkah` INTEGER NOT NULL DEFAULT 5,
    ADD COLUMN `sisaKursi` INTEGER NOT NULL,
    ADD COLUMN `tanggalKeberangkatan` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Dokumentasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fotoUrl` TEXT NOT NULL,
    `deskripsi` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimoni` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `asal` VARCHAR(191) NULL,
    `fotoUrl` TEXT NULL,
    `videoUrl` TEXT NULL,
    `pesan` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
