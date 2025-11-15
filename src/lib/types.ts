export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  category: string
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Order {
  id?: number
  customer_name: string
  customer_phone: string
  customer_address: string
  items: CartItem[]
  total: number
  status: 'pending' | 'completed'
  created_at?: string
}

export interface Admin {
  username: string
  password: string
}
