type NavbarProps = {
  setPagina: (pagina: string) => void
}

function Navbar({ setPagina }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Hotel Atlantis</h1>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setPagina('home')}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Início
            </button>
            <button 
              onClick={() => setPagina('cliente')} 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Cadastro
            </button>
            <button 
              onClick={() => setPagina('listagem')} 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Listagem
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar