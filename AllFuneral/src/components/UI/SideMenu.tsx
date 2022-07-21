import React from "react"

const SideMenu = () => {
  return (
    <aside className="side-menu">
      <div className="side-menu__block">
        <div className="side-menu__icon-container">
          <img src="/assets/Home.svg" alt="Home" />
        </div>
        <div className="side-menu__icon-container">
          <img src="/assets/Market.svg" alt="Market" />
        </div>
        <div className="side-menu__icon-container">
          <img src="/assets/Search.svg" alt="Search" />
        </div>
      </div>
      <div className="side-menu__block">
        <div className="side-menu__icon-container">
          <img src="/assets/Settings.svg" alt="Settings" />
        </div>
        <div className="side-menu__icon-container">
          <img src="/assets/Chat.svg" alt="Chat" />
        </div>
        <div className="side-menu__icon-container">
          <img src="/assets/Exit.svg" alt="Exit" />
        </div>
      </div>
    </aside>
  )
}

export default SideMenu
