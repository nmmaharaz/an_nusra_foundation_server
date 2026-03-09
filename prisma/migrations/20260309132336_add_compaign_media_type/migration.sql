/*
  Warnings:

  - The `type` column on the `CampaignMedia` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CampaignMediaType" AS ENUM ('image', 'video');

-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "goalAmount" DROP NOT NULL,
ALTER COLUMN "raisedAmount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CampaignMedia" DROP COLUMN "type",
ADD COLUMN     "type" "CampaignMediaType" NOT NULL DEFAULT 'image';
