import { Injectable } from '@angular/core';
import { Seller } from '../../core/domain/seller.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DataService } from '../../core/services/data.service';
import { SystemConstants } from '../../core/common/system.constants';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private _dataService: DataService) { }
  getSellers(): Observable<Seller[]> {
    return this._dataService.get('sellers/getall');
  }
  getSeller(id: String) {
    let seller: Seller = {} as Seller;
    this._dataService.get(`sellers/${id}`).subscribe((result) => {
      seller = result;
    });
    return seller;
  }
  updateSeller(seller) {
    return this._dataService.patch(`sellers/${seller.id}`, seller);
  }
}
