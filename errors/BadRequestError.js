class BadRequestError extends Error {
  constructor(msg) {
    super(msg);
    this.status = 400;
  }
}

module.exports = { BadRequestError };
