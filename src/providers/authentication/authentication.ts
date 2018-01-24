import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs/Observable";
import * as jwt_decode from 'jwt-decode';

/*
  Amazing work from : https://medium.com/@amcdnl/authentication-in-angular-jwt-c1067495c5e0
*/
@Injectable()
export class AuthenticationProvider {

  constructor(public http: HttpClient, public storage:Storage) { }

  url:string    = 'https://reservations.spotevasion.com/api/connexion';
  body = {"token": "AYhnfo75dndDf097zkFf87554zfhz8fz", "email": "", "password" : ""};
  headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');

  /**
   * Récupère le Token depuis le Storage Ionic
   * @returns {Promise<string>}
   */
  getToken():Promise<string> {
    return this.storage.get('jwt_token');
  }

  /**
   * Stock le Token dans le storage Ionic
   * @param {string} token
   */
  setToken(token: string): void {
    this.storage.set('jwt_token', token);
  }

  /**
   * Déconnecte un utilisateur en supprimant le token de connexion
   */
  removeAccess() {
    this.storage.remove('jwt_token');
  }

  /**
   * Retourne la date d'expiration du token passé en paramètre
   * @param {string} token
   * @returns {Date}
   */
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  /**
   * Vérifie si le token de connexion est toujours valide.
   * @param {(isTokenExpired) => void} callback
   */
  checkTokenExpiration(callback : (isTokenExpired) => void) {

    this.getToken().then(token => {
      if(!token) callback(true);

      const date = this.getTokenExpirationDate(token);
      if(date === undefined) callback(false);
      callback(!(date.valueOf() > new Date().valueOf()));

    })
  }

  /**
   * Récupère les données de l'utilisateur depuis le token de connexion.
   * @param {(user) => void} callback
   */
  getTokenData(callback: (user) => void) {
    this.checkTokenExpiration(isTokenExpired => {
      if(!isTokenExpired) {
        this.getToken().then(
          token => {
            let decoded = jwt_decode(token);
            callback(decoded.data[0]);
          }
        )
      }
    });
  }

  /**
   * Connexion de l'utilisateur depuis l'API
   * @param user
   * @returns {Observable<any>}
   */
  private connexion(user):Observable<any> {
    this.body.email = user.email; this.body.password = user.password;
    return this.http.post( this.url, this.body,{headers:this.headers} );
  }

  /**
   * Authentifie un Utilisateur dans l'application.
   * @param user
   * @param {(isAutorize) => void} callback
   */
  // : https://stackoverflow.com/questions/37867020/angular-2-return-data-directly-from-an-observable/37867462
  grantAccess(user, callback : (isAutorize) => void) {
    this.connexion(user).subscribe(
      response => {
        if(response.success) {

          // -- Stockage du Token JWT
          this.setToken(response.jwt);

          // -- Retourne true pour l'application
          callback({status: true, response: response});

        } else {
          callback({status: false, response: response});
        }
      }
    )
  };

}
