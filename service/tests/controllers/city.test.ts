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
        expect(response.body).toHaveProperty('count');
  
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
        expect(response.body.data[0]).toEqual({
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

  describe.only('GET /api/cities/:cityCode/towns', () => {
    
    it('都市コードに所属する字を取得（200 OK）', async () => {
      const response = await request(app)
        .get('/api/cities/01102/towns')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toEqual({
          success: true,
          cityCode: '01102',
          data: [
            {
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
            }
          ]
        });
    });
  });

  describe('GET /api/town/city/:CityCode', () => {
    
    it('市区町村コードから字を取得（200 OK）', async () => {
      const response = await request(app)
        .get('/api/town/city/01102')
        //.expect('Content-Type', /json/)
        //.expect(200);
        const town = response.body.data[0]
        console.log(town)
        expect(town).toEqual({
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
});
