import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {CarService} from "../../providers/car-service";
import {CarDetailPage} from "../car-detail/car-detail";


@Component({
  selector: 'page-cars',
  templateUrl: 'cars.html'
})
export class CarsPage {
  // list of car shops
  public shops: any;

  // number of days
  public numDays = 3;

  constructor(public nav: NavController, public carService: CarService) {
    // set sample data
    this.shops = carService.getAll();
  }

  // view car
  viewDetail(classId) {
    this.nav.push(CarDetailPage, {id: classId});
  }
}
