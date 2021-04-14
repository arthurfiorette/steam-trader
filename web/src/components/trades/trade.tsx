import { ItemList } from './items';
import { TradeJSON } from '../../types';
import { ArrowLeftRight } from 'react-bootstrap-icons';

// TODO [#7]: Display the account that received the trade and display the profit currency
export const Trade = (({
  trade: { profit, partner, offerId, theirItems, ourItems }
}) => {
  const title = `Profit: ${profit} - Partner: ${partner} - Trade Id: ${offerId}`;
  return (
    <li
      className="d-flex justify-content-between align-items-center my-1 py-1"
      data-bs-toggle="tooltip"
      title={title}>
      <ItemList items={theirItems} received={true} />
      <ArrowLeftRight className="text-secondary mx-5" size="40px" />
      <ItemList items={ourItems} received={false} />
    </li>
  );
}) as React.FC<{ trade: TradeJSON }>;
