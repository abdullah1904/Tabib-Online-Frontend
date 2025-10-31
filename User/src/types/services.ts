export interface Service {
  id: number
  title: string
  type: number
  price: number
  duration: number
  time: string
  location: string | null
  doctor: number
  createdAt: string
  updatedAt: string
  availableDays: number[]
}