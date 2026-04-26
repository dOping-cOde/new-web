import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-xl">
      <p className="text-caption text-text-muted mb-lg">404</p>
      <h1 className="text-display-md mb-lg">Page not found</h1>
      <p className="text-body text-text-muted mb-2xl">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="text-body font-medium text-accent hover:text-accent-hover transition-colors duration-fast"
      >
        Back to home
      </Link>
    </div>
  );
}
