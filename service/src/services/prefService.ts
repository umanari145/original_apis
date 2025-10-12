import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

/**
 * 全都道府県を取得
 */
export const getAllPrefs = async () => {
  try {
    const prefs = await prisma.pref.findMany({
      orderBy: {
        pref_code: 'asc',
      },
    });
    return prefs;
  } catch (error) {
    console.error('Error fetching prefs:', error);
    throw error;
  }
};

/**
 * 都道府県コードで検索
 */
export const getPrefByCode = async (prefCode: string) => {
  try {
    const pref = await prisma.pref.findUnique({
      where: {
        pref_code: prefCode,
      },
    });
    return pref;
  } catch (error) {
    console.error('Error fetching pref by code:', error);
    throw error;
  }
};

/**
 * Prisma接続を切断
 */
export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};
