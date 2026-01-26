/*
  Warnings:

  - You are about to drop the column `period` on the `cart_requests` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cart_requests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "requested_date" TIMESTAMP NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "admin_notes" TEXT,
    "approved_by" TEXT,
    "approved_at" TIMESTAMP,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    CONSTRAINT "cart_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cart_requests" ("admin_notes", "approved_at", "approved_by", "created_at", "id", "requested_date", "status", "updated_at", "user_id", "value") SELECT "admin_notes", "approved_at", "approved_by", "created_at", "id", "requested_date", "status", "updated_at", "user_id", "value" FROM "cart_requests";
DROP TABLE "cart_requests";
ALTER TABLE "new_cart_requests" RENAME TO "cart_requests";
CREATE INDEX "cart_requests_user_id_idx" ON "cart_requests"("user_id");
CREATE INDEX "cart_requests_status_idx" ON "cart_requests"("status");
CREATE INDEX "cart_requests_requested_date_idx" ON "cart_requests"("requested_date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;


