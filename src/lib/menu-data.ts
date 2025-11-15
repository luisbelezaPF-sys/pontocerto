import { MenuItem } from './types'

export const menuData: MenuItem[] = [
  // BORDAS RECHEADAS
  {
    id: 'borda-mussarela',
    name: 'Borda de Mussarela',
    category: 'Bordas Recheadas',
    price: 3.00
  },
  {
    id: 'borda-catupiry',
    name: 'Borda de Catupiry',
    category: 'Bordas Recheadas',
    price: 3.00
  },
  {
    id: 'borda-chocolate',
    name: 'Borda de Chocolate',
    category: 'Bordas Recheadas',
    price: 3.00
  },
  {
    id: 'borda-cheddar',
    name: 'Borda de Cheddar',
    category: 'Bordas Recheadas',
    price: 3.00
  },

  // PIZZAS DOCES
  {
    id: 'pizza-chocolate',
    name: 'Pizza Chocolate',
    description: 'Chocolate, M&M\'s, Chocolate branco',
    category: 'Pizzas Doces',
    price: 40.00
  },
  {
    id: 'pizza-chocobanana',
    name: 'Pizza Chocobanana',
    description: 'Chocolate, Banana, Chocolate',
    category: 'Pizzas Doces',
    price: 40.00
  },
  {
    id: 'pizza-banana',
    name: 'Pizza Banana',
    description: 'Banana, Mussarela, Leite Condensado, Canela',
    category: 'Pizzas Doces',
    price: 40.00
  },

  // LANCHES
  {
    id: 'cachorro-quente',
    name: 'Cachorro Quente na Chapa no Pão de Hambúrguer',
    description: 'Salsicha, Bacon, Frango Desfiado, Milho, Maionese, Tomate, Ketchup, Batata Palha',
    category: 'Lanches',
    price: 13.00
  },
  {
    id: 'a-moda',
    name: 'À Moda',
    description: 'Pão, Lombo, Presunto, Ovo, Cheddar, Queijo, Alface, Tomate',
    category: 'Lanches',
    price: 15.00
  },
  {
    id: 'mistao',
    name: 'Mistão',
    description: 'Pão, Hambúrguer, Presunto, Frango Desfiado, Ovo, Catupiry, Cheddar, Mussarela, Alface, Tomate',
    category: 'Lanches',
    price: 15.00
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Pão, Presunto, Ovo, Maionese, Alface, Tomate, Queijo',
    category: 'Lanches',
    price: 13.00
  },
  {
    id: 'misto-quente',
    name: 'Misto Quente',
    description: 'Pão, Presunto, Queijo',
    category: 'Lanches',
    price: 13.00
  },
  {
    id: 'x-tudo',
    name: 'X-Tudo',
    description: 'Pão, Hambúrguer, Milho, Tomate, Alface, Maionese, Calabresa, Bacon, Ovo, Mussarela, Queijo',
    category: 'Lanches',
    price: 15.00
  },
  {
    id: 'x-calabresa',
    name: 'X-Calabresa',
    category: 'Lanches',
    price: 14.00
  },
  {
    id: 'x-egg',
    name: 'X-Egg',
    category: 'Lanches',
    price: 14.00
  },
  {
    id: 'x-bacon',
    name: 'X-Bacon',
    category: 'Lanches',
    price: 15.00
  },
  {
    id: 'x-salada',
    name: 'X-Salada',
    category: 'Lanches',
    price: 14.00
  },
  {
    id: 'x-burguer',
    name: 'X-Burguer',
    category: 'Lanches',
    price: 13.00
  },
  {
    id: 'x-tudo-especial',
    name: 'X-Tudo Especial',
    description: 'Pão, 2 Hambúrgueres, Ovo, Presunto, Milho, Batata Palha, Bacon, Catupiry, Queijo, Alface, Tomate',
    category: 'Lanches',
    price: 20.00
  },

  // BEBIDAS
  {
    id: 'fanta-uva-2l',
    name: 'Fanta Uva 2L',
    category: 'Bebidas',
    price: 13.00
  },
  {
    id: 'fanta-laranja-2l',
    name: 'Fanta Laranja 2L',
    category: 'Bebidas',
    price: 13.00
  },
  {
    id: 'guarana-2l',
    name: 'Guaraná 2L',
    category: 'Bebidas',
    price: 13.00
  },
  {
    id: 'coca-cola-2l',
    name: 'Coca-Cola 2L',
    category: 'Bebidas',
    price: 15.00
  },
  {
    id: 'guarana-1l',
    name: 'Guaraná 1L',
    category: 'Bebidas',
    price: 10.00
  },
  {
    id: 'coca-cola-600ml',
    name: 'Coca-Cola 600ml',
    category: 'Bebidas',
    price: 8.00
  },
  {
    id: 'fanta-uva-350ml',
    name: 'Fanta Uva 350ml',
    category: 'Bebidas',
    price: 6.00
  },
  {
    id: 'fanta-laranja-350ml',
    name: 'Fanta Laranja 350ml',
    category: 'Bebidas',
    price: 6.00
  },
  {
    id: 'guarana-350ml',
    name: 'Guaraná 350ml',
    category: 'Bebidas',
    price: 6.00
  },
  {
    id: 'coca-cola-350ml',
    name: 'Coca-Cola 350ml',
    category: 'Bebidas',
    price: 7.00
  },
  {
    id: 'skol-350ml',
    name: 'Skol 350ml',
    category: 'Bebidas',
    price: 5.00
  },

  // PIZZAS ESPECIAIS
  {
    id: 'calabresa-especial',
    name: 'Calabresa Especial',
    description: 'Calabresa, Palmito, Bacon, Catupiry, Mussarela, Cream Cheese, Orégano',
    category: 'Pizzas Especiais',
    price: 50.00
  },
  {
    id: 'brocolis-especial',
    name: 'Brócolis Especial',
    description: 'Brócolis, Bacon, Frango, Catupiry, Mussarela, Cream Cheese, Orégano',
    category: 'Pizzas Especiais',
    price: 50.00
  },
  {
    id: 'frango-especial',
    name: 'Frango Especial',
    description: 'Frango, Bacon, Catupiry, Cheddar, Mussarela, Cream Cheese, Orégano',
    category: 'Pizzas Especiais',
    price: 50.00
  },
  {
    id: '5-queijos-especial',
    name: '5 Queijos Especial',
    description: 'Catupiry, Mussarela, Provolone, Cheddar, Cream Cheese, Orégano',
    category: 'Pizzas Especiais',
    price: 50.00
  },
  {
    id: 'ponto-certo-especial',
    name: 'Ponto Certo Especial',
    description: 'Frango, Palmito, Milho, Bacon, Mussarela, Catupiry, Cream Cheese, Orégano',
    category: 'Pizzas Especiais',
    price: 50.00
  },
  {
    id: 'cearense-especial',
    name: 'Cearense Especial',
    description: 'Presunto, Calabresa, Bacon, Frango, Mussarela, Cream Cheese, Orégano',
    category: 'Pizzas Especiais',
    price: 50.00
  },
  {
    id: 'lombo-especial',
    name: 'Lombo Especial',
    description: 'Lombo, Tomate, Catupiry, Mussarela, Cream Cheese, Orégano',
    category: 'Pizzas Especiais',
    price: 50.00
  },
  {
    id: 'a-moda-especial',
    name: 'À Moda Especial',
    description: 'Presunto, Peito de Peru, Frango, Mussarela, Cream Cheese, Orégano',
    category: 'Pizzas Especiais',
    price: 50.00
  },
  {
    id: 'chocolate-especial',
    name: 'Chocolate Especial',
    description: 'Chocolate Preto, Chocolate Branco, Morango',
    category: 'Pizzas Especiais',
    price: 50.00
  }
]

export const categories = [
  'Pizzas Especiais',
  'Pizzas Doces',
  'Lanches',
  'Bebidas',
  'Bordas Recheadas'
]
