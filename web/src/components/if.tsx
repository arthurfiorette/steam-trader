import { Fragment } from 'react';

type ChildrenProp = { children: any };

type IfProps = ChildrenProp & { test: boolean };

export default function If({ test, children }: IfProps) {
  let elseChild = <Fragment children={[]} />;
  let childArr = [];

  if (Array.isArray(children)) {
    for (let child of children) {
      console.log(child);
      if (child.type === Else) elseChild.props.children.push(child);
      else childArr.push(child);
    }
  }

  return <Fragment>{test ? childArr : elseChild}</Fragment>;
}

export function Else({ children }: ChildrenProp) {
  return <Fragment>{children}</Fragment>;
}
