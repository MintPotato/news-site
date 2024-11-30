import { PrismaClient } from '@prisma/client';

// Создаем глобальную переменную для хранения экземпляра PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Создаем или используем существующий экземпляр PrismaClient
export const prisma = globalForPrisma.prisma || new PrismaClient();

// В режиме разработки сохраняем экземпляр в глобальной переменной
// чтобы избежать создания множества подключений при hot-reload
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
