export const dynamic = "force-dynamic";

export const dynamic = "force-dynamic";

export const dynamic = "force-dynamic";

export const dynamic = "force-dynamic";

export const dynamic = "force-dynamic";

export const dynamic = "force-dynamic";

'use client'

import { useState, useEffect } from 'react'
import { LogOut, CheckCircle, Printer, TrendingUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Order } from '@/lib/types'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders()
      
      // Atualizar pedidos a cada 10 segundos
      const interval = setInterval(loadOrders, 10000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single()

      if (error || !data) {
        setError('Usuário ou senha incorretos')
      } else {
        setIsAuthenticated(true)
      }
    } catch (err) {
      setError('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao carregar pedidos:', error)
      } else {
        setOrders(data || [])
      }
    } catch (err) {
      console.error('Erro:', err)
    }
  }

  const updateOrderStatus = async (orderId: number, newStatus: 'pending' | 'completed') => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) {
        console.error('Erro ao atualizar status:', error)
      } else {
        // Se concluído, adicionar à tabela sales
        if (newStatus === 'completed') {
          const order = orders.find(o => o.id === orderId)
          if (order) {
            await supabase
              .from('sales')
              .insert([
                {
                  order_id: orderId,
                  total: order.total
                }
              ])
          }
        }
        loadOrders()
      }
    } catch (err) {
      console.error('Erro:', err)
    }
  }

  const printReceipt = (order: Order) => {
    setSelectedOrder(order)
    setTimeout(() => {
      window.print()
    }, 100)
  }

  const getTotalSales = () => {
    return orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + Number(o.total), 0)
  }

  const getPendingOrders = () => {
    return orders.filter(o => o.status === 'pending').length
  }

  const getCompletedOrders = () => {
    return orders.filter(o => o.status === 'completed').length
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-700 via-red-600 to-black flex items-center justify-center p-4">
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 max-w-md w-full shadow-2xl border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Painel Admin</h1>
          <p className="text-gray-400 text-center mb-8">Ponto Certo</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl no-print">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Painel Administrativo</h1>
              <p className="text-sm text-red-100">Ponto Certo</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="bg-gradient-to-b from-gray-900 to-black py-8 no-print">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-semibold">Pedidos Pendentes</p>
                  <p className="text-4xl font-bold text-white mt-2">{getPendingOrders()}</p>
                </div>
                <div className="bg-yellow-500/30 p-3 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-semibold">Pedidos Concluídos</p>
                  <p className="text-4xl font-bold text-white mt-2">{getCompletedOrders()}</p>
                </div>
                <div className="bg-green-500/30 p-3 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-semibold">Total em Vendas</p>
                  <p className="text-4xl font-bold text-white mt-2">R$ {getTotalSales().toFixed(2)}</p>
                </div>
                <div className="bg-red-500/30 p-3 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-8 no-print">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Pedidos em Tempo Real</h2>
          
          {orders.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
              <p className="text-gray-400 text-lg">Nenhum pedido ainda</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div
                  key={order.id}
                  className={`bg-gradient-to-br rounded-xl p-6 shadow-2xl border transition-all duration-300 hover:scale-[1.02] ${
                    order.status === 'pending'
                      ? 'from-yellow-900/30 to-yellow-800/30 border-yellow-600'
                      : 'from-green-900/30 to-green-800/30 border-green-600'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">Pedido #{order.id}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === 'pending'
                              ? 'bg-yellow-500 text-black'
                              : 'bg-green-500 text-white'
                          }`}
                        >
                          {order.status === 'pending' ? 'Pendente' : 'Concluído'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.created_at || '').toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id!, 'completed')}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Concluir
                        </button>
                      )}
                      <button
                        onClick={() => printReceipt(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2"
                      >
                        <Printer className="w-4 h-4" />
                        Imprimir
                      </button>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Cliente:</p>
                        <p className="text-white font-semibold">{order.customer_name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Telefone:</p>
                        <p className="text-white font-semibold">{order.customer_phone}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-gray-400">Endereço:</p>
                        <p className="text-white font-semibold">{order.customer_address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-3 font-semibold">Itens do Pedido:</p>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-white">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-yellow-400 font-bold">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between items-center">
                      <span className="text-white font-bold text-lg">Total:</span>
                      <span className="text-yellow-400 font-bold text-2xl">
                        R$ {Number(order.total).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Print Receipt */}
      {selectedOrder && (
        <div className="print-area hidden">
          <div style={{ padding: '20px', fontFamily: 'monospace', maxWidth: '300px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '18px' }}>
              PONTO CERTO
            </h2>
            <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '12px' }}>
              Lanchonete e Pizzaria
            </p>
            
            <div style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '10px 0', marginBottom: '10px' }}>
              <p style={{ margin: '5px 0' }}>Pedido: #{selectedOrder.id}</p>
              <p style={{ margin: '5px 0' }}>
                Data: {new Date(selectedOrder.created_at || '').toLocaleString('pt-BR')}
              </p>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <p style={{ margin: '5px 0' }}><strong>Cliente:</strong> {selectedOrder.customer_name}</p>
              <p style={{ margin: '5px 0' }}><strong>Telefone:</strong> {selectedOrder.customer_phone}</p>
              <p style={{ margin: '5px 0' }}><strong>Endereco:</strong> {selectedOrder.customer_address}</p>
            </div>

            <div style={{ borderTop: '1px dashed #000', paddingTop: '10px', marginBottom: '10px' }}>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>ITENS:</p>
              {selectedOrder.items.map((item, index) => (
                <div key={index} style={{ margin: '5px 0' }}>
                  <p>{item.quantity}x {item.name}</p>
                  <p style={{ textAlign: 'right' }}>R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '2px solid #000', paddingTop: '10px', marginTop: '10px' }}>
              <p style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'right' }}>
                TOTAL: R$ {Number(selectedOrder.total).toFixed(2)}
              </p>
            </div>

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
              Obrigado pela preferencia!
            </p>
            <p style={{ textAlign: 'center', fontSize: '10px' }}>
              (35) 91001-5149 | (35) 91017-7735
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
