import Account from '../account/account';
import { Offer, ItemPrice } from './types';
import Processor from './processor';

export type OfferContext = {
  readonly processor: Processor;
  readonly offer: Offer;
  receiveItemsPrices: ItemPrice[];
  receivePrice: number;
  giveItemsPrices: ItemPrice[];
  givePrice: number;
  profit: number,
};

export type Next = () => Promise<void> | void;

export type Middleware = (context: OfferContext, next: Next) => void;

export class Pipeline {
  constructor(private middlewares: Middleware[] = []) {}

  use(...middlewares: Middleware[]) {
    this.middlewares.push(...middlewares);
  }

  async execute(context: OfferContext) {
    await this.run(context);
  }

  private async run(context: OfferContext) {
    if (this.middlewares.length !== 0) {
      const next = this.middlewares.shift();
      next && await next(context, () => this.run(context));
    }
  }
}
