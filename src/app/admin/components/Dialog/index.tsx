type DialogProps = {};

export function Dialog({}: DialogProps) {
  return (
    <section className="fixed z-50 inset-0 bg-black/60 backdrop:backdrop-blur-xs flex items-center justify-center">
      <div className="bg-slate-50 p-6 rounded-lg max-w-2xl mx-6 flex flex-col gap-6">
        <h3 className="text-xl font-extrabold"> Title Page</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          eligendi nisi eum labore, officiis inventore, ab repellendus sunt odio
          dicta hic libero numquam quis vero placeat harum repellat ipsam at.
        </p>
        <div className="flex items-center justify-around">
          <button
            autoFocus
            className="bg-slate-200 hover:bg-slate-300 transition text-slate-950 flex items-center justify-center py-2 px 4 rounded-lg cursor-pointer border-none"
          >
            Cancelar
          </button>
          <button className="bg-green-200 hover:bg-green-300 transition text-slate-50 flex items-center justify-center py-2 px 4 rounded-lg cursor-pointer border-none">
            Ok
          </button>
        </div>
      </div>
    </section>
  );
}
