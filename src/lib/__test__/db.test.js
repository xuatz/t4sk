import * as db from '../db';

it('sums numbers', () => {
  expect(1+2).toEqual(3);
  expect(4).toEqual(4);
});

describe('db.getAllTasks', () => {
	describe('if there is no results', () => {
		it('should return empty arr', () => {
			expect(db.getAllTasks('empty')).toEqual([]);		
		})
	})	

	describe('if there results', () => {
		it('should return a collection of parse objects', () => {
			return false;
		})
	})
})