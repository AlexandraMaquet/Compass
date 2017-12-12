import { POSITIONS } from './position';
import { DATASET } from './dataset';
import { Component, OnInit } from '@angular/core';
/* 
import { FormsModule } from '@angular/forms'; */


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 positions;
 dataset;
 result= [];
 isResult = false;

 constructor ( ) {
   this.positions = POSITIONS;
   this.dataset = DATASET;
 }

  ngOnInit() {
    console.log(this.dataset);
  }

  onSubmit(index, dist) {
    const latP = this.positions[index].lat;
    const lngP = this.positions[index].lng;
    console.log(latP, lngP);
    for (let pos of this.positions) {
      let distance = this.compass(latP, lngP, pos.lat, pos.lng);
      if (distance > 0 && distance <= dist) {
        this.result.push({distance : distance, name : pos.name});
        this.result.sort(function(a, b){
          return parseFloat(a.distance) - parseFloat(b.distance);
        });
      }
    }console.log(this.result);
    this.isResult = true;
  }

  compass(lat1, lon1, lat2, lon2) {
    const radius = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = radius * c; // Distance in km
    return d;
  }
  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }



}
