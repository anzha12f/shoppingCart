import { Component, OnInit } from "@angular/core";
import { CartService } from "../services/cart.service";
import { IItems } from "../models/items.model";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  items: Array<IItems> = [];
  counter: number = 0;
  cartTotal: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.getCartTotal();
    console.log("items", this.items);
  }

  removeItem(title: any) {
    this.items = this.cartService.removeItem(title);
    this.getCartTotal();
  }

  addCounter(qty: number, id: number): void {
    this.items[id].quantity = this.cartService.addCounter(qty);
    console.log("counter..", this.counter);
  }

  removeCounter(qty: number, id: number): void {
    this.items[id].quantity = this.cartService.removeCounter(qty);
  }

  getCartTotal(): number {
    this.cartTotal = this.cartService.getCartTotal();
    return this.cartTotal;
  }
}
