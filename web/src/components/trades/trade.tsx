import { ItemSet } from './item';
import { Trade as ITrade } from './util';
import { ArrowLeftRight } from 'react-bootstrap-icons';

export default function Trade({ trade }: { trade: ITrade }) {
  const title = `Profit: ${trade.profit} - Partner: ${trade.partner} - Trade Id: ${trade.offerId}`;
  return (
    <li
      className="d-flex justify-content-between align-items-center my-1 py-1"
      data-bs-toggle="tooltip"
      title={title}>
      <ItemSet items={trade.theirItems} received={true} />
      <ArrowLeftRight className="text-secondary mx-5" size="40px" />
      <ItemSet items={trade.ourItems} />
    </li>
  );
}
