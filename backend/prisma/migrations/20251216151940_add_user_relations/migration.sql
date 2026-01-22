-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chainsaw_requests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "requested_date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "admin_notes" TEXT,
    "approved_by" TEXT,
    "approved_at" DATETIME,
    "estimated_value" REAL,
    "final_value" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "chainsaw_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_chainsaw_requests" ("admin_notes", "approved_at", "approved_by", "created_at", "description", "estimated_value", "final_value", "id", "requested_date", "status", "updated_at", "user_id") SELECT "admin_notes", "approved_at", "approved_by", "created_at", "description", "estimated_value", "final_value", "id", "requested_date", "status", "updated_at", "user_id" FROM "chainsaw_requests";
DROP TABLE "chainsaw_requests";
ALTER TABLE "new_chainsaw_requests" RENAME TO "chainsaw_requests";
CREATE INDEX "chainsaw_requests_user_id_idx" ON "chainsaw_requests"("user_id");
CREATE INDEX "chainsaw_requests_status_idx" ON "chainsaw_requests"("status");
CREATE INDEX "chainsaw_requests_requested_date_idx" ON "chainsaw_requests"("requested_date");
CREATE TABLE "new_tractor_requests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "requested_date" DATETIME NOT NULL,
    "hours_needed" INTEGER NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "admin_notes" TEXT,
    "approved_by" TEXT,
    "approved_at" DATETIME,
    "value_per_hour" REAL NOT NULL,
    "total_value" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "tractor_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tractor_requests" ("admin_notes", "approved_at", "approved_by", "created_at", "description", "hours_needed", "id", "requested_date", "status", "total_value", "updated_at", "user_id", "value_per_hour") SELECT "admin_notes", "approved_at", "approved_by", "created_at", "description", "hours_needed", "id", "requested_date", "status", "total_value", "updated_at", "user_id", "value_per_hour" FROM "tractor_requests";
DROP TABLE "tractor_requests";
ALTER TABLE "new_tractor_requests" RENAME TO "tractor_requests";
CREATE INDEX "tractor_requests_user_id_idx" ON "tractor_requests"("user_id");
CREATE INDEX "tractor_requests_status_idx" ON "tractor_requests"("status");
CREATE INDEX "tractor_requests_requested_date_idx" ON "tractor_requests"("requested_date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
