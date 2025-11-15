'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus, Trash2, Phone, MessageCircle, Shield } from 'lucide-react'
import { menuData, categories } from '@/lib/menu-data'
import { CartItem } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('Pizzas Especiais')
  
  // Checkout form
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [observations, setObservations] = useState('')

  const addToCart = (item: typeof menuData[0]) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const updateQuantity = (id: string, change: number) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0))
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const handleCheckout = async () => {
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    const total = getTotal()

    // Salvar pedido no Supabase
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_address: customerAddress,
            items: cart,
            total: total,
            status: 'pending'
          }
        ])
        .select()

      if (error) {
        console.error('Erro ao salvar pedido:', error)
      }
    } catch (err) {
      console.error('Erro:', err)
    }

    // Montar mensagem WhatsApp
    let message = `Pedido - Ponto Certo\n`
    message += `Cliente: ${customerName}\n`
    message += `Telefone: ${customerPhone}\n`
    message += `Endereco: ${customerAddress}\n\n`
    message += `Itens:\n`
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}\n`
    })
    
    message += `\nTotal: R$ ${total.toFixed(2)}\n\n`
    message += `Forma de pagamento: ${paymentMethod}\n`
    message += `Observacoes: ${observations}`

    const whatsappNumber = '5535910015149'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    
    window.open(whatsappUrl, '_blank')
    
    // Limpar carrinho e formulário
    setCart([])
    setShowCheckout(false)
    setCustomerName('')
    setCustomerPhone('')
    setCustomerAddress('')
    setPaymentMethod('')
    setObservations('')
  }

  const filteredMenu = menuData.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Ponto Certo</h1>
              <p className="text-sm md:text-base text-red-100">Lanchonete e Pizzaria</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
                title="Painel Admin"
              >
                <Shield className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden md:inline">Carrinho</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-yellow-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
            Sabor que Conquista!
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-red-50">
            As melhores pizzas e lanches da região
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5535910015149"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp (35) 91001-5149
            </a>
            <a
              href="https://wa.me/5535910177735"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp (35) 91017-7735
            </a>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">
            Nosso Cardápio
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map(item => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-2xl hover:shadow-red-500/20 transition-all duration-300 border border-gray-700 hover:border-red-500 hover:scale-105"
              >
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                {item.description && (
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-yellow-400">
                    R$ {item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-end" onClick={() => setShowCart(false)}>
          <div
            className="bg-gradient-to-b from-gray-900 to-black w-full md:w-96 h-full overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Seu Carrinho</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Carrinho vazio</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-white text-sm">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="bg-red-600 hover:bg-red-700 text-white w-7 h-7 rounded flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="bg-red-600 hover:bg-red-700 text-white w-7 h-7 rounded flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-yellow-400 font-bold">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="text-white">Total:</span>
                      <span className="text-yellow-400">R$ {getTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowCart(false)
                      setShowCheckout(true)
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Enviar pelo WhatsApp
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowCheckout(false)}>
          <div
            className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Finalizar Pedido</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Nome Completo *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Telefone *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Endereço Completo *</label>
                <textarea
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Rua, número, bairro"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Forma de Pagamento</label>
                <input
                  type="text"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Dinheiro, cartão, PIX..."
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Observações</label>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Alguma observação sobre o pedido?"
                  rows={2}
                />
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4 mb-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-white">Total:</span>
                <span className="text-yellow-400">R$ {getTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:scale-105 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-700 to-red-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ponto Certo</h3>
          <p className="text-red-100 mb-4">Lanchonete e Pizzaria</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/5535910015149" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              (35) 91001-5149
            </a>
            <span className="hidden sm:inline text-red-300">|</span>
            <a 
              href="https://wa.me/5535910177735"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              (35) 91017-7735
            </a>
          </div>
          <p className="text-red-200 text-sm mt-6">© 2024 Ponto Certo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
