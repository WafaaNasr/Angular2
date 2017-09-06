import { BadRequestError } from './../common/errors/bad-request-error';
import { AppError } from './../common/errors/app-error';
import {Injectable} from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NotFoundError } from '../common/errors/not-found-error';
import 'rxjs/add/operator/catch'; // catch is an instance Method thats why we use operation/ catch
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'; // throw is a factory method used to create objects


@Injectable()
export class DataService {
  constructor(private url: string, private http: Http) {
  }

  getAll() {
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  create(resource: JSON) {
    return this.http.post(this.url, JSON.stringify(resource))
        .map(response => response.json())
        .catch(this.handleError);
  }

  update(id: number, resource: any) {
    return this.http.patch(this.url + '/' + id, JSON.stringify(resource))
    .map(response => response.json())
    .catch(this.handleError);
  }

  delete(id: number) {
    // For Creating Custom Application Errors
    return this.http.delete(this.url + '/' + id)
        .map(response => response.json())
        .catch(this.handleError);
  }

  private handleError(error: Response) {
      if ( error.status === 404) {
        return Observable.throw(new NotFoundError());
      }
      if (error.status === 400) {
        return Observable.throw(new BadRequestError(error.json()));
      }
      return  Observable.throw(new AppError(error));
  }
}
