import { PrismaClient } from '@prisma/client'
import { mockDeep, MockProxy } from 'jest-mock-extended'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockDeep<PrismaClient>()),
}))

let prisma: MockProxy<PrismaClient>

describe('Task DB Testing', () => {
  beforeEach(() => {
    prisma = new PrismaClient() as unknown as MockProxy<PrismaClient>
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create a new task', () => {
    it('should create a new task', async () => {
      const taskTempTest = {
        id: '1',
        name: 'New Task',
        description: 'New Task Description',
        label: ['personal', 'work'],
        isDone: false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      ;(prisma.task.create as jest.Mock).mockResolvedValueOnce(taskTempTest)

      const result = await prisma.task.create({
        data: {
          name: 'New Task',
          label: ['personal', 'work'],
          description: 'New Task Description',
        },
      })

      expect(result).toEqual(taskTempTest)
    })
  })

  describe('get all tasks', () => {
    it('should return all tasks', async () => {
      const taskTempTests = [
        { id: '1', name: 'Task 1' },
        { id: '2', name: 'Task 2' },
      ]
      ;(prisma.task.findMany as jest.Mock).mockResolvedValueOnce(taskTempTests)

      const result = await prisma.task.findMany()
      expect(result).toEqual(taskTempTests)
    })
  })

  describe('soft Delete All Active Tasks', () => {
    it('should soft delete all active tasks', async () => {
      ;(prisma.task.updateMany as jest.Mock).mockResolvedValueOnce({ count: 2 })

      const result = await prisma.task.updateMany({
        data: { isDeleted: true },
        where: { isDone: false },
      })

      expect(result).toEqual({ count: 2 })
    })
  })

  describe('hard Delete All Tasks', () => {
    it('should delete tasks older than a week', async () => {
      ;(prisma.task.deleteMany as jest.Mock).mockResolvedValueOnce({ count: 5 })

      const result = await prisma.task.deleteMany({
        where: {
          isDeleted: true,
          updatedAt: {
            lt: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
      })

      expect(result).toEqual({ count: 5 })
    })
  })
})
