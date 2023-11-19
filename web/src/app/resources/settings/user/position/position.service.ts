import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PositionService {

    public url: string = env.apiUrl;
    public httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) { }

    // ==================== Create One Product
    create(data: object = {}): Observable<any> {
        return this.http.post(this.url + '/users-position/create', data, this.httpOptions);
    }
    // ==================== Read All Products
    read(): any {
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        // httpOptions['params'] = params;
        // console.log(this.url);
        
        return this.http.get(this.url + '/users-position', this.httpOptions);
    }
    // =================== Update One Product
    update(id: number = 0, data: object = {}): any {
        return this.http.put(this.url + '/users-position/update/' + id, data, this.httpOptions);
    }
    // ==================== Delete One Product
    delete(id: number = 0): any {
        return this.http.delete(this.url + '/users-position/delete/' + id, this.httpOptions);
    }
    //==================================================================
}
