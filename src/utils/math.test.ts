import { describe, it, expect } from 'vitest'
import { sum, average } from './math'

describe('Math Utils', () => {
  describe('sum', () => {
    it('should return 0 for empty array', () => {
      expect(sum([])).toBe(0)
    })

    it('should sum array of numbers correctly', () => {
      expect(sum([1, 2, 3])).toBe(6)
      expect(sum([-1, -2, 3])).toBe(0)
      expect(sum([0.1, 0.2])).toBeCloseTo(0.3)
    })
  })

  describe('average', () => {
    it('should return 0 for empty array', () => {
      expect(average([])).toBe(0)
    })

    it('should calculate average correctly', () => {
      expect(average([1, 2, 3])).toBe(2)
      expect(average([-1, -2, 3])).toBe(0)
      expect(average([0.1, 0.2])).toBeCloseTo(0.15)
    })
  })
})
