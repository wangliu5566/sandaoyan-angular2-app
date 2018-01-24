import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Post } from '../../../model/post-model';

@Injectable()
export class ToSourceService {
    public postDetailURL = "/assets/json/post-mock.json";
    constructor(private http: Http) { }

    public getPost(id: number): Observable<Post> {
        return this.http
            .get(this.postDetailURL)
            .map((res: Response) => res.json());
    }
}