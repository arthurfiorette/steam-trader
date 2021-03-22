import React, { Fragment } from 'react';

export default function InfoBox({ title, children }: any) {
  return (
    <Fragment>
      <div className="px-3">
        <div className="px-3 lead text-dark">{title}</div>
        <hr className="m-0 mb-2" />
      </div>
      <div id="infoBox" className="shadow p-3 bg-light rounded border border-2">
        {children}
      </div>
    </Fragment>
  );
}


