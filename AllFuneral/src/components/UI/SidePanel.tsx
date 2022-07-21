import React from "react"

const SidePanel = () => {
  return (
    <section className="side-panel">
      <header className="side-panel__header">
        <h2>ЧЕСТНЫЙ АГЕНТ</h2>
        <span>МЕНЕДЖЕР ПРОЦЕССА</span>
      </header>

      <div>
        <div className="side-panel__list-item">
          <img src="/assets/Building.svg" alt="" />
          <p className="text-green">Организации</p>
        </div>
      </div>

      <div className="side-panel__shadow"></div>
    </section>
  )
}

export default SidePanel
