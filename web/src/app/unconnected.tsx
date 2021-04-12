export default function Unconnected() {
  return (
    <div className="d-flex">
      <figure className="alert m-5 mb-0 w-100 text-center border-2 alert-danger text-center">
        <blockquote className="blockquote mb-1">
          <p>We were disconnected from the server.</p>
        </blockquote>
        <figcaption>
          Trying to <em>reconnect</em>...
        </figcaption>
      </figure>
    </div>
  );
}
