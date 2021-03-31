import { Item, getItemName, getImageUrl } from './util';
import { GiftFill } from 'react-bootstrap-icons';

export default function ItemFrame({ item, received }: { item: Item; received: boolean }) {
  const name = getItemName(item);
  return (
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
  );
}

export function EmptyItemFrame() {
  return <GiftFill className="alert shadow-sm border-2 alert-secondary text-secondary p-1 m-1" height="50px" width="50px" />;
}
