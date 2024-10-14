/*
  Warnings:

  - You are about to drop the column `logo_url` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `still_url` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `backdrop_url` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `poster_url` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture_url` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `backdrop_url` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `poster_url` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `backdrop_url` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `poster_url` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture_url` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "logo_url",
ADD COLUMN     "logo_path" TEXT;

-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "still_url",
ADD COLUMN     "still_path" TEXT;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "backdrop_url",
DROP COLUMN "poster_url",
ADD COLUMN     "backdrop_path" TEXT,
ADD COLUMN     "poster_path" TEXT;

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "profile_picture_url",
ADD COLUMN     "profile_picture_path" TEXT;

-- AlterTable
ALTER TABLE "Season" DROP COLUMN "backdrop_url",
DROP COLUMN "poster_url",
ADD COLUMN     "backdrop_path" TEXT,
ADD COLUMN     "poster_path" TEXT;

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "backdrop_url",
DROP COLUMN "poster_url",
ADD COLUMN     "backdrop_path" TEXT,
ADD COLUMN     "poster_path" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_picture_url",
ADD COLUMN     "profile_picture_path" TEXT;
