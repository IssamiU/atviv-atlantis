import { useState } from 'react'
import CadastroClienteTitular from '../componentes/cadastro/cadastroClienteTitular'
import CadastroClienteDependente from '../componentes/cadastro/cadastroClienteDependente'
import EditarCliente from '../componentes/cadastro/editarCliente'
import ExcluirCliente from '../componentes/cadastro/excluirCliente'
import CadastroHospedagem from '../componentes/cadastro/cadastroHospedagem'

function MenuCliente() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null)

  const renderizarOpcao = () => {
    switch (opcaoSelecionada) {
      case 'titular':
        return <CadastroClienteTitular />
      case 'dependente':
        return <CadastroClienteDependente />
      case 'editar':
        return <EditarCliente />
      case 'excluir':
        return <ExcluirCliente />
      case 'hospedagem':
        return <CadastroHospedagem />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!opcaoSelecionada ? (
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Gerenciamento de Clientes e Hospedagens
          </h1>
          
          <div className="grid md:grid-cols-2 gap-4">
            <button 
              onClick={() => setOpcaoSelecionada('titular')}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cadastrar Cliente Titular
              </h3>
              <p className="text-sm text-gray-600">
                Cadastre novos clientes titulares no sistema
              </p>
            </button>
            
            <button 
              onClick={() => setOpcaoSelecionada('dependente')}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cadastrar Cliente Dependente
              </h3>
              <p className="text-sm text-gray-600">
                Adicione dependentes aos clientes titulares
              </p>
            </button>
            
            <button 
              onClick={() => setOpcaoSelecionada('editar')}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Editar Cliente
              </h3>
              <p className="text-sm text-gray-600">
                Atualize as informações dos clientes
              </p>
            </button>

            <button 
              onClick={() => setOpcaoSelecionada('excluir')}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-500 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Excluir Cliente
              </h3>
              <p className="text-sm text-gray-600">
                Remova clientes do sistema
              </p>
            </button>

            <button 
              onClick={() => setOpcaoSelecionada('hospedagem')}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500 text-left md:col-span-2"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cadastrar Hospedagem
              </h3>
              <p className="text-sm text-gray-600">
                Registre novas hospedagens para os clientes
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

export default MenuCliente