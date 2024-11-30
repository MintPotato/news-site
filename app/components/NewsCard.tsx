'use client';

import Image from 'next/image';
import Link from 'next/link';
import { News } from '@prisma/client';

// Тип для пропсов компонента NewsCard
type NewsCardProps = {
  news: News;
};

// Компонент карточки новости
export default function NewsCard({ news }: NewsCardProps) {
  // Дефолтное изображение для новостей
  const defaultImage = '/images/default-news.jpg';

  return (
    <Link href={`/news/${news.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
        {/* Изображение новости */}
        <div className="relative h-48">
          <Image
            src={news.imageUrl || defaultImage}
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Текстовый контент */}
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
