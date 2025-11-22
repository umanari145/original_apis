// 各テストファイルで使える共通処理
import { importCities } from '../seed/importCities';
import { importPrefs } from '../seed/importPrefs';
import { prisma, resetDatabase } from './helpers/db';

beforeAll(async () => {
  await resetDatabase();

  await importPrefs()
  .then(() => {
    console.log('\n🎉 Import Prefs completed successfully!');
  })
  .catch((error) => {
    console.error('\n💥 Import failed:', error);
    process.exit(1);
  });

  // スクリプトの実行
  await importCities(true)
  .then(() => {
    console.log('\n🎉 Import Cities completed successfully!');
  })
  .catch((error) => {
    console.error('\n💥 Import failed:', error);
    process.exit(1);
  });
})


afterAll(async () => {
  await resetDatabase();
  await prisma.$disconnect();
});