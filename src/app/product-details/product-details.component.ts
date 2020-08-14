import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CartService } from "../services/cart.service";
import { filter } from "rxjs/Operators";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  product;
  qtyCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log("Params...", JSON.parse(params.product));
      this.product = JSON.parse(params.product); //products[+params.get('productId')];
    });
  }

  addToCart(product): void {
    this.cartService.addToCart(product, this.qtyCount);
    window.alert("Your product has been added to the cart!");
  }

  addCounter(): void {
    this.qtyCount = this.cartService.addCounter(this.qtyCount);
  }

  removeCounter(): void {
    this.qtyCount = this.cartService.removeCounter(this.qtyCount);
  }
}
