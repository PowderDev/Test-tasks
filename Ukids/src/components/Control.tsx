import React from "react"

interface Props {
  label: string
  items: string[]
  onChange: (src: string) => void
}

const Control: React.FC<Props> = ({ onChange, items, label }) => {
  return (
    <div className="control">
      <h3>{label}</h3>
      <div className="items-container">
        {items.map((src) => (
          <div className="control-item" key={src} onClick={() => onChange(src)}>
            <img src={src} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Control
