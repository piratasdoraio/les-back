import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended'

import prisma from './modules/db'

jest.mock('./modules/db', () => ({
  __esModule: true,
  default: mockDeep(PrismaClient),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma