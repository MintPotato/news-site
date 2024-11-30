import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import slugify from 'slugify'

// GET /api/news - получение списка всех новостей
export async function GET() {
  try {
    // Получаем все новости, сортируя по дате (сначала новые)
    const news = await prisma.news.findMany({
      orderBy: {
        id: 'desc',
      },
    })
    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

// POST /api/news - создание новой новости
export async function POST(request: Request) {
  try {
    // Логируем начало обработки запроса
    console.log('Starting POST request processing')

    // Получаем и логируем тело запроса
    const body = await request.json()
    console.log('Received request body:', body)

    // Проверяем наличие необходимых полей
    if (!body.title || !body.description || !body.content) {
      console.error('Missing required fields')
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { title, description, content, imageUrl } = body

    // Логируем создание slug
    console.log('Creating slug from title:', title)
    const slug = slugify(title, {
      lower: true,
      strict: true,
      locale: 'ru'
    })
    console.log('Generated slug:', slug)

    // Логируем попытку создания записи
    console.log('Attempting to create news entry with data:', {
      title,
      description,
      content,
      imageUrl,
      slug
    })

    const news = await prisma.news.create({
      data: {
        title,
        description,
        content,
        imageUrl: imageUrl || '',
        slug,
      },
    })

    console.log('Successfully created news entry:', news)

    return NextResponse.json({ success: true, data: news }, { status: 201 })
  } catch (error) {
    // Подробное логирование ошибки
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    })

    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Новость с таким заголовком уже существует' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create news' },
      { status: 500 }
    )
  }
}
