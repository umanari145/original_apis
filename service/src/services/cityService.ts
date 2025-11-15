import { city } from '../../generated/prisma';
import { prisma } from '../db/prismaOperator';
import _ from 'lodash';

/**
 * 都道府県コードで市区町村を取得
 */
 export const getCitiesByPrefCode = async (
  prefCode: string
  ) => {
  try {

    const cities = await prisma.city.findMany({
      where: {
        pref_code: prefCode
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
    const groupedCities = _.groupBy(cities, 'city_code');
    
    // city_codeごとにグループ化したデータを配列形式に変換
    const result = Object.entries(groupedCities).map(([cityCode, cityData]) => ({
      city_code: cityCode,
      city_name: cityData[0].city_name,
      city_kana: cityData[0].city_kana,
      city_roma: cityData[0].city_roma,
      towns: cityData.map(city => ({
        zip_code: city.zip_code,
        town_name: city.town_name,
        town_kana: city.town_kana,
        town_roma: city.town_roma,
      }))
    }));
    
    return result;
  } catch (error) {
    console.error('Error fetching cities by pref code:', error);
    throw error;
  }
};

/**
 * 都道府県コードで市区町村を取得
 */
export const getTownByCityCode = async (
  cityCode: string
  ) => {
  try {

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
 * 郵便番号で市区町村を取得
 */
 export const getCitiesByWord = async (word: string) => {
  try {
    const towns = await prisma.city.findMany({
      where: {
        // 3つのフィールドのいずれかが word を含む
        OR: [
          { pref_name: { contains: word } },
          { city_name: { contains: word } },
          { town_name: { contains: word } },
        ],
      },
    });
    return towns;
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
