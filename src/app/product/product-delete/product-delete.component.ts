import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  // @ts-ignore
  productForm: FormGroup; // @ts-ignore
  id: number;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => { // @ts-ignore
      this.id = +paramMap.get('id');
      const product = this.getProduct(this.id);
      this.productForm = new FormGroup({ // @ts-ignore
        id: new FormControl(product.id), // @ts-ignore
        name: new FormControl(product.name), // @ts-ignore
        price: new FormControl(product.price), // @ts-ignore
        description: new FormControl(product.description),
      });
    });
  }

  ngOnInit() {
  }

  getProduct(id: number) {
    return this.productService.findById(id);
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
    alert('Xoá sản phẩm thành công')
    this.router.navigate(['/product/list']);
  }
}
