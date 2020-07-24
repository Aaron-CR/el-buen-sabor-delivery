import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Categoria } from 'src/app/core/models/articulos/categoria';
const TODOS = 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/fork-and-knife-with-plate_1f37d.png';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: Categoria[] = [];
  public todos = TODOS;
  public customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: { items: 3.2 },
      400: { items: 5 },
      740: { items: 8 },
      940: { items: 10 }
    },
  };

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getPublicCategories();
  }

  getPublicCategories() {
    this.categoryService.findAllUnpaged().subscribe((data) => {
      this.categories = data.filter((category) => category.oculto);
    });
  }

}
