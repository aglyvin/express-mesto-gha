class ConflictError extends Error {
  constructor(msg) {
    super(msg);
    this.status = 409;
  }
}

module.exports = { ConflictError };
