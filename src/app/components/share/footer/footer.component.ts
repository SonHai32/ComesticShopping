import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  storeAddressData: any = [
    {
      district: 'Quận 3 Tp.HCM',
      addrInfo: '- Số 71, Đường số 3, Cư Xá Đô Thành, P4, Q3 - 0911 784 114'
    },
    {
      district: 'Q.Phú Nhuận Tp.HCM',
      addrInfo: '280 Phan Đình Phùng, P.3, Q.Phú Nhuận - 0911 384 114'
    },
    {
      district: 'Quận 9 Tp.HCM',
      addrInfo: '435 Lê Văn Việt, Tăng Nhơn Phú A, Q.9 - 0911.484.114'
    },
    {
      district: 'Q.Tân Phú Tp.HCM',
      addrInfo: '17 Nguyễn Sơn, Phú Thạnh, Q.Tân Phú 0911.174.114'
    },
    {
      district: 'Hà Nội ',
      addrInfo: '152 Chùa Bộc, Đống Đa, Hà Nội - 0911 584 114'
    },
    {
      district: 'Hà Nội ',
      addrInfo: '65C Xuân Thủy, Cầu Giấy, Hà Nội - 0911.464.114'
    },
    {
      district: 'Đà Nẵng ',
      addrInfo: '268 Trưng Nữ Vương, P.Bình Thuận, Q.Hải Châu - 0911 684 114'
    },
    {
      district: 'Đà Nẵng ',
      addrInfo: '94 Âu Cơ, P.Hòa Khánh Bắc, Q.Liên Chiểu, TP. Đà Nẵng - 0911.794.114'
    },


  ]
  constructor() { }

  ngOnInit(): void {
  }

}
