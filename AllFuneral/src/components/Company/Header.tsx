import React from "react"

interface Props {
  onDeleteButton: () => void
}

const Header: React.FC<Props> = ({ onDeleteButton }) => {
  return (
    <div className="header bottom-divider">
      <div className="header__block">
        <img src="/assets/Common/Arrows/Long.svg" />
        <p className="text-green">К СПИСКУ ЮРИДИЧЕСКИХ ЛИЦ</p>
      </div>
      <div className="header__block">
        <img src="/assets/Common/Linked.svg" alt="Linked" />
        <img src="/assets/Common/Arrows/Rotation.svg" alt="Reload" />
        <img src="/assets/Common/Action/Delete.svg" alt="Delete" onClick={onDeleteButton} />
      </div>
    </div>
  )
}

export default Header
