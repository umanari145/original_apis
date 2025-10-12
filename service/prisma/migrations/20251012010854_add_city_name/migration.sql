/*
  Warnings:

  - Added the required column `pref_name` to the `city` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `city` ADD COLUMN `pref_name` VARCHAR(191) NOT NULL;
