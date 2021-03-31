import {Fragment } from 'react';

export default function InfoBox({ title, children }: any) {
  return (
    <Fragment>
      <h6 className="px-3 display-6 text-dark text-center mb-2">{title}</h6>
      <div className="shadow-lg p-2 rounded-3 border overflow-auto" style={{ height: '35vh', minHeight: '300px' }}>
        {children}
      </div>
    </Fragment>
  );
}
