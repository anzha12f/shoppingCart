import { TestBed } from "@angular/core/testing";

import { CartService } from "./cart.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { IItems } from "../models/items.model";

describe("CartService", () => {
  let cartService: CartService, httpTestingController: HttpTestingController;

  const products: any = [
    {
      title: "Blue Stripe Stoneware Plate",
      brand: "Kiriko",
      price: 40,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
      image: "blue.jpg",
    },
    {
      title: "Hand Painted Blue Flat Dish",
      brand: "Kiriko",
      price: 28,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget arcu. Curabitur ac pharetra nisl, sit amet mattis dolor.",
      image: "hand-painted.jpg",
    },
    {
      title: "Heme",
      brand: "Dust & Form",
      price: 52,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget arcu. Curabitur ac pharetra nisl, sit amet mattis dolor.",
      image: "heme.jpg",
    },
    {
      title: "Mashiko-Yaki Green Small Plate",
      brand: "Kiriko",
      price: 28,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
      image: "green.jpg",
    },
    {
      title: "Mashiko-Yaki Indigo Small Plate",
      brand: "Kiriko",
      price: 28,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
      image: "indigo.jpg",
    },
    {
      title: "Mashiko-Yaki Saucer",
      brand: "Kiriko",
      price: 18,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
      image: "saucer.jpg",
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService],
    });
    cartService = TestBed.get(CartService);
    httpTestingController = TestBed.get(HttpTestingController);
    //service = TestBed.inject(CartService);
  });

  it("should be created", () => {
    expect(cartService).toBeTruthy();
  });

  it("get all products", () => {
    let allProducts = [];

    cartService.getProducts().subscribe((products) => {
      allProducts = Object.values(products);

      expect(allProducts).toBeTruthy("No Items returned");

      expect(allProducts.length).toBe(6, "Incorrect no of items");

      const product = allProducts.find(
        (product) => product.title === "Blue Stripe Stoneware Plate"
      );

      expect(product.image).toBe("blue.jpg", "Invalid Item found");

      expect(product.price).toBe(40, "Invalid price");

      expect(product.brand).toBe("Kiriko", "Invalid Brand");
    });

    const req = httpTestingController.expectOne("/assets/products.json");

    expect(req.request.method).toBe("GET");
    req.flush(products);
  });

  it("should add product to cart", () => {
    let allProducts = [];

    cartService.getProducts().subscribe((products) => {
      allProducts = Object.values(products);

      cartService.addToCart(allProducts[0]);

      let items: IItems[] = cartService.getItems();

      expect(items.length).toBe(1, "No items found");

      expect(items[0].title).toBe(
        "Blue Stripe Stoneware Plate",
        "Item title is wrong"
      );

      const cartTotal = cartService.getCartTotal();

      expect(cartTotal).toBe(40, "cart total is wrong");
    });
    const req = httpTestingController.expectOne("/assets/products.json");

    expect(req.request.method).toBe("GET");
    req.flush(products);
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
