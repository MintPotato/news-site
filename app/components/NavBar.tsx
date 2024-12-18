import Link from 'next/link';

export default function NavBar() {
  return (
    // Контейнер навигационной панели
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Ссылка на главную страницу */}
        <Link href="/" className="text-xl font-bold">
          Основная страница
        </Link>
        {/* Кнопка добавления новой новости */}
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
