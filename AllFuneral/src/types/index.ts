import React from "react"

export interface Company {
  id: string
  contactId: string
  name: string
  shortName: string
  businessEntity: string
  contract: {
    no: string
    issue_date: string
  }
  type: string[]
  photos: Image[]
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  lastname: string
  firstname: string
  patronymic: string
  phone: string
  email: string
}

export interface Image {
  name: string
  filepath: string
  thumbpath: string
}

export type UseFieldsReturn<T> = [
  (event: React.ChangeEvent<HTMLInputElement>, divider?: string, targetField?: string) => void,
  T | null
]
