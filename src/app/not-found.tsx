export default function NotFound() {
  return (
    <div className="min-h-[320px] flex flex-col items-center justify-center bg-slate-100 mb-24 p-8 rounded-4xl">
      <h1 className="text-6xl/normal font-extrabold text-slate-900">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-slate-400">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
