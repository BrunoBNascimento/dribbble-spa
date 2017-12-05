import { Component, OnInit, TemplateRef } from '@angular/core';
import {ShotsService} from './shots.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { OauthService } from '../oauth.service';



@Component({
  selector: 'app-shots',
  templateUrl: './shots.component.html',
  styleUrls: ['./shots.component.scss']
})
export class ShotsComponent implements OnInit {

  buttonActive: any = 'small-info';
  shots: any;
  shot: any;
  filteredShots: any;
  page = 1;
  maxShots = 15;
  public loading = true;
  modalRef: BsModalRef;
  isLogged: any;

  constructor(private shotsService: ShotsService, private modalService: BsModalService, private oauth: OauthService) {

    // verify if is logged and set flag
    this.setIsLogged();

    // if parameter code exists and is not logged, get oauth token from dribbble
    if (this.getQueryParameter('code') !== '' && !this.getIsLogged()) {
      this.oauth.getAuthorization(this.getQueryParameter('code'));
    }

    // load all shots from dribbble
    this.loadShots();

  }

  ngOnInit() {

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });
  }

  setActive(activeButton) {
    this.buttonActive = activeButton;
  }

  setShot(index) {
    this.shot = this.shots[index];
  }

  // if token exists on localStorage, then true else false
  setIsLogged() {
    this.isLogged = !!localStorage.getItem('token');
  }

  getIsLogged() {
    return this.isLogged;
  }

  loadShots() {
    this.shotsService.getShots(this.page, this.maxShots).subscribe(
      shots => {
        this.loading = false;
        this.shots = shots;
        this.assignCopy();
      });
  }

  likeShot(id) {
    this.shotsService.likeShot(id).subscribe(
      like => {
        if (!!like['id']) {
          alert('Você curtiu esse post!');
        }
      });
  }

  incrementPage() {
    this.page++;
    this.loading = true;
    this.loadShots();
  }

  decrementPage() {
    this.page = (this.page === 1) ? 1 : this.page - 1 ;
    this.loading = true;
    this.loadShots();
  }

  private getQueryParameter(key: string) {
    const parameters = new URLSearchParams(window.location.search);
    return parameters.get(key);
  }


  /*
  * Assign shots no-filtered array of shots to filtered shots
  * */
  public assignCopy() {
    this.filteredShots = Object.assign([], this.shots);
  }

  /*
  * Filter shots and assign original array to filtered array
  * */
  public filterShot(value) {
    if (!value) {
      this.assignCopy();
    }

    this.filteredShots = Object.assign([], this.shots).filter(
      item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

}
