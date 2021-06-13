const { sum, nativeNull } = require('./intro')

describe.skip('Sum function', () => {
  test('should return sum of to values', () => {
    expect(sum(13, 20)).toBe(33) // может быть значением 33
    expect(sum(13, 20)).toEqual(33) // может быть числом 33
  })

  test('should return value other', () => {
    expect(sum(3, 3)).toBeGreaterThan(5) // больше 5
    expect(sum(2, 3)).toBeGreaterThanOrEqual(5) // больше или равняется 5
    expect(sum(2, 2)).toBeLessThan(6) // меньше 5
    expect(sum(2, 3)).toBeLessThanOrEqual(5) // меньше или равняется 5
  })

  test('should sum 2 float values correctly', () => {
    // expect(sum(0.1, 0.2)).toBe(0.3) // Received: 0.30000000000000004
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3) // 0.3
  })
})

describe.skip('String actions', () => {
  test('other', () => {
    expect('kravich').toMatch(/kra/) // есть kra (регулярка)
  })
})

describe.skip('NativeNull function', () => {
  test('return false null', () => {
    expect(nativeNull()).toBe(null) // null
    expect(nativeNull()).toBeNull() // null
    expect(nativeNull()).toBeFalsy() // !value
    expect(nativeNull()).toBeDefined() // определенное значение
    expect(nativeNull()).not.toBeTruthy() // тоже самое, что и falsy
    expect(nativeNull()).not.toBeUndefined() // не undefined
  })
})

describe.skip('Test arr and obj', () => {
  const arr = ['vlad', 'kravich', 'max']

  test('Elem exists', () => {
    expect(arr).toContain('max') // exist
    expect(new Set(arr)).toContain('max') // exist
  })
})

describe('Test with objects', () => {
  test('all', () => {
    expect({ a: 1 }).toHaveProperty('a') // exsist
    expect({ a: 1 }).toHaveProperty('a', 1) // key and value
    expect({ a: { b: 1 } }).toHaveProperty('a.b') // there is b in a
    expect({ a: 1, b: 2 }).toMatchObject({ a: 1 }) // exsist
    expect({ a: 1, b: 2 }).toMatchObject({
      a: expect.any(Number),
      b: expect.any(Number),
    }) // check of types values
    expect([{ a: 1 }, { b: 2 }]).toEqual([
      expect.objectContaining({ a: expect.any(Number) }),
      expect.anything(), // что угодно
    ])
  })
})
