/*
  Warnings:

  - You are about to drop the column `estimated_value` on the `chainsaw_requests` table. All the data in the column will be lost.
  - You are about to drop the column `final_value` on the `chainsaw_requests` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chainsaw_requests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "requested_date" DATETIME NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "admin_notes" TEXT,
    "approved_by" TEXT,
    "approved_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "chainsaw_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_chainsaw_requests" ("admin_notes", "approved_at", "approved_by", "created_at", "description", "id", "requested_date", "status", "updated_at", "user_id") SELECT "admin_notes", "approved_at", "approved_by", "created_at", "description", "id", "requested_date", "status", "updated_at", "user_id" FROM "chainsaw_requests";
DROP TABLE "chainsaw_requests";
ALTER TABLE "new_chainsaw_requests" RENAME TO "chainsaw_requests";
CREATE INDEX "chainsaw_requests_user_id_idx" ON "chainsaw_requests"("user_id");
CREATE INDEX "chainsaw_requests_status_idx" ON "chainsaw_requests"("status");
CREATE INDEX "chainsaw_requests_requested_date_idx" ON "chainsaw_requests"("requested_date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
