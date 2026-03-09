/*
  Warnings:

  - You are about to drop the column `campaignCategoryId` on the `Campaign` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_campaignCategoryId_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "campaignCategoryId";

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CampaignCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
