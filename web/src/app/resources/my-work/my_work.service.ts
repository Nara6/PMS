import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';
import { Observable } from 'rxjs';
import { List} from './project.types';

@Injectable({
    providedIn: 'root',
})
export class MyWorkService {

    public url: string = env.apiUrl;
    public httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) { }


    // ==================== Create Project
    create(body: object={}): Observable<any> {
        return this.http.post<any>(this.url + '/projects/create', body, this.httpOptions);
    }
    // ==================== Read All Project for users
    read(id: number = 0): Observable<List> {
        return this.http.get<List>(this.url + '/users/' + id, this.httpOptions);
    }
    // ==================== Project project
    delete(id: number = 0): any {
        return this.http.delete(this.url + '/projects/delete/' + id, this.httpOptions);
    }
    // ====================> Data-setup
    GetSetup(): Observable<any>{
        return this.http.get(this.url + '/projects/data-setup/listing', this.httpOptions);
    }
    // =====================>> update
    update(id:number=0, body: object={}): Observable<any>{
        console.log(body);
        return this.http.put(this.url +'/projects/update/'+ id, body, this.httpOptions );
    }
    createProjectUser(body: object={}): any{
        return this.http.post<any>(this.url + '/project-user/create', body, this.httpOptions);
    }
}
