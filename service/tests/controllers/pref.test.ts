import request from 'supertest';
import app from '../../src/app';

describe('Prefecture API Endpoints', () => {
  describe('GET /api/prefs', () => {
    it('全都道府県を取得できること（200 OK）', async () => {
      const response = await request(app)
        .get('/api/prefs')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('count');
      
      const firstPref = response.body.data[0];
      expect(firstPref).toHaveProperty('pref_code');
      expect(firstPref).toHaveProperty('pref_name');
      expect(firstPref).toHaveProperty('pref_kana');
      expect(firstPref).toHaveProperty('pref_roma');
      expect(response.body.count).toBe(47);
      expect(response.body.data).toHaveLength(47);
    });

    it('有効な都道府県コードで都道府県を取得できること（200 OK）', async () => {
      const response = await request(app)
        .get('/api/prefs/13') // 東京都
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('pref_code', '13');
      expect(response.body.data).toHaveProperty('pref_name', '東京都');
    });

    it('存在しない都道府県コードで404エラーが返ること', async () => {
      const response = await request(app)
        .get('/api/prefs/99')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('not found');
    });
  });
});
