// Импорт необходимых зависимостей
import { Hono } from 'hono'
import { prisma } from '@/lib/prisma'

// Создание экземпляра приложения Hono
const app = new Hono()

// GET /api/news/[slug] - получение конкретной новости по slug
app.get('/:slug', async (c) => {
  try {
    // Получаем slug из параметров запроса
    const slug = c.req.param('slug')
    // Ищем новость в базе данных по slug
    const news = await prisma.news.findUnique({
      where: { slug },
    })

    // Если новость не найдена, возвращаем 404
    if (!news) {
      return c.json({ error: 'News not found' }, 404)
    }

    return c.json(news)
  } catch (_error) {
    return c.json({ error: 'Failed to fetch news' }, 500)
  }
})

// PUT /api/news/[slug] - обновление существующей новости
app.put('/:slug', async (c) => {
  try {
    // Получаем slug из параметров и данные из тела запроса
    const slug = c.req.param('slug')
    const body = await c.req.json()
    
    // Обновляем новость в базе данных
    const news = await prisma.news.update({
      where: { slug },
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        imageUrl: body.imageUrl,
      },
    })

    return c.json(news)
  } catch (_error) {
    return c.json({ error: 'Failed to update news' }, 500)
  }
})

// DELETE /api/news/[slug] - удаление новости
app.delete('/:slug', async (c) => {
  try {
    // Получаем slug из параметров запроса
    const slug = c.req.param('slug')
    // Удаляем новость из базы данных
    await prisma.news.delete({
      where: { slug },
    })

    return c.json({ message: 'News deleted successfully' })
  } catch (_error) {
    return c.json({ error: 'Failed to delete news' }, 500)
  }
})

// Экспорт обработчиков для Next.js API routes
export const GET = async (req: Request) => app.fetch(req)
export const PUT = async (req: Request) => app.fetch(req)
export const DELETE = async (req: Request) => app.fetch(req)
