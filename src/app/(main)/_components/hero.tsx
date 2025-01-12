export default function Hero() {
  return (
    <section className="relative h-64 overflow-hidden rounded-md bg-secondary">
      <img
        src="https://images.unsplash.com/photo-1524721696987-b9527df9e512?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="absolute z-0 h-full w-full object-cover brightness-75"
      />
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-center">
        <h1 className="max-w-lg font-playfairDisplay text-xl font-semibold text-white md:text-2xl lg:text-3xl">
          Find the developer job you desire without much hassle.
        </h1>
      </div>
    </section>
  );
}
