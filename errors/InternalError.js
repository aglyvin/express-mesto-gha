class InternalError extends Error {
  constructor(msg) {
    const message = msg === '' ? 'Произошла ошибка' : msg;
    super(message);
    this.status = 500;
  }
}

module.exports = { InternalError };
