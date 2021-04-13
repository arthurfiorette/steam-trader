type ChildrenProp = { children?: any };

type IfProps = ChildrenProp & { test: boolean };

export default function If({ test, children }: IfProps) {
  let elseChild = <>{[]}</>;
  let childArr = [];

  if (Array.isArray(children)) {
    for (let child of children) {
      if (child.type === Else) elseChild.props.children.push(child);
      else childArr.push(child);
    }
  } else {
    childArr.push(children);
  }

  return <>{test ? childArr : elseChild}</>;
}

export function Else({ children }: ChildrenProp) {
  return <>{children}</>;
}
