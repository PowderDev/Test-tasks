import { useEffect, useState } from "react"
import { normalizeContractDate } from "../../helpers"
import useFields from "../../helpers/useFields"
import { updateCompany } from "../../http/queries"
import { Company } from "../../types"
import SubTitle from "./SubTitle"

interface Props {
  companyInfo: Company | null
  setCompanyInfo: (val: Company) => void
}

const Info: React.FC<Props> = ({ companyInfo, setCompanyInfo }) => {
  const [isActive, setIsActive] = useState(false)
  const [setField, changedFields] = useFields<Company>(companyInfo)

  const handleActiveMode = () => {
    if (isActive && changedFields) {
      updateCompany(changedFields).then((data) => setCompanyInfo(data))
    }

    setIsActive(!isActive)
  }

  return (
    <div className="company__block">
      {companyInfo ? (
        <>
          <SubTitle text="ОБЩАЯ ИНФОРМАЦИЯ" onEditMode={handleActiveMode} />
          <div className="data-grid bottom-divider">
            <div className="data-grid__row">
              <label htmlFor="1">Полное название:</label>
              <input
                type="text"
                name="name"
                id="1"
                readOnly={!isActive}
                onChange={setField}
                defaultValue={companyInfo.name}
              />
            </div>
            <div className="data-grid__row">
              <label htmlFor="2">Договор:</label>
              <input
                type="text"
                name="no:issue_date"
                id="2"
                readOnly={!isActive}
                onChange={(e) => setField(e, " от ", "contract")}
                defaultValue={normalizeContractDate(companyInfo)}
              />
            </div>
            <div className="data-grid__row">
              <label htmlFor="3">Форма:</label>
              <input
                type="text"
                id="3"
                readOnly={!isActive}
                name="businessEntity"
                onChange={setField}
                defaultValue={companyInfo.businessEntity}
              />
            </div>
            <div className="data-grid__row">
              <label htmlFor="4">Тип:</label>
              <input
                type="text"
                id="4"
                readOnly={!isActive}
                name="type"
                onChange={(e) => setField(e, ",")}
                defaultValue={companyInfo.type.join(", ")}
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

export default Info
