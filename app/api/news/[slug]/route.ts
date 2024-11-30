import { Hono } from 'hono'
import { prisma } from '@/lib/prisma'

const app = new Hono()

app.get('/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const news = await prisma.news.findUnique({
      where: { slug },
    })

    if (!news) {
      return c.json({ error: 'News not found' }, 404)
    }

    return c.json(news)
  } catch (_error) {
    return c.json({ error: 'Failed to fetch news' }, 500)
  }
})

app.put('/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const body = await c.req.json()
    
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

app.delete('/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    await prisma.news.delete({
      where: { slug },
    })

    return c.json({ message: 'News deleted successfully' })
  } catch (_error) {
    return c.json({ error: 'Failed to delete news' }, 500)
  }
})

export const GET = async (req: Request) => app.fetch(req)
export const PUT = async (req: Request) => app.fetch(req)
export const DELETE = async (req: Request) => app.fetch(req)
