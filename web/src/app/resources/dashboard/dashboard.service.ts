import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {

    //===> Private Variables used in this file only
    private _apiUrl = env.apiUrl;
    constructor(
        //===> Private Variables used in this file only
        private _http: HttpClient
    ) { }

    getDashboardInfo(): Observable<any> {
        return this._http.get<any>(this._apiUrl + '/dashboard', {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        });

    }
}
