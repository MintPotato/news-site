// Импорт необходимых компонентов и утилит
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Определение типа параметров страницы
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Компонент страницы отдельной новости
export default async function NewsPage({ params }: PageProps) {
  // Получаем slug из параметров URL
  const { slug } = await params;
  
  // Запрашиваем новость из базы данных по slug
  const news = await prisma.news.findUnique({
    where: { slug }
  });

  // Если новость не найдена, показываем страницу 404
  if (!news) {
    notFound();
  }

  // Путь к изображению по умолчанию
  const defaultImage = '/images/default-news.jpg';

  return (
    // Основной контейнер страницы
    <div className="min-h-screen bg-gray-50">
      {/* Верхняя панель с кнопкой возврата */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            ← Вернуться к списку новостей
          </Link>
        </div>
      </div>

      {/* Основной контент новости */}
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <article className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Контейнер для главного изображения новости */}
          <div className="relative h-64 w-full">
            <Image
              src={news.imageUrl && news.imageUrl.length > 0 ? news.imageUrl : defaultImage}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Контейнер для текстового содержимого */}
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-black">{news.title}</h1>
            <p className="text-black mb-4">{news.description}</p>
            <div className="prose max-w-none text-black">
              {news.content}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
