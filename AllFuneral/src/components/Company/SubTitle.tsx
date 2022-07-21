import React from "react"

interface Props {
  text: string
  editMode?: boolean
  onEditMode?: () => void
}

const SubTitle: React.FC<Props> = ({ text, editMode = true, onEditMode }) => {
  return (
    <div className="title">
      <h4>{text}</h4>
      {editMode && <img src="/assets/Common/Action/Edit.svg" alt="Edit" onClick={onEditMode} />}
    </div>
  )
}

export default SubTitle
