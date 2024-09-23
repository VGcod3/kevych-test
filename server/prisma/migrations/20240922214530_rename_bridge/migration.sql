-- CreateTable
CREATE TABLE "user" (
    "_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "route" (
    "_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "route_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "waypoint" (
    "_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "waypoint_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "waypoint_on_route" (
    "routeId" TEXT NOT NULL,
    "waypointId" TEXT NOT NULL,

    CONSTRAINT "waypoint_on_route_pkey" PRIMARY KEY ("routeId","waypointId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "waypoint_on_route" ADD CONSTRAINT "waypoint_on_route_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "route"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "waypoint_on_route" ADD CONSTRAINT "waypoint_on_route_waypointId_fkey" FOREIGN KEY ("waypointId") REFERENCES "waypoint"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
