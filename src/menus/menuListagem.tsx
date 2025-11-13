import { useState } from 'react'
import ListagemCliente from '../componentes/listagem/listagemCliente'
import ListagemAcomodacao from '../componentes/listagem/listagemAcomodacao'
import ListagemHospedagem from '../componentes/listagem/listagemHospedagem'

function MenuListagem() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null)

  const renderizarOpcao = () => {
    switch (opcaoSelecionada) {
      case 'clientes':
        return <ListagemCliente />
      case 'acomodacoes':
        return <ListagemAcomodacao />
      case 'hospedagens':
        return <ListagemHospedagem />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!opcaoSelecionada ? (
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Consultas e Relatórios
          </h1>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button 
              onClick={() => setOpcaoSelecionada('clientes')}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Clientes
              </h3>
              <p className="text-sm text-gray-600">
                Visualize todos os clientes cadastrados
              </p>
            </button>
            
            <button 
              onClick={() => setOpcaoSelecionada('acomodacoes')}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Acomodações
              </h3>
              <p className="text-sm text-gray-600">
                Veja as acomodações disponíveis
              </p>
            </button>
            
            <button 
              onClick={() => setOpcaoSelecionada('hospedagens')}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hospedagens
              </h3>
              <p className="text-sm text-gray-600">
                Consulte as hospedagens registradas
              </p>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button 
            onClick={() => setOpcaoSelecionada(null)}
            className="mb-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors inline-flex items-center gap-2"
          >
            <span>&larr;</span> Voltar
          </button>
          {renderizarOpcao()}
        </div>
      )}
    </div>
  )
}

export default MenuListagem