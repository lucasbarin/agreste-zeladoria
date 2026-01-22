-- CreateTable
CREATE TABLE "tractor_requests" (
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
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "chainsaw_requests" (
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
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "tractor_requests_user_id_idx" ON "tractor_requests"("user_id");

-- CreateIndex
CREATE INDEX "tractor_requests_status_idx" ON "tractor_requests"("status");

-- CreateIndex
CREATE INDEX "tractor_requests_requested_date_idx" ON "tractor_requests"("requested_date");

-- CreateIndex
CREATE INDEX "chainsaw_requests_user_id_idx" ON "chainsaw_requests"("user_id");

-- CreateIndex
CREATE INDEX "chainsaw_requests_status_idx" ON "chainsaw_requests"("status");

-- CreateIndex
CREATE INDEX "chainsaw_requests_requested_date_idx" ON "chainsaw_requests"("requested_date");
