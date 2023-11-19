import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {

    public url: string = env.apiUrl;
    public httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) { }
    
    // ==================== Create One Product
    create(data: object = {}): any {
        return this.http.post(this.url + '/projects-type/create', data, this.httpOptions);
    }
    // ==================== Read All Products
    read(): any {
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        // httpOptions['params'] = params;
        return this.http.get(this.url + '/projects-type', httpOptions);
    }
    // ==================== Update One Product
    update(id: number = 0, data: object = {}): any {
        return this.http.put(this.url + '/projects-type/update/' + id, data, this.httpOptions);
    }
    // ==================== Delete One Product
    delete(id: number = 0): any {
        return this.http.delete(this.url + '/projects-type/delete/' + id, this.httpOptions);
    }
    //==================================================================
}
