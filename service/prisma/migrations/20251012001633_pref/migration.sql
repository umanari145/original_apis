-- CreateTable
CREATE TABLE `Pref` (
    `pref_code` VARCHAR(191) NOT NULL,
    `pref_name` VARCHAR(191) NOT NULL,
    `pref_kana` VARCHAR(191) NOT NULL,
    `pref_roma` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Pref_pref_code_key`(`pref_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
