import { PrismaClient } from '../generated/prisma';
import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';

const prisma = new PrismaClient();

interface CityData {
  zip_code: string;
  pref_code: string;
  pref_name: string;
  pref_kana: string;
  pref_roma: string;
  city_code: string;
  city_name: string;
  city_kana: string;
  city_roma: string;
  town_name: string;
  town_kana: string;
  town_roma: string;
}

export async function importCities(isTest:boolean = false) {
  try {
    //console.log('🚀 Starting cities data import...');

    const fileName = (isTest) ? 'test_cities.csv' : 'cities.csv' ;
    // CSVファイルのパス
    const csvFilePath = path.join(__dirname, fileName);

    // ファイルサイズの確認
    const stats = fs.statSync(csvFilePath);

    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');

    const parseResult = Papa.parse<string[]>(fileContent, {
      header: false,
      skipEmptyLines: true,
      delimiter: ',',
    });

    if (parseResult.errors.length > 0) {
      console.error('❌ CSV parsing errors:', parseResult.errors);
      throw new Error('Failed to parse CSV file');
    }

    // データの変換
    const cityData: CityData[] = parseResult.data.map((row) => ({
      zip_code: row[0]?.replace(/"/g, '') || '',
      pref_code: row[1]?.replace(/"/g, '') || '',
      pref_name: row[2]?.replace(/"/g, '') || '',
      pref_kana: row[3]?.replace(/"/g, '') || '',
      pref_roma: row[4]?.replace(/"/g, '') || '',
      city_code: row[5]?.replace(/"/g, '') || '',
      city_name: row[6]?.replace(/"/g, '') || '',
      city_kana: row[7]?.replace(/"/g, '') || '',
      city_roma: row[8]?.replace(/"/g, '') || '',
      town_name: row[9]?.replace(/"/g, '') || '',
      town_kana: row[10]?.replace(/"/g, '') || '',
      town_roma: row[11]?.replace(/"/g, '') || '',
    }));

    //console.log(`📊 Found ${cityData.length} city records to import`);

    // 既存データの削除（オプション）
    //console.log('🗑️  Deleting existing data...');
    await prisma.city.deleteMany({});

    // データの一括挿入（バッチ処理）
    const batchSize = 1000; // 1000件ずつ挿入
    const totalBatches = Math.ceil(cityData.length / batchSize);
    let totalInserted = 0;

    //console.log(`💾 Inserting data in ${totalBatches} batches...`);

    for (let i = 0; i < totalBatches; i++) {
      const start = i * batchSize;
      const end = Math.min(start + batchSize, cityData.length);
      const batch = cityData.slice(start, end);

      const result = await prisma.city.createMany({
        data: batch,
        skipDuplicates: true,
      });

      totalInserted += result.count;

      // 進捗表示
      const progress = ((i + 1) / totalBatches * 100).toFixed(1);
      //process.stdout.write(`\r📈 Progress: ${progress}% (${totalInserted}/${cityData.length} records)`);
    }

    //console.log('\n');
    //console.log(`✅ Successfully imported ${totalInserted} city records`);

    // 挿入されたデータの確認
    const totalCount = await prisma.city.count();
    //console.log(`📈 Total city records in database: ${totalCount}`);

  } catch (error) {
    console.error('❌ Error during import:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}