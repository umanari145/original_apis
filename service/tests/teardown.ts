import { PrismaClient } from '../generated/prisma';
export default async () => {
  const prisma = new PrismaClient();
  
  try {
    console.log('テスト終了: DB接続をクローズします');
    await prisma.$disconnect();
  } catch (error) {
    console.error('DB切断時にエラーが発生しました:', error);
    process.exit(1);
  }
};