export const InfoBox = (({ title, children }) => {
  return (
    <>
      <h6 className="px-3 display-6 text-dark text-center mb-2">{title}</h6>
      <div
        className="shadow-lg p-2 rounded-3 border overflow-auto"
        style={{ height: '35vh', minHeight: '300px' }}>
        {children}
      </div>
    </>
  );
}) as React.FC<{ title: string }>;

export const InfoBoxColumn = (({ title, size, children }) => {
  return (
    <section className={`col-12 col-${size} mt-3`}>
      <InfoBox title={title}>{children}</InfoBox>
    </section>
  );
}) as React.FC<{ title: string; size: string }>;
