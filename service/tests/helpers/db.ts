import { PrismaClient } from '../../generated/prisma';
// シングルトンのPrismaクライアント
const prisma = new PrismaClient();
 
export { prisma };
/**
 * データベースをリセット（deleteMany版 - より安全）
 * テーブルが少ない場合やリレーションが複雑でない場合に推奨
 */
export async function resetDatabase() {
  // 依存関係の順序で削除（子テーブル → 親テーブル）
  // プロジェクトのスキーマに合わせて順序を調整してください
  await prisma.city.deleteMany();
  await prisma.pref.deleteMany();
  // 他のテーブルも必要に応じて追加
}

