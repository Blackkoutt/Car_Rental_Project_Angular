-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "date_of_manufacture" DATETIME NOT NULL,
    "available_count" INTEGER NOT NULL,
    "rental_cost" REAL NOT NULL,
    "gearbox" BOOLEAN NOT NULL,
    "manufacturerId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "Car_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Car_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Car" ("available_count", "date_of_manufacture", "gearbox", "id", "manufacturerId", "model", "rental_cost", "typeId") SELECT "available_count", "date_of_manufacture", "gearbox", "id", "manufacturerId", "model", "rental_cost", "typeId" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "start_of_reservation" DATETIME NOT NULL,
    "end_of_reservation" DATETIME NOT NULL,
    "total_cost" REAL NOT NULL,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reservation_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("carId", "end_of_reservation", "id", "start_of_reservation", "total_cost", "userId") SELECT "carId", "end_of_reservation", "id", "start_of_reservation", "total_cost", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
