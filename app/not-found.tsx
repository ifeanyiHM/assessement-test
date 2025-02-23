import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-7xl font-bold">404</h1>
      <p className="text-xl mt-2">Oops! Page not found.</p>
      <p className="text-gray-500 mt-2">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg shadow-md"
      >
        Go Home
      </Link>
    </div>
  );
}
