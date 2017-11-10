import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class DeactivateGuard implements CanDeactivate<any> {

  constructor() {}

  canDeactivate( component: any,currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                 nextState: RouterStateSnapshot) : Observable<boolean>|boolean {
    return  component.canDeactivate();
  }
}
