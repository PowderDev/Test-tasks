import React, { useRef, useState } from "react"
import { deleteImage, uploadImage } from "../../http/queries"
import { Company } from "../../types"
import SubTitle from "./SubTitle"

interface Props {
  companyInfo: Company
}

const Images: React.FC<Props> = ({ companyInfo }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState(companyInfo.photos)

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const file = target.files?.[0]!
    uploadImage(companyInfo.id, file).then((newImage) => {
      setImages((prev) => [...prev, newImage])
    })
  }

  const handleImageDelete = (name: string) => {
    deleteImage(companyInfo.id, name).then(() => {
      setImages((prev) => prev.filter((i) => i.name !== name))
    })
  }

  return (
    <div className="company__block">
      <SubTitle text="ПРИЛОЖЕННЫЕ ФОТО" editMode={false} />
      <div className="bottom-divider">
        <div className="image-list">
          {images.map((image) => (
            <div className="image-list__item" key={image.name}>
              <img src={image.thumbpath} />
              <p>{image.name}</p>
              <small>11 июня 2018</small>
              <span className="close_btn" onClick={() => handleImageDelete(image.name)}>
                <img src="/assets/Close_menu.svg" alt="" />
              </span>
            </div>
          ))}
        </div>
        <button onClick={() => inputRef.current?.click()} className="add-image-button">
          <img src="/assets/Common/Action/Add.svg" alt="Add" />
          <span className="text-green">ДОБАВИТЬ ИЗОБРАЖЕНИЕ</span>
        </button>
      </div>
      <input type="file" hidden ref={inputRef} onChange={handleInputChange} />
    </div>
  )
}

export default Images
