-- CreateTable
CREATE TABLE `City` (
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

    INDEX `City_zip_code_idx`(`zip_code`),
    UNIQUE INDEX `City_zip_code_city_code_key`(`zip_code`, `city_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Pref_pref_code_idx` ON `Pref`(`pref_code`);
