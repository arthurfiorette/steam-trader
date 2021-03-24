import React from 'react';

export function Container({ children }: any) {
  return <div className="container">{children}</div>;
}

export function Row({ children }: any) {
  return <div className="row my-4">{children}</div>;
}

export function Nav({ children }: any) {
  return <nav className="justify-content-center navbar navbar-expand navbar-dark bg-dark">{children}</nav>;
}

export function NavBrand({ children }: any) {
  return <span className="navbar-brand">{children}</span>;
}
