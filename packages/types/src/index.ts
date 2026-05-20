export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
}