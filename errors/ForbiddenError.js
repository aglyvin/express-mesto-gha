class ForbiddenError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 401;
  }
}

module.exports = { ForbiddenError };
