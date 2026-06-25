-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PM', 'VENDOR');

-- CreateEnum
CREATE TYPE "VendorStatus" AS ENUM ('VERIFIED', 'CONDITIONAL', 'BLOCKED');

-- CreateEnum
CREATE TYPE "Urgency" AS ENUM ('EMERGENCY', 'URGENT', 'ROUTINE');

-- CreateEnum
CREATE TYPE "WorkOrderStatus" AS ENUM ('INTAKE', 'ASSIGNED', 'IN_PROGRESS', 'PENDING_REVIEW', 'ESCALATED', 'CLOSED_VERIFIED', 'CLOSED_FAILED');

-- CreateEnum
CREATE TYPE "BuildingRisk" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "InspectionResult" AS ENUM ('PASS', 'CONDITIONAL', 'FAIL');

-- CreateEnum
CREATE TYPE "EscalationState" AS ENUM ('OFFERED', 'ASSIGNED', 'EXTERNAL', 'RESOLVED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('AWAITING_DF_APPROVAL', 'APPROVED_FOR_PM', 'PROCESSED');

-- CreateEnum
CREATE TYPE "EvStatus" AS ENUM ('ON_TRACK', 'ACTION_NEEDED', 'WAITING_COUNCIL', 'DONE');

-- CreateEnum
CREATE TYPE "NotifyTarget" AS ENUM ('ROLE', 'VENDOR');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "orgId" TEXT NOT NULL,
    "vendorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "strataPlan" TEXT,
    "risk" "BuildingRisk" NOT NULL DEFAULT 'MEDIUM',

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildingPM" (
    "userId" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,

    CONSTRAINT "BuildingPM_pkey" PRIMARY KEY ("userId","buildingId")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trade" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" "VendorStatus" NOT NULL DEFAULT 'VERIFIED',
    "score" INTEGER NOT NULL DEFAULT 0,
    "slaPct" INTEGER NOT NULL DEFAULT 0,
    "avgRespHrs" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "jobsCompleted" INTEGER NOT NULL DEFAULT 0,
    "insuranceCurrent" BOOLEAN NOT NULL DEFAULT true,
    "isBackup" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrder" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "unit" TEXT,
    "issue" TEXT NOT NULL,
    "trade" TEXT NOT NULL,
    "urgency" "Urgency" NOT NULL,
    "status" "WorkOrderStatus" NOT NULL DEFAULT 'INTAKE',
    "assignedVendorId" TEXT,
    "assignedVendorUserId" TEXT,
    "slaDeadline" TIMESTAMP(3),
    "slaPct" INTEGER NOT NULL DEFAULT 100,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proof" (
    "id" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "photos" TEXT[],
    "checklist" JSONB NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proof_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "quality" INTEGER,
    "completeness" INTEGER,
    "proof" INTEGER,
    "professionalism" INTEGER,
    "safety" INTEGER,
    "total" INTEGER,
    "result" "InspectionResult",
    "actionRequired" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escalation" (
    "id" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "state" "EscalationState" NOT NULL DEFAULT 'OFFERED',
    "fromVendorId" TEXT,
    "backupChain" TEXT[],
    "chainIdx" INTEGER NOT NULL DEFAULT 0,
    "acceptedByVendorId" TEXT,
    "slaWindow" TEXT NOT NULL,
    "slaPct" INTEGER NOT NULL,
    "ownerLabel" TEXT NOT NULL,
    "logs" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Escalation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "invoiceNo" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'AWAITING_DF_APPROVAL',
    "dfApprovedByUserId" TEXT,
    "processedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvProject" (
    "id" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "stage" INTEGER NOT NULL DEFAULT 1,
    "status" "EvStatus" NOT NULL DEFAULT 'ON_TRACK',
    "priority" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT NOT NULL,
    "nextStep" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "target" "NotifyTarget" NOT NULL,
    "role" "Role",
    "vendorId" TEXT,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "refEntity" TEXT,
    "refId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "actorUserId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_orgId_idx" ON "User"("orgId");

-- CreateIndex
CREATE INDEX "User_clerkId_idx" ON "User"("clerkId");

-- CreateIndex
CREATE INDEX "Building_orgId_idx" ON "Building"("orgId");

-- CreateIndex
CREATE INDEX "Vendor_orgId_idx" ON "Vendor"("orgId");

-- CreateIndex
CREATE INDEX "Vendor_trade_idx" ON "Vendor"("trade");

-- CreateIndex
CREATE INDEX "Vendor_status_idx" ON "Vendor"("status");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrder_code_key" ON "WorkOrder"("code");

-- CreateIndex
CREATE INDEX "WorkOrder_orgId_idx" ON "WorkOrder"("orgId");

-- CreateIndex
CREATE INDEX "WorkOrder_buildingId_idx" ON "WorkOrder"("buildingId");

-- CreateIndex
CREATE INDEX "WorkOrder_status_idx" ON "WorkOrder"("status");

-- CreateIndex
CREATE INDEX "WorkOrder_assignedVendorId_idx" ON "WorkOrder"("assignedVendorId");

-- CreateIndex
CREATE UNIQUE INDEX "Proof_workOrderId_key" ON "Proof"("workOrderId");

-- CreateIndex
CREATE INDEX "Inspection_vendorId_idx" ON "Inspection"("vendorId");

-- CreateIndex
CREATE INDEX "Inspection_buildingId_idx" ON "Inspection"("buildingId");

-- CreateIndex
CREATE INDEX "Inspection_scheduledFor_idx" ON "Inspection"("scheduledFor");

-- CreateIndex
CREATE UNIQUE INDEX "Escalation_workOrderId_key" ON "Escalation"("workOrderId");

-- CreateIndex
CREATE INDEX "Escalation_state_idx" ON "Escalation"("state");

-- CreateIndex
CREATE INDEX "Escalation_level_idx" ON "Escalation"("level");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_workOrderId_key" ON "Payment"("workOrderId");

-- CreateIndex
CREATE INDEX "Payment_orgId_idx" ON "Payment"("orgId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_vendorId_idx" ON "Payment"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "EvProject_buildingId_key" ON "EvProject"("buildingId");

-- CreateIndex
CREATE INDEX "EvProject_status_idx" ON "EvProject"("status");

-- CreateIndex
CREATE INDEX "Notification_orgId_role_idx" ON "Notification"("orgId", "role");

-- CreateIndex
CREATE INDEX "Notification_vendorId_idx" ON "Notification"("vendorId");

-- CreateIndex
CREATE INDEX "Notification_read_idx" ON "Notification"("read");

-- CreateIndex
CREATE INDEX "AuditLog_orgId_createdAt_idx" ON "AuditLog"("orgId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildingPM" ADD CONSTRAINT "BuildingPM_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildingPM" ADD CONSTRAINT "BuildingPM_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_assignedVendorId_fkey" FOREIGN KEY ("assignedVendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proof" ADD CONSTRAINT "Proof_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escalation" ADD CONSTRAINT "Escalation_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvProject" ADD CONSTRAINT "EvProject_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
