import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  registro: any = {};

constructor( public _usuarioService: AuthService,
             public router: Router  ){}

  canActivate(): Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = this._usuarioService.token;
    console.log('tokenguard', token)
    let payload = JSON.parse( atob( token.split('.')[1]));
    console.log('payload', payload)
    let expirado = this.expirado( payload.exp );

    if ( expirado ) {
      this.router.navigate(['/login']);
      return false;
    }



    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number ): Promise<boolean>{

    return new Promise (( resolve, reject ) =>{

      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + ( 4 * 60 * 60 * 1000) );

      if ( tokenExp.getTime() > ahora.getTime() ){

        resolve(true);
      } else {

        const form = [
          {
            id: localStorage.getItem('id'),
            token: localStorage.getItem('refreshToken')
          }
        ]

        this.registro =  JSON.parse(JSON.stringify(form[0]));

        console.log('refresh', this.registro)

        this._usuarioService.renuevaToken(this.registro)
            .subscribe( () =>{
              resolve( true );
            }, () =>{
              this.router.navigate(['/login']);
              reject ( false);
            });
      }

      resolve ( true );

    });

  }

  expirado( fechaExp: number ){

    let ahora = new Date().getTime( ) / 1000;

    if ( fechaExp < ahora ) {
      console.log('fechaexp', fechaExp)
      console.log('ahora', ahora)
      return true;
    } else {
      return false;
    }

  }
}
