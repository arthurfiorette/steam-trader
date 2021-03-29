import React from 'react';
import { Item as IItem, getItemName } from './util';
import {GiftFill } from 'react-bootstrap-icons';

export default function ItemFrame({ item, received }: { item: IItem; received: boolean }) {
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
  return (
    <GiftFill
      className="alert shadow-sm border-2 alert-secondary text-secondary p-1 m-1"
      height="50px"
      width="50px"
    />
  );
}

function getImageUrl({ icon_url }: IItem) {
  return `https://steamcommunity-a.akamaihd.net/economy/image/${icon_url}`;
}
