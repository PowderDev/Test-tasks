import { Company, Contact } from "../types"

export const normalizeContractDate = (company: Company) => {
  const date = new Date(company.contract.issue_date)
  const day = date.getDay() > 9 ? date.getDay() : "0" + date.getDay()
  const month = date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth()
  const year = date.getFullYear()

  return `${company.contract.no} от ${day}.${month}.${year}`
}

export const normalizeFullName = (contact: Contact) => {
  return `${contact.lastname} ${contact.firstname} ${contact.patronymic}`
}
