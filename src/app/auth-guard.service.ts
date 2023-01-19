import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs/observable";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    
    constructor(private authService:AuthService, private route:Router){}

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.authService.isAuthenticated().then(
            (authenticated: boolean) => {
                if (authenticated)
                    return true;
                else {
                    this.route.navigate(['/']);
                }

            }
        )
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

                return this.canActivate(route,state);
    }
}