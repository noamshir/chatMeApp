const corsMiddleware = require('./cors')

describe('Test cors middleware', () => {
  const reqMock = (origin) => {
    return {
      headers: {
        origin,
      },
    }
  }

  const resMock = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.getHeader = jest.fn().mockReturnValue(res)
    res.setHeader = jest.fn().mockReturnValue(res)
    return res
  }

  test('should advance to next function', () => {
    const nextFnMock = jest.fn()

    const req = reqMock()
    const res = resMock()
    corsMiddleware(req, res, nextFnMock)
    expect(nextFnMock).toHaveBeenCalledTimes(1)
  })

  test('should return 403', () => {
    const unauthorizedOrigin = 'www.unauthorized.com'

    const nextFnMock = jest.fn()
    const req = reqMock(unauthorizedOrigin)
    const res = resMock()

    corsMiddleware(req, res, nextFnMock)
    expect(nextFnMock).toHaveBeenCalledTimes(0)
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({
      error: `Request was made from unauthorized domain: ${unauthorizedOrigin}`,
    })
  })
})
