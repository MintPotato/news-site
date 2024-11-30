import { prisma } from '@/lib/prisma';
import NewsCard from './components/NewsCard';

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic';

// Функция для получения всех новостей из базы данных
async function getNews() {
  const news = await prisma.news.findMany();
  return news;
}

// Главная страница сайта
export default async function Home() {
  // Получаем список всех новостей
  const news = await getNews();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка сайта */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Придумайте свое название
          </h1>
        </div>
      </header>

      {/* Основной контент */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Сетка новостей */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}