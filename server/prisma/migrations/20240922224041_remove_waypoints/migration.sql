/*
  Warnings:

  - You are about to drop the `waypoint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `waypoint_on_route` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `departure` to the `route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination` to the `route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `route` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "waypoint_on_route" DROP CONSTRAINT "waypoint_on_route_routeId_fkey";

-- DropForeignKey
ALTER TABLE "waypoint_on_route" DROP CONSTRAINT "waypoint_on_route_waypointId_fkey";

-- AlterTable
ALTER TABLE "route" ADD COLUMN     "departure" TEXT NOT NULL,
ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL;

-- DropTable
DROP TABLE "waypoint";

-- DropTable
DROP TABLE "waypoint_on_route";
