import request from 'supertest';
import app from '../../src/app';

describe('Prefecture City API Endpoints', () => {
  describe('GET /api/cities/pref/:prefCode', () => {
    
    it('都道府県の市区町村を取得（200 OK）', async () => {
      const response = await request(app)
        .get('/api/cities/pref/01')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('count');
  
        const city = response.body.data[0];
        expect(city.city_code).toBe('01102');
        expect(city.city_name).toBe('札幌市北区');
        expect(city.city_kana).toBe('サッポロシキタク');
        expect(city.city_roma).toBe('SAPPORO SHI KITA KU');
        expect(Array.isArray(city.towns)).toBe(true)
    });
  });

  describe('GET /api/town/zip/:ZipCode', () => {
    
    it('郵便番号から市区町村を取得（200 OK）', async () => {
      const response = await request(app)
        .get('/api/town/zip/0010010')
        .expect('Content-Type', /json/)
        .expect(200);
          
        expect(response.body).toEqual({
          success: true,
          count: 1,
          zipCode: '0010010',
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
        .expect('Content-Type', /json/)
        .expect(200);

        const town = response.body.data[0]
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
