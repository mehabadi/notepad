import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {bufferTime, groupBy, map, mergeMap, take, toArray} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GistService {

  constructor(private http: HttpClient) {}

  public getCreatedGistsBasedOnDataTime() {

    return this.http.get<any>('https://api.github.com/gists/public').pipe(
      map((res: any[]) => {
        return res?.map(item => ({key: this.roundTime(item.created_at), value: 1}));
      }),
      mergeMap(res => of(...res)),
      groupBy(a => a.key),
      mergeMap(group => group.pipe(toArray())),
      take(8),
      bufferTime(3000),
    );
  }

  public getFilesPerGistBasedOnDataTime() {
    return this.http.get<any>('https://api.github.com/gists/public').pipe(
      map((res: any[]) => {
        return res?.map(item => ({key: this.roundTime(item.created_at), value: Object.keys(item.files).length}));
      }),
      mergeMap(res => of(...res)),
      groupBy(a => a.key),
      mergeMap(group => group.pipe(toArray())),
      take(8),
      bufferTime(3000)
    );
  }

  private roundTime(date: string){
    const time = date.split('T')[1].replace('Z', '');
    const timeArr = time.split(':')
    let second = +timeArr[2];
    const remainder = second % 5;
    if ( remainder > 0){
      second = second - remainder;
      timeArr[2] = second.toString().padStart(2, '0');
    }
    return timeArr.join(':');
  }
}
