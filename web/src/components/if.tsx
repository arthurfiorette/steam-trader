import React from 'react';

export const If = (({ test, children }) => {
  const elseElements: any[] = [];
  const ifElements: any[] = [];

  // Push element to correct array
  const push = (el: any) =>
    (el?.type === Else ? elseElements : ifElements).push(el);

  // More than one child
  if (Array.isArray(children)) {
    children.forEach(push);
  } else {
    push(children);
  }

  return <>{test ? ifElements : elseElements}</>;
}) as React.FC<{
  test: boolean;
  /* Force a child to exists and ignore types */
  children: any;
}>;

/**
 * Dummy component just to crate the else element
 */
export const Else = (({ children }) => {
  return children;
}) as React.FC<{}>;
