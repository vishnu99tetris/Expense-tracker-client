export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="spinner"></div>
      <p className="text-sm text-muted animate-pulse">Loading...</p>
    </div>
  );
}
