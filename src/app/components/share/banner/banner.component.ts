import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  array = [1, 2, 3, 4];

  banners: any;
  constructor() {

    this.banners = [
      {
      bannerTitle: 'Mua sắm thoả thích tại xxxxx',
      bannerContent: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source",
      bannerImageUrl: 'assets/images/final2.jpg',
      bannerLink: ''
      },
    {

      bannerTitle: 'Mua sắm thoả thích tại xxxxx',
      bannerContent: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source ",
      bannerImageUrl: 'assets/images/final2.jpg',
      bannerLink: ''
      }
  ]
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

}
