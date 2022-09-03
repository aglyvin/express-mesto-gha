class ForbiddenError extends Error {
  constructor(msg) {
    super(msg);
    this.status = 401;
  }
}

module.exports = { ForbiddenError };
