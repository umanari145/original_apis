import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

/**
 * 都道府県コードで市区町村を取得
 */
export const getTownByCityCode = async (
  cityCode: string
  ) => {
  try {
    console.log(cityCode)
    const cities = await prisma.city.findMany({
      where: {
        city_code: cityCode
      },
      orderBy: [
        {
          city_code: 'asc',
        },
        {
          zip_code: 'asc',
        },
      ],
    });
    return cities;
  } catch (error) {
    console.error('Error fetching cities by pref code:', error);
    throw error;
  }
};

/**
 * 郵便番号で市区町村を取得
 */
export const getCityByZipCode = async (zipCode: string) => {
  try {
    const cities = await prisma.city.findMany({
      where: {
        zip_code: zipCode,
      },
    });
    return cities;
  } catch (error) {
    console.error('Error fetching city by zip code:', error);
    throw error;
  }
};

/**
 * 全市区町村を取得（ページネーション対応）
 */
export const getAllCities = async (skip: number = 0, take: number = 100) => {
  try {
    const [cities, total] = await Promise.all([
      prisma.city.findMany({
        skip,
        take,
        orderBy: [
          {
            pref_code: 'asc',
          },
          {
            city_code: 'asc',
          },
        ],
      }),
      prisma.city.count(),
    ]);
    return { cities, total };
  } catch (error) {
    console.error('Error fetching all cities:', error);
    throw error;
  }
};

/**
 * Prisma接続を切断
 */
export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};
