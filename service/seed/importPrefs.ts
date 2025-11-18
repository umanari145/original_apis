import { PrismaClient } from '../generated/prisma';
import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';

const prisma = new PrismaClient();

interface PrefData {
  pref_code: string;
  pref_name: string;
  pref_kana: string;
  pref_roma: string;
}

export async function importPrefs() {
  try {
    //console.log('🚀 Starting prefectures data import...');

    // CSVファイルのパス
    const csvFilePath = path.join(__dirname, 'prefs.csv');

    // CSVファイルの読み込み
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');

    // CSVのパース
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
    const prefData: PrefData[] = parseResult.data.map((row) => ({
      pref_code: row[0].replace(/"/g, ''), // ダブルクォートを除去
      pref_name: row[1].replace(/"/g, ''),
      pref_kana: row[2].replace(/"/g, ''),
      pref_roma: row[3].replace(/"/g, ''),
    }));

    //console.log(`📊 Found ${prefData.length} prefectures to import`);

    // 既存データの削除（オプション）
    //console.log('🗑️  Deleting existing data...');
    await prisma.pref.deleteMany({});

    // データの一括挿入
    //console.log('💾 Inserting prefecture data...');
    const result = await prisma.pref.createMany({
      data: prefData,
      skipDuplicates: true, // 重複をスキップ
    });

    //console.log(`✅ Successfully imported ${result.count} prefectures`);

    // 挿入されたデータの確認
    const totalCount = await prisma.pref.count();
    //console.log(`📈 Total prefectures in database: ${totalCount}`)

  } catch (error) {
    console.error('❌ Error during import:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}