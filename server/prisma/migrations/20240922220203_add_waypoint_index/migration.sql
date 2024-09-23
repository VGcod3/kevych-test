/*
  Warnings:

  - Added the required column `index` to the `waypoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "waypoint" ADD COLUMN     "index" INTEGER NOT NULL;
