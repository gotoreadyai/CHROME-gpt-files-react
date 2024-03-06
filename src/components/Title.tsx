function Title({ title, description }: any) {
  return (
    <div className="bg-neutral-800 p-4 flex-1">
      <p className="text-neutral-400">{description}</p>
      <h1 className="text-lg">{title}</h1>
    </div>
  );
}

export default Title;
