'use client';

import Image from 'next/image';
import Link from 'next/link';
import { News } from '@prisma/client';

// Определение типа пропсов для компонента NewsCard
type NewsCardProps = {
  news: News;
};

// Компонент карточки новости
export default function NewsCard({ news }: NewsCardProps) {
  // Путь к изображению по умолчанию, если у новости нет своего изображения
  const defaultImage = '/images/default-news.jpg';

  return (
    // Обертка-ссылка для всей карточки
    <Link href={`/news/${news.slug}`} className="group">
      {/* Контейнер карточки с эффектами при наведении */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
        {/* Контейнер для изображения */}
        <div className="relative h-48">
          <Image
            src={news.imageUrl || defaultImage}
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Контейнер для заголовка и описания новости */}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {news.title}
          </h2>
          <p className="text-gray-600">
            {news.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
