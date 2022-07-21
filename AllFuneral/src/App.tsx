import Company from "./components/Company"
import Footer from "./components/UI/Footer"
import SideMenu from "./components/UI/SideMenu"
import SidePanel from "./components/UI/SidePanel"

function App() {
  return (
    <>
      <main>
        <SideMenu />
        <SidePanel />
        <Company />
      </main>
      <Footer />
    </>
  )
}

export default App
