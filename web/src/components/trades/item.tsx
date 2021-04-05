import { Item as IItem, getItemName, getImageUrl } from './util';
import If, { Else } from '../if';

export default function Item({ item, received }: { item: IItem; received: boolean }) {
  const name = getItemName(item);
  return (
    <li className="list-inline-item m-0">
      <img
        className={`alert shadow-sm border-2 alert-${received ? 'success' : 'danger'} p-1 m-1`}
        src={getImageUrl(item)}
        alt={name}
        height="50px"
        width="50px"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={name}
      />
    </li>
  );
}

export function EmptyItem({ received }: any) {
  return (
    <li className="list-inline-item m-0">
      <img
        className={`alert shadow-sm border-2 alert-${received ? 'success' : 'danger'} p-1 m-1`}
        alt=""
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" // Empty 1px image
        height="50px"
        width="50px"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="No items on this side"
      />
    </li>
  );
}

export function ItemSet({ items, received = false }: any) {
  return (
    <ul className="list-inline text-center mb-0" style={{ maxWidth: '48%' }}>
      <If test={items.length === 0}>
        <EmptyItem received={received} />
        <Else>
          {items.map((item: any) => (
            <Item item={item} received={received} />
          ))}
        </Else>
      </If>
    </ul>
  );
}
