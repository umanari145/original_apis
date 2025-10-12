/*
  Warnings:

  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pref` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `City`;

-- DropTable
DROP TABLE `Pref`;

-- CreateTable
CREATE TABLE `pref` (
    `pref_code` VARCHAR(191) NOT NULL,
    `pref_name` VARCHAR(191) NOT NULL,
    `pref_kana` VARCHAR(191) NOT NULL,
    `pref_roma` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pref_pref_code_key`(`pref_code`),
    INDEX `pref_pref_code_idx`(`pref_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `city` (
    `zip_code` VARCHAR(191) NOT NULL,
    `pref_code` VARCHAR(191) NOT NULL,
    `pref_kana` VARCHAR(191) NOT NULL,
    `pref_roma` VARCHAR(191) NOT NULL,
    `city_code` VARCHAR(191) NOT NULL,
    `city_name` VARCHAR(191) NOT NULL,
    `city_kana` VARCHAR(191) NOT NULL,
    `city_roma` VARCHAR(191) NOT NULL,
    `town_name` VARCHAR(191) NOT NULL,
    `town_kana` VARCHAR(191) NOT NULL,
    `town_roma` VARCHAR(191) NOT NULL,

    INDEX `city_zip_code_idx`(`zip_code`),
    UNIQUE INDEX `city_zip_code_city_code_key`(`zip_code`, `city_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
