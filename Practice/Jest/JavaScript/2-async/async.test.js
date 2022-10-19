const { resAsync } = require('./async')

describe.skip('Ajax', () => {
  test('should return value async', async () => {
    const result = await resAsync('some data')
    expect(result).toBe('some data') // true
  })

  test('should return value with promise', async () => {
    return resAsync('kravich').then((data) => {
      expect(data).toBe('kravich') // true
    })
  })

  test('should catch error with promise', async () => {
    try {
      await resAsync()
    } catch (err) {
      expect(err.message).toBe('error') // true
    }
  })

  test('return kravich', (done) => {
    function just_fn(data) {
      try {
        expect(data).toBe('kravich')
        done()
      } catch (err) {
        done(err)
      }
    }
    just_fn('kravich')
  })
})
