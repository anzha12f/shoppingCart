import { Component, OnInit } from "@angular/core";
import { IItems } from "../models/items.model";
import { CartService } from "../services/cart.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart-popup",
  templateUrl: "./cart-popup.component.html",
  styleUrls: ["./cart-popup.component.css"],
})
export class CartPopupComponent implements OnInit {
  items: Array<IItems> = [];
  cartTotal: number = 0;
  constructor(
    private cartService: CartService,
    public activeModal: NgbActiveModal,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.cartTotal = this.cartService.getCartTotal();
  }

  viewCart(): void {
    this.activeModal.dismiss();
    this.route.navigateByUrl("/cart");
  }

  removeItem(title: any) {
    this.items = this.cartService.removeItem(title);
    this.cartTotal = this.cartService.getCartTotal();
  }
}
