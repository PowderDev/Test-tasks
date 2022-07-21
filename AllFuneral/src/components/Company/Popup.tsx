import React from "react"

interface Props {
  onClose: () => void
  onSubmit: () => void
}

const Popup: React.FC<Props> = ({ onClose, onSubmit }) => {
  return (
    <>
      <div className="bg-shadow"></div>
      <div className="popup">
        <h4>Удалить карточку</h4>
        <p>Отправить карточку организации в архив</p>
        <div className="popup__buttons">
          <button onClick={onClose}>Отмена</button>
          <button onClick={onSubmit} className="text-green">
            Удалить
          </button>
        </div>
      </div>
    </>
  )
}

export default Popup
