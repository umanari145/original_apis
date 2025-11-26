import request from 'supertest';
import app from '../../src/app';

describe('Prefecture City API Endpoints', () => {
  describe('GET /api/prefs/:prefCode/cities', () => {
    
    it('特定の市区町村に所属している市区町村を取得（200 OK）', async () => {
      const response = await request(app)
        .get('/api/prefs/01/cities')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toHaveProperty('success', true);
  
        const city = response.body.data[0];
        expect(city.city_code).toBe('01102');
        expect(city.city_kana).toBe('サッポロシキタク');
        expect(city.city_roma).toBe('SAPPORO SHI KITA KU');
        expect(Array.isArray(city.towns)).toBe(true)
        expect(city.towns[0].zip_code).toBe('0010010');
    });
  });

  describe('GET /api/cities/:cityCode', () => {
    it('市区町村コードに合致した字（200 OK）', async () => {
      const response = await request(app)
        .get('/api/cities/01102')
        .expect('Content-Type', /json/)
        .expect(200);
         
        expect(response.body).toHaveProperty('success', true);
        expect(response.body.data).toEqual({
          zip_code: '0010010',
          pref_code: '01',
          pref_name: '北海道',
          pref_kana: 'ホッカイドウ',
          pref_roma: 'HOKKAIDO',
          city_code: '01102',
          city_name: '札幌市北区',
          city_kana: 'サッポロシキタク',
          city_roma: 'SAPPORO SHI KITA KU',
          town_name: '北十条西（１～４丁目）',
          town_kana: 'キタ１０ジョウニシ（１－４チョウメ）',
          town_roma: 'KITA10-JONISHI(1-4-CHOME)'
        });
    });
  });

  describe('GET /api/cities/:cityCode/towns', () => {
    
    it('都市コードに所属する字を取得（200 OK）', async () => {
      const response = await request(app)
        .get('/api/cities/01102/towns')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toHaveProperty('success', true);
        const town = response.body.data[0];
        expect(town.city_code).toBe('01102');
        expect(town.town_kana).toBe('キタ１０ジョウニシ（１－４チョウメ）');
        expect(town.town_name).toBe('北十条西（１～４丁目）');
        expect(town.town_roma).toBe('KITA10-JONISHI(1-4-CHOME)');
    });
  });

  /*describe('GET /api/towns?zip=0010010&word=北十条', () => {

    it('郵便番号で取得（200 OK）', async () => {
      const response = await request(app)
        .get('/api/towns?zip=0010010')

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        const town = response.body.data[0]
        expect(town.city_code).toBe('01102');
        expect(town.town_kana).toBe('キタ１０ジョウニシ（１－４チョウメ）');
        expect(town.town_name).toBe('北十条西（１～４丁目）');
        expect(town.town_roma).toBe('KITA10-JONISHI(1-4-CHOME)');
    }); 

    it('キーワードで取得（200 OK）', async () => {
      const response = await request(app)
        .get('/api/towns?word=北十条西')

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        const town = response.body.data[0]
        expect(town.city_code).toBe('01102');
        expect(town.town_kana).toBe('キタ１０ジョウニシ（１－４チョウメ）');
        expect(town.town_name).toBe('北十条西（１～４丁目）');
        expect(town.town_roma).toBe('KITA10-JONISHI(1-4-CHOME)');
    });

    it('zip と word 両方未指定の場合、400を返す', async () => {
      const response = await request(app)
        .get('/api/towns');
      expect(response.status).toBe(400);
    })

    it('該当する町が見つからない場合、404を返す', async () => {

      const response = await request(app)
        .get('/api/towns?zip=2740077')
      expect(response.status).toBe(404);

    });
  
  });*/

});
