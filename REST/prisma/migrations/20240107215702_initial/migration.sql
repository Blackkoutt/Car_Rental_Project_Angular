-- CreateTable
CREATE TABLE "Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "date_of_manufacture" DATETIME NOT NULL,
    "available_count" INTEGER NOT NULL,
    "rental_cost" REAL NOT NULL,
    "gearbox" BOOLEAN NOT NULL,
    "manufacturerId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "Car_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "seats_count" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Reservation" (
    "carId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "start_of_reservation" DATETIME NOT NULL,
    "end_of_reservation" DATETIME NOT NULL,
    "total_cost" REAL NOT NULL,

    PRIMARY KEY ("carId", "userId"),
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Reservation_carId_userId_idx" ON "Reservation"("carId", "userId");
