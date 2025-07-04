import type { Product } from "./product"

export type Basket = {
  basketId: string
  items: Item[]
}

export class Item {
  constructor(product: Product, quantity:number){
    this.productId = product.id;
    this.quantity = quantity;
    this.name = product.name;
    this.price = product.price;
    this.pictureUrl = product.pictureUrl;
    this.type = product.type;
    this.brand = product.brand
  }
  productId: number
  quantity: number
  name: string
  price: number
  pictureUrl: string
  type: string
  brand: string
}