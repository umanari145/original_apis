// 各テストファイルで使える共通処理
import { importCities } from '../seed/importCities';
import { importPrefs } from '../seed/importPrefs';
import { prisma, resetDatabase } from './helpers/db';

beforeEach(async () => {
  await resetDatabase();

  await importPrefs()
  .then(() => {
    console.log('\n🎉 Import completed successfully!');
  })
  .catch((error) => {
    console.error('\n💥 Import failed:', error);
    process.exit(1);
  });

  // スクリプトの実行
  await importCities(true)
  .then(() => {
    console.log('\n🎉 Import completed successfully!');
  })
  .catch((error) => {
    console.error('\n💥 Import failed:', error);
    process.exit(1);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});