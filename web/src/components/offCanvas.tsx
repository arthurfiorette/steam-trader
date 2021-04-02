import {CloseButton} from "./button"

export default function OffCanvas({ id, title, children }: any) {
  return (
    <div className="offcanvas offcanvas-start" id={id} aria-labelledby="offcanvasLabel">
      <div className="offcanvas-header pb-2">
        <h5 className="offcanvas-title" id="offcanvasLabel">
          {title}
        </h5>
        <CloseButton data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
      <div className="offcanvas-body pt-2">{children}</div>
    </div>
  );
}
