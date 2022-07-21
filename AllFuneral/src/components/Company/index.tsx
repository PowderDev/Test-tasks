import React, { useEffect, useState } from "react"
import { deleteCompany, getCompanyById, getContactById } from "../../http/queries"
import { Company as CompanyType, Contact as ContactType } from "../../types"
import Contact from "./Contact"
import Header from "./Header"
import Images from "./Images"
import Info from "./Info"
import MainTitle from "./MainTitle"
import Popup from "./Popup"

const Company = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyType | null>(null)
  const [contactInfo, setContactInfo] = useState<ContactType | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getCompanyById("12")
      .then((data) => {
        setCompanyInfo(data)
        getContactById(data.contactId)
          .then((data) => setContactInfo(data))
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
  }, [])

  const handleDelete = () => {
    if (companyInfo) {
      deleteCompany(companyInfo.id).then(() => setIsOpen(false))
    }
  }

  return (
    <div className="company">
      <Header onDeleteButton={() => setIsOpen(true)} />
      {companyInfo?.shortName && <MainTitle companyInfo={companyInfo} />}
      <Info companyInfo={companyInfo} setCompanyInfo={setCompanyInfo} />
      <Contact contactInfo={contactInfo} setContactInfo={setContactInfo} />
      {companyInfo?.photos.length! > 0 && <Images companyInfo={companyInfo!} />}
      {isOpen && <Popup onClose={() => setIsOpen(false)} onSubmit={handleDelete} />}
    </div>
  )
}

export default Company
