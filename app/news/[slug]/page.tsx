import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Определяем тип параметров страницы
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Компонент страницы отдельной новости
export default async function NewsPage({ params }: PageProps) {
  // Получаем параметры
  const { slug } = await params;
  
  // Получаем данные новости из базы
  const news = await prisma.news.findUnique({
    where: { slug }
  });

  // Если новость не найдена, показываем 404 страницу
  if (!news) {
    notFound();
  }

  // Дефолтное изображение для новостей
  const defaultImage = '/images/default-news.jpg';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка с кнопкой возврата */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            ← Вернуться к списку новостей
          </Link>
        </div>
      </div>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <article className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Контейнер для изображения */}
          <div className="relative h-64 w-full">
            <Image
              src={news.imageUrl && news.imageUrl.length > 0 ? news.imageUrl : defaultImage}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Контейнер для текста новости */}
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
