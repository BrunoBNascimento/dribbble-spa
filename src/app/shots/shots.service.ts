import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { OauthService } from '../oauth.service';

@Injectable()
export class ShotsService {

  private service: String = 'shots';

  constructor(private http: HttpClient, private oauth: OauthService) {

  }

  getShots(page, maxShots) {

    return this.http
      .get(this.oauth.getApiUrl(this.service) + '&page=' + page + '&per_page=' + maxShots);

  }

  likeShot(id) {
    return this.http
      .post(this.oauth.getApiUrl(`shots/${id}/like`), {});
  }

  unlikeShot(data) {
    return this.http
      .delete(this.oauth.getApiUrl(this.service), data);
  }

}
