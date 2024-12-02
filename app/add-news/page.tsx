'use client';

// Импорт необходимых хуков из React и Next.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Компонент страницы добавления новости
export default function AddNewsPage() {
  const router = useRouter();
  // Состояние для отслеживания процесса отправки формы
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Состояние для хранения данных формы
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
  });

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Предотвращаем повторную отправку формы
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Sending data:', formData);
      // Отправляем POST запрос на API endpoint
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      // При успешном создании новости перенаправляем на главную страницу
      if (data.success) {
        await router.push('/');
        router.refresh();
      } else {
        throw new Error(data.error || 'Failed to create news');
      }
    } catch (error) {
      console.error('Error adding news:', error);
      alert('Не удалось добавить новость. Пожалуйста, попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Обработчик изменения полей формы
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Рендер формы добавления новости
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-black mb-6">Добавить новость</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 bg-white shadow-sm rounded-lg p-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-black mb-2">
            Заголовок
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-black rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-black mb-2">
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-black rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-black mb-2">
            Содержание
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-3 py-2 border border-black rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-black mb-2">
            URL изображения
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-black rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Добавляется...' : 'Добавить новость'}
        </button>
      </form>
    </div>
  );
}
