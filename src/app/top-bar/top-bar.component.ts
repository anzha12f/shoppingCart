import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartPopupComponent } from '../cart-popup/cart-popup.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private route: Router,
    private modalService: NgbModal,
    private cartService: CartService) { }

  ngOnInit() {
  }

  gotoCartPopup() : void {
    const modalRef = this.modalService.open(CartPopupComponent, {size:'lg', centered: true});
    //this.route.navigateByUrl('/cart-popup');
  }

  getCartTotalCount() : number {
    return this.cartService.items.length;
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/