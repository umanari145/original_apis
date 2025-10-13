import { PrismaClient } from '../generated/prisma';
import { execSync } from 'child_process';
import * as path from 'path';
import { importPrefs } from './importPrefs';
import { importCities } from './importCities';

const prisma = new PrismaClient();

export async function seedAll() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // データベース接続確認
    console.log('🔌 Checking database connection...');
    await prisma.$connect();
    console.log('✅ Database connected successfully\n');

    // 1. 都道府県データのインポート
    console.log('=' .repeat(60));
    console.log('1️⃣  Importing Prefectures Data');
    console.log('=' .repeat(60));

    await importPrefs()
      .then(() => {
        console.log('\n🎉 Import completed successfully!');
      })
      .catch((error) => {
        console.error('\n💥 Import failed:', error);
        process.exit(1);
      });
  
    console.log('\n');

    // 2. 市区町村データのインポート
    console.log('=' .repeat(60));
    console.log('2️⃣  Importing Cities Data');
    console.log('=' .repeat(60));

    // スクリプトの実行
    await importCities()
      .then(() => {
        console.log('\n🎉 Import completed successfully!');
      })
      .catch((error) => {
        console.error('\n💥 Import failed:', error);
        process.exit(1);
      });



    console.log('\n');

    // 最終確認
    console.log('=' .repeat(60));
    console.log('📊 Final Statistics');
    console.log('=' .repeat(60));

    const prefCount = await prisma.pref.count();
    const cityCount = await prisma.city.count();

    console.log(`✅ Prefectures: ${prefCount} records`);
    console.log(`✅ Cities: ${cityCount} records`);
    console.log(`📈 Total: ${prefCount + cityCount} records`);

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// スクリプトの実行
seedAll()
  .then(() => {
    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seeding failed:', error);
    process.exit(1);
  });
