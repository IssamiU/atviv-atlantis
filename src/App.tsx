import { useState } from 'react'
import './App.css'
import Navbar from './componentes/Navbar'
import Home from './home' 
import MenuCliente from './menus/menuCliente'
import MenuListagem from './menus/menuListagem'

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home')

  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'home':
        return <Home />
      case 'cliente':
        return <MenuCliente />
      case 'listagem':
        return <MenuListagem />
      default:
        return <Home />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setPagina={setPaginaAtual} />
      <main className="container mx-auto px-4 py-8">
        {renderizarPagina()}
      </main>
    </div>
  )
}

export default App