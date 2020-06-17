import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

export class Category {
  url: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public category: string;
  public index: number;

  public categories: Category[] = [
    { url: 'pizzas', name: 'Pizzas', icon: '🍕' },
    { url: 'burgers', name: 'Burgers', icon: '🍔' },
    { url: 'panchos', name: 'Panchos', icon: '🌭' },
    { url: 'carnes', name: 'Carnes', icon: '🍖' },
    { url: 'ensalada', name: 'Ensalada', icon: '🥗' },
    { url: 'pastas', name: 'Pastas', icon: '🍝' },
    { url: 'asiatica', name: 'Asiatica', icon: '🍣' },
    { url: 'postres', name: 'Postres', icon: '🧁' },
    { url: 'desayuno', name: 'Desayuno', icon: '☕' },
    { url: 'bebidas', name: 'Bebidas', icon: '🥤' }
  ];

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: { items: 3.5 },
      400: { items: 5 },
      740: { items: 8 },
      940: { items: 10 }
    },
  };

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.index = this.categories.findIndex(i => i.url === this.category);
    });
  }

}
