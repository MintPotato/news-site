import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Основная страница
        </Link>
        <Link
          href="/add-news"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
        >
          Добавить новость
        </Link>
      </div>
    </nav>
  );
}
