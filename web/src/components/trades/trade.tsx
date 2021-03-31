import ItemFrame, { EmptyItemFrame } from './item';
import { Item, Trade as ITrade } from './util';
import { ArrowLeftRight } from 'react-bootstrap-icons';

export default function Trade({ trade }: { trade: ITrade }) {
  return (
    <div
      className="d-flex justify-content-between align-items-center my-1 py-1"
      data-bs-toggle="tooltip"
      data-bs-html="true"
      title={`Profit: ${trade.profit} - Partner: ${trade.partner} - Trade Id: ${trade.offerId}`}>
      <ItemSet items={trade.theirItems} received={true} />
      <ArrowLeftRight className="text-secondary mx-5" size="40px" />
      <ItemSet items={trade.ourItems} />
    </div>
  );
}

function mapItems(items: Item[], received: boolean) {
  return items.map((item) => (
    <li className="list-inline-item m-0">
      <ItemFrame item={item} received={received} />
    </li>
  ));
}

function ItemSet({ items, received = false }: any) {
  return (
    <ul className="list-inline text-center mb-0" style={{ maxWidth: '48%' }}>
      {items.length > 0 ? mapItems(items, received) : <EmptyItemFrame />}
    </ul>
  );
}
