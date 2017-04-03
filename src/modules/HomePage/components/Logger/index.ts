function* createLogger(): Iterable<number> {
  let currentValue = 0;
  while(true) {
    yield currentValue++;
  }
}

export { createLogger };
