import { rand } from 'lib';

describe('lib -> rand', () => {
  test('returns a randomly-generated hex string of a given length', async () => {
    try {
      expect((await rand(10)).length).toBe(10);
      expect((await rand(20)).length).toBe(20);
      expect((await rand(-50)).length).toBe(50);
      expect((await rand(12345)).length).toBe(12344);
      expect((await rand(-98764)).length).toBe(98764);
      expect((await rand(123.456)).length).toBe(122);
      expect((await rand(-987.654)).length).toBe(986);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
  test('throws an error if given invalid input', async () => {
    try {
      await rand('hey' as any);
    } catch (e) {
      expect(e).not.toBeNull();
      expect(e.name).toBe('TypeError');
    }
  });
});
