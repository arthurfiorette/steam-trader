import React from 'react';
import { Item } from '../../types';
import { Else, If } from '../if';
import { getImageUrl, getItemName } from './util';

export const ItemList = (({ items, received }) => {
  return (
    <ul className="list-inline text-center mb-0" style={{ maxWidth: '48%' }}>
      <If test={items.length === 0}>
        <EmptyItemPicture received={received} />
        <Else>
          {items.map((item: any) => (
            <ItemPicture item={item} received={received} />
          ))}
        </Else>
      </If>
    </ul>
  );
}) as React.FC<{ items: Item[]; received: boolean }>;

const ItemPicture = (({ item, received }) => {
  const name = getItemName(item);
  return (
    <li className="list-inline-item m-0">
      <img
        className={`alert shadow-sm border-2 alert-${
          received ? 'success' : 'danger'
        } p-1 m-1`}
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
}) as React.FC<{ item: Item; received: boolean }>;

const EmptyItemPicture = (({ received }) => {
  return (
    <li className="list-inline-item m-0">
      <img
        className={`alert shadow-sm border-2 alert-${
          received ? 'success' : 'danger'
        } p-1 m-1`}
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
}) as React.FC<{ received: boolean }>;
