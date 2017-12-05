import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class OauthService {

  private bearer: String = 'a72a0c750d19bb731d714132faed214a27b220bf9235f7173b7fb67eb32436d0';
  private apiUrl: String = 'https://api.dribbble.com/v1/';
  private client_id = '80c6203bcc323b8c272e278a3e440a0f0774a552c21b5fc1f9745329ec08b823';
  private client_secret = 'd4c34966455b41f211dbc7be2d5851e751e20e2340e73ee0435d170d34693b54';

  constructor(private http: HttpClient) { }

  public getApiUrl(service) {
    return this.apiUrl + service + '/?access_token=' + this.getBearer();
  }

  public setApiUrl(apiUrl) {
    this.apiUrl = apiUrl;
  }

  getBearer() {
    return (!!localStorage.getItem('token')) ? localStorage.getItem('token') : this.bearer ;
  }

  setBearer(bearer) {
    this.bearer = bearer;
  }

  getAuthorization(code) {
    const payload = new FormData();

    payload.append('client_id', this.client_id);
    payload.append('client_secret', this.client_secret);
    payload.append('code', code);

    this.http.post('https://dribbble.com/oauth/token', payload).subscribe(data => {

      this.setBearer(data['access_token']);
      localStorage.setItem('token', data['access_token']);

    }, error => {

      if (error['status'] === 401) {

        location.href = 'https://dribbble.com/oauth/authorize?client_id=80c6203bcc323b8c272e278a3e440a0f0774a552c21b5fc1f9745329ec08b823&scope=public+write';

      } else {
        console.log('ocorreu um erro', error);
      }

    });
  }

}
