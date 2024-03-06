function MenuItem({
  label,
  value,
  view,
}: {
  label: string;
  value: string;
  view: any[];
}) {
  return (
    <button
      className={`${
        view[0] === value
          ? "bg-neutral-800"
          : "bg-neutral-900 hover:bg-neutral-900"
      }  p-3 px-4  h-full`}
      onClick={() => view[1](value)}
    >
      {label}
    </button>
  );
}

export default MenuItem;
