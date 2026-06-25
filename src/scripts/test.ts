import { PrismaClient } from '@prisma/client';
import config from '../../prisma.config.ts';
const prisma = new PrismaClient(config);
console.log('OK');
