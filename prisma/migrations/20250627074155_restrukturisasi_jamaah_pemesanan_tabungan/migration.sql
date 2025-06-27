-- CreateTable
CREATE TABLE `Jamaah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaLengkap` VARCHAR(191) NOT NULL,
    `nomorKtp` VARCHAR(191) NOT NULL,
    `nomorPaspor` VARCHAR(191) NOT NULL,
    `tempatLahir` VARCHAR(191) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `jenisKelamin` VARCHAR(191) NOT NULL,
    `alamat` TEXT NOT NULL,
    `nomorTelepon` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `pekerjaan` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Jamaah_nomorKtp_key`(`nomorKtp`),
    UNIQUE INDEX `Jamaah_nomorPaspor_key`(`nomorPaspor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pemesanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggalPemesanan` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `statusPembayaran` VARCHAR(191) NOT NULL,
    `catatan` TEXT NULL,
    `jamaahId` INTEGER NOT NULL,
    `paketId` INTEGER NOT NULL,

    UNIQUE INDEX `Pemesanan_jamaahId_paketId_key`(`jamaahId`, `paketId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tabungan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggalSetoran` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `jumlahSetoran` INTEGER NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `jamaahId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_jamaahId_fkey` FOREIGN KEY (`jamaahId`) REFERENCES `Jamaah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_paketId_fkey` FOREIGN KEY (`paketId`) REFERENCES `Paket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tabungan` ADD CONSTRAINT `Tabungan_jamaahId_fkey` FOREIGN KEY (`jamaahId`) REFERENCES `Jamaah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
