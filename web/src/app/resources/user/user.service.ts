import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';
import { Observable } from 'rxjs';
import { List, ReqPutPassword, RequestUser, ResPutPassword, ResponseSetup, ResponseUser } from './user.types';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private url: string = env.apiUrl;
    private httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) { }

    // ==================== Get data-setup
    setup(): Observable<ResponseSetup> {
        return this.http.get<ResponseSetup>(this.url + '/users/data-setup/listing', this.httpOptions);
    }

    // ==================== Get All Users
    list(params: { limit: number, page: number, key?: string | number | null, order:string }): Observable<List> {
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        httpOptions['params'] = params;
        return this.http.get<List>(this.url + '/users', httpOptions);
    }

    // ==================== Get One User
    view(id: number=null): Observable<any> {
        console.log(id);
        
        const httpOptions = {};
        return this.http.get(this.url + '/users/' + id, httpOptions);
    }

    // ==================== Create User
    create(body: RequestUser): Observable<ResponseUser> {
        return this.http.post<ResponseUser>(this.url + '/users/create', body, this.httpOptions);
    }

    // =================== Update User
    update(id: number = 0, data: object = {}): any {
        console.log(id);
        
        return this.http.put(this.url + '/users/update/' + id, data, this.httpOptions);
    }

    // ==================== Update User
    delete(id: number = 0): any {
        return this.http.delete(this.url + '/users/delete/' + id, this.httpOptions);
    }

    // =================== Update password by admin
    updatePassword(id: number = 0, body: ReqPutPassword): Observable<ResPutPassword> {
        return this.http.put<ResPutPassword>(`${this.url}/users/${id}/update-password`, body, this.httpOptions);
    }

    // =================== Update password by user

    updatePasswordPf(id: number = 0, body: any={}): any{
        // console.log(id,body);
        return this.http.put<any>(`${this.url}/users/my-profile/update-password/${id}`, body, this.httpOptions);
        
    }
}
