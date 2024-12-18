import { prisma } from '@/lib/prisma';
import NewsCard from './components/NewsCard';

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic';

// Функция для получения списка всех новостей из базы данных
async function getNews() {
  const news = await prisma.news.findMany();
  return news;
}

// Компонент главной страницы
export default async function Home() {
  // Получаем актуальный список новостей
  const news = await getNews();

  return (
    // Основной контейнер страницы
    <div className="min-h-screen bg-gray-50">
      {/* Верхняя панель с заголовком сайта */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Придумайте свое название
          </h1>
        </div>
      </header>

      {/* Основной контент с сеткой новостей */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Сетка новостей */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Отображаем карточку для каждой новости */}
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}