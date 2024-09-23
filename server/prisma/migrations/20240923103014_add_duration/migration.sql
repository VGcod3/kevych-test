/*
  Warnings:

  - Added the required column `duration` to the `route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "route" ADD COLUMN     "duration" INTEGER NOT NULL;
