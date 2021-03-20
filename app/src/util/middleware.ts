export type NextFunction = () => Promise<void> | void;

export type Middleware<T> = (context: T, next: NextFunction) => void;

export default class Pipeline<T> {
  constructor(private middlewares: Middleware<T>[] = []) {}

  use(...middlewares: Middleware<T>[]) {
    this.middlewares = middlewares;
  }

  add(...middlewares: Middleware<T>[]) {
    this.middlewares.push(...middlewares);
  }

  async execute(context: T) {
    return await this.run(context, [...this.middlewares]);
  }

  private async run(context: T, middlewares: Middleware<T>[]) {
    if (middlewares.length !== 0) {
      const next = middlewares.shift();
      if (next) {
        await next(context, () => {
          this.run(context, middlewares);
        });
      }
    }
    return context;
  }
}
