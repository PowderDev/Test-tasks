import $api from "."
import { Company, Contact, Image } from "../types"

export const changeCompanyTitle = async (companyId: string, title: string) => {
  try {
    await $api.patch<Contact>(`/companies/${companyId}`, { shortName: title })
  } catch (err) {
    console.error(err)
  }
}

export const getCompanyById = (companyId: string) => {
  return new Promise<Company>(async (resolve, reject) => {
    try {
      const { data } = await $api.get<Company>(`/companies/${companyId}`)
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

export const getContactById = (contactId: string) => {
  return new Promise<Contact>(async (resolve, reject) => {
    try {
      const { data } = await $api.get<Contact>(`/contacts/${contactId}`)
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

export const updateCompany = (company: Company) => {
  return new Promise<Company>(async (resolve, reject) => {
    try {
      const { data } = await $api.patch<Company>(`/companies/${company.id}`, company)
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

export const updateContact = (contact: Contact) => {
  return new Promise<Contact>(async (resolve, reject) => {
    try {
      const { data } = await $api.patch<Contact>(`/contacts/${contact.id}`, contact)
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

export const uploadImage = (companyId: string, file: File) => {
  return new Promise<Image>(async (resolve, reject) => {
    try {
      const fd = new FormData()
      fd.append("file", file)
      const { data } = await $api.post<Image>(`/companies/${companyId}/image`, fd)
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

export const deleteImage = async (companyId: string, name: string) => {
  try {
    await $api.delete(`/companies/${companyId}/image/${name}`)
  } catch (err) {
    console.error(err)
  }
}

export const deleteCompany = async (companyId: string) => {
  try {
    await $api.delete(`/companies/${companyId}`)
  } catch (err) {
    console.error(err)
  }
}
