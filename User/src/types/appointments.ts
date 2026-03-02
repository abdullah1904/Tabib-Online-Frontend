import { Consultation } from "./consultations"
import { ProfessionalInfo } from "./users"

export interface Appointment {
  id: string
  appointmentDate: string
  appointmentTime: string
  additionalNotes: string
  healthInfoSharingConsent: boolean
  status: number
  totalPrice: number
  createdAt: string
  updatedAt: string
  doctor: {
    id: string
    fullName: string
    email: string
    phoneNumber: string
    imageURL: string | null
    professionalInfo: ProfessionalInfo
  }
  user: {
    id: string
    fullName: string
    email: string
    phoneNumber: string
    imageURL: string | null
  }
  consultation: Consultation
}