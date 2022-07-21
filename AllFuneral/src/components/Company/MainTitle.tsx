import React, { useEffect, useState } from "react"
import { changeCompanyTitle } from "../../http/queries"
import { Company } from "../../types"

interface Props {
  companyInfo: Company
  editMode?: boolean
}

const MainTitle: React.FC<Props> = ({ companyInfo, editMode = true }) => {
  const [isActive, setIsActive] = useState(false)
  const [title, setTitle] = useState(companyInfo.shortName)

  useEffect(() => {
    if (!isActive && title && title !== companyInfo.shortName) {
      handleChangeSubmission()
    }
  }, [isActive])

  const handleActiveModeChange = () => setIsActive(!isActive)
  const handleChangeSubmission = () => {
    changeCompanyTitle(companyInfo.id, title).then(() => setIsActive(false))
  }

  return (
    <div className="title">
      {!isActive ? (
        <h3>{title}</h3>
      ) : (
        <>
          <label htmlFor={"title"}>Title label</label>
          <input
            type="text"
            id={"title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </>
      )}
      {editMode && (
        <img src="/assets/Common/Action/Edit.svg" alt="Edit" onClick={handleActiveModeChange} />
      )}
    </div>
  )
}

export default MainTitle
