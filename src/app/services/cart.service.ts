import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IItems } from "../models/items.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  items: Array<IItems> = [];

  constructor(private http: HttpClient) {}

  addToCart(product, qtyCount?: number) {
    //Check before push if already there then add 1 to quantity
    const itemIndexIndicator = this.items.findIndex(
      (item) => product.title == item.title && product.image == item.image
    );

    console.log("add items....", product, this.items, itemIndexIndicator);

    if (itemIndexIndicator === -1) {
      this.items.push(product);
      qtyCount && qtyCount > 1
        ? (this.items[this.items.length - 1].quantity = qtyCount)
        : (this.items[this.items.length - 1].quantity = 1);
    } else {
      if (this.items[itemIndexIndicator].quantity === undefined) {
        this.items[itemIndexIndicator].quantity = 0;
      }
      qtyCount && qtyCount > 0
        ? (this.items[itemIndexIndicator].quantity += qtyCount)
        : this.items[itemIndexIndicator].quantity++;
    }

    console.log("service Items....", this.items);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getProducts() {
    return this.http.get("/assets/products.json");
  }

  addCounter(counter: number): number {
    // make Zero if manually updated to negative value
    if (counter < 0) {
      counter = 0;
    }
    counter++;
    return counter;
  }

  removeCounter(counter: number): number {
    if (counter > 0) {
      counter--;
    }
    return counter;
  }

  getCartTotal(): number {
    const cartTotal = this.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    return cartTotal;
  }

  removeItem(title: any): Array<IItems> {
    console.log("title....", title, this.items);
    this.items = this.items.filter((item) => item.title !== title);
    return this.items;
  }
}
