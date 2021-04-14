import { CloseButton } from './button';

export const Offcanvas = (({ id, title, children }) => {
  return (
    <div
      className="offcanvas offcanvas-start"
      id={id}
      aria-labelledby={`${id}-offcanvasLabel`}>
      <div className="offcanvas-header pb-2">
        <h5 className="offcanvas-title" id={`${id}-offcanvasLabel`}>
          {title}
        </h5>
        <CloseButton data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
      <div className="offcanvas-body pt-2">{children}</div>
    </div>
  );
}) as React.FC<{ id: string; title: string }>;
