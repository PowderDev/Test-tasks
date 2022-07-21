import React, { useState } from "react"
import { normalizeFullName } from "../../helpers"
import useFields from "../../helpers/useFields"
import { updateContact } from "../../http/queries"
import { Contact as ContactType } from "../../types"
import SubTitle from "./SubTitle"

interface Props {
  contactInfo: ContactType | null
  setContactInfo: (val: ContactType) => void
}

const Contact: React.FC<Props> = ({ contactInfo, setContactInfo }) => {
  const [isActive, setIsActive] = useState(false)
  const [setField, changedFields] = useFields<ContactType>(contactInfo)

  const handleActiveMode = () => {
    if (isActive && changedFields) {
      updateContact(changedFields).then((data) => setContactInfo(data))
    }

    setIsActive(!isActive)
  }

  return (
    <div className="company__block">
      {contactInfo ? (
        <>
          <SubTitle text="КОНТАКТНЫЕ ДАННЫЕ" onEditMode={handleActiveMode} />
          <div className="data-grid bottom-divider">
            <div className="data-grid__row">
              <label htmlFor="11">ФИО:</label>
              <input
                type="text"
                id="11"
                readOnly={!isActive}
                name="lastname:firstname:patronymic"
                onChange={(e) => setField(e, " ")}
                defaultValue={normalizeFullName(contactInfo)}
              />
            </div>
            <div className="data-grid__row">
              <label htmlFor="22">Телефон:</label>
              <input
                type="text"
                id="22"
                readOnly={!isActive}
                name="phone"
                onChange={setField}
                defaultValue={contactInfo.phone}
              />
            </div>
            <div className="data-grid__row">
              <label htmlFor="33">Эл. почта:</label>
              <input
                type="text"
                id="33"
                readOnly={!isActive}
                name="email"
                className="text-green"
                onChange={setField}
                defaultValue={contactInfo.email}
              />
            </div>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default Contact
