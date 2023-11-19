import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from 'app/core/user/user.types';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>();
    set user(value: User) {
        this._user.next(value);
    }
    get user$(): Observable<User> {
        
        return this._user.asObservable();
    }
}
