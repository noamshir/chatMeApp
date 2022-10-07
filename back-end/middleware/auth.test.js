const { requireAuthentication } = require('./auth')

describe('test auth middleware', () => {
  const mockRequest = (user) => {
    return {
      session: { user },
    }
  }
  const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }
  test('should fail with 401 if no user in session', () => {
    const req = mockRequest()
    const res = mockResponse()
    const nextMock = jest.fn()
    requireAuthentication(req, res, nextMock)
    expect(nextMock).toHaveBeenCalledTimes(0)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      error: 'user unauthenticated, please login to chatMe.',
    })
  })
  test('should pass auth middleware if session has user in it', () => {
    const user = { username: 'test' }
    const req = mockRequest(user)
    const res = mockResponse()
    const nextMock = jest.fn()
    requireAuthentication(req, res, nextMock)
    expect(nextMock).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledTimes(0)
  })
})
