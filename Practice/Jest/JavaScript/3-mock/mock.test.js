const { map } = require('./mock')

describe('map function', () => {
  let arr

  beforeEach(() => {
    arr = [1, 2, 3, 5]
    fn = jest.fn((x) => x ** 2)
    map(arr, fn)
    console.log(fn)
  })

  test('should callback', () => {
    expect(fn).toBeCalled()
  })

  test('should callback 4 each', () => {
    expect(fn).toBeCalledTimes(4)
    expect(fn.mock.calls.length).toBe(4)
  })

  test('should returns', () => {
    expect(fn.mock.results[0].value).toBe(1)
    expect(fn.mock.results[1].value).toBe(4)
    expect(fn.mock.results[2].value).toBe(9)
    expect(fn.mock.results[3].value).toBe(25)
  })

  test('should fn work', () => {
    fn.mockReturnValueOnce(100).mockReturnValueOnce(200).mockReturnValue(300)

    expect(fn()).toEqual(100)
    expect(fn()).toEqual(200)
    expect(fn()).toEqual(300)
    expect(fn()).toEqual(300)
  })
})
