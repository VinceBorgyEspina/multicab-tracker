'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Multicabs
export async function getMulticabs() {
  return prisma.multicab.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function addMulticab(formData: FormData) {
  const plateNumber = formData.get('plateNumber') as string
  const driverName = formData.get('driverName') as string

  await prisma.multicab.create({
    data: { plateNumber, driverName }
  })
  revalidatePath('/multicabs')
  revalidatePath('/')
}

export async function deleteMulticab(id: string) {
  await prisma.multicab.delete({ where: { id } })
  revalidatePath('/multicabs')
  revalidatePath('/')
}

// Boundaries
export async function getBoundaries() {
  return prisma.boundary.findMany({ 
    include: { multicab: true },
    orderBy: { date: 'desc' } 
  })
}

export async function addBoundary(formData: FormData) {
  const multicabId = formData.get('multicabId') as string
  const amount = parseFloat(formData.get('amount') as string)
  const date = new Date(formData.get('date') as string)
  const type = formData.get('type') as string

  await prisma.boundary.create({
    data: { multicabId, amount, date, type }
  })
  revalidatePath('/boundaries')
  revalidatePath('/')
}

export async function deleteBoundary(id: string) {
  await prisma.boundary.delete({ where: { id } })
  revalidatePath('/boundaries')
  revalidatePath('/')
}

// Expenses
export async function getExpenses() {
  return prisma.expense.findMany({ 
    include: { multicab: true },
    orderBy: { date: 'desc' } 
  })
}

export async function addExpense(formData: FormData) {
  const multicabId = formData.get('multicabId') as string
  const amount = parseFloat(formData.get('amount') as string)
  const description = formData.get('description') as string
  const date = new Date(formData.get('date') as string)

  await prisma.expense.create({
    data: { multicabId, amount, description, date }
  })
  revalidatePath('/expenses')
  revalidatePath('/')
}

export async function deleteExpense(id: string) {
  await prisma.expense.delete({ where: { id } })
  revalidatePath('/expenses')
  revalidatePath('/')
}

// Rest Days
export async function getRestDays() {
  return prisma.restDay.findMany({ 
    include: { multicab: true },
    orderBy: { date: 'desc' } 
  })
}

export async function addRestDay(formData: FormData) {
  const multicabId = formData.get('multicabId') as string
  const date = new Date(formData.get('date') as string)
  const reason = formData.get('reason') as string

  await prisma.restDay.create({
    data: { multicabId, date, reason }
  })
  revalidatePath('/rest-days')
}

export async function deleteRestDay(id: string) {
  await prisma.restDay.delete({ where: { id } })
  revalidatePath('/rest-days')
}

// Dashboard Stats
export async function getDashboardStats() {
  const [boundaries, expenses, multicabsCount] = await Promise.all([
    prisma.boundary.aggregate({ _sum: { amount: true } }),
    prisma.expense.aggregate({ _sum: { amount: true } }),
    prisma.multicab.count()
  ])

  const totalRevenue = boundaries._sum.amount || 0
  const totalExpenses = expenses._sum.amount || 0
  const netIncome = totalRevenue - totalExpenses

  return {
    totalRevenue,
    totalExpenses,
    netIncome,
    multicabsCount
  }
}
