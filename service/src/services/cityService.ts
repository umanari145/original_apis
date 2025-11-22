import { city } from '../../generated/prisma';
import { prisma } from '../db/prismaOperator';
import _ from 'lodash';
import { Prisma } from '@prisma/client';

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
 export const getCityByCityCode = async (
  cityCode: string
  ) => {
  try {
    const city = await prisma.city.findFirst({
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
    return city;
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
 export const getTownsByQuery = async (zip?:string, word?: string) => {
  try {

    const whereConditions: any[] = [];

    if (zip !== undefined) {
      whereConditions.push({
        zip_code: {
          startsWith: zip
        }
      });
    }
  
    if (word !== undefined) {
      whereConditions.push({
        OR: [
          { pref_name: { contains: word } },
          { city_name: { contains: word } },
          { town_name: { contains: word } }
        ]
      });
    }
  
    const where = whereConditions.length > 0 
      ? { AND: whereConditions }
      : {};

    const towns = await prisma.city.findMany({
      where,
      orderBy: [
        { pref_name: 'asc' },
        { city_name: 'asc' },
        { town_name: 'asc' }
      ]
    });
  
    return towns;
  } catch (error) {
    console.error('Error fetching city by zip code:', error);
    throw error;
  }
};

/**
 * Prisma接続を切断
 */
export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};
