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
    try {
      return this.storage.get('jwt_token');
    } catch (e) {
      console.log(e);
    }
  }

  async getAsyncToken() {
    let token = await this.storage.get('jwt_token');
    return token;
  }

  getTokenFromAsync() {
    return this.getAsyncToken().then(token => {
      return token;
    })
  }

  /**
   * Stock le Token dans le storage Ionic
   * @param {string} token
   */
  setToken(token): void {
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
  getTokenExpirationDate(token): Date {
    const decoded = jwt_decode(token);

    // if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  /**
   * Vérifie si le token de connexion est toujours valide.
   * @param {(isTokenExpired) => void} callback
   */
  allowUserAccess() {

    return this.getAsyncToken().then((token) => {

      if(token === null) return false;

      // -- Si la récupération de la date echoue
      const date = this.getTokenExpirationDate(token);

      if(date === undefined) return false;

      // -- Si la date/heure du token est supérieur a celle actuelle
      // -- Retournera false, token non expiré

      if(date.valueOf() > new Date().valueOf()) {
        return true;
      }

      // return !(date.valueOf() > new Date().valueOf());

    });

  }

  checkTokenExpiration(callback? : (isTokenExpired) => void) {

    this.getToken().then(token => {

      // -- Si le token n'existe pas...
      if (!token) {
        callback(true);
        return false;
      }

      // -- Si la récupération de la date echoue
      const date = this.getTokenExpirationDate(token);
      if(date === undefined) callback(false);

      // -- Si la date/heure du token est supérieur a celle actuelle
      // -- Retournera false, token non expiré
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
            callback(decoded.data);
          })
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

          // -- Decodage du token
          let decoded = jwt_decode(response.jwt);

          // -- Retourne true pour l'application
          callback({status: true, response: response, prenom: decoded.data.PRENOM_CLIENT });

        } else {
          callback({status: false, response: response});
        }
      }
    )
  };

  // allowUserAccess() {
  //   return !this.checkAsyncTokenExpiration();
  // }

  isUserAuthenticated(callback: (isAuth) => void) {
    this.checkTokenExpiration(isTokenExpired => {
      callback(!isTokenExpired);
    });
  }

  refreshUserData(){

    // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcmVzZXJ2YXRpb25zLnNwb3RldmFzaW9uLmNvbSIsImF1ZCI6Imh0dHBzOlwvXC9yZXNlcnZhdGlvbnMuc3BvdGV2YXNpb24uY29tIiwiaWF0IjoxNTE3NDgxNjQyLCJuYmYiOjE1MTc0ODE2NDcsImV4cCI6MTUxNzQ4NTI0MiwiZGF0YSI6eyJpZCI6IjEyIiwiUFJFTk9NX0NMSUVOVCI6Ikh1Z28iLCJOT01fQ0xJRU5UIjoiTElFR0VBUkQiLCJURUxfQ0xJRU5UIjoiMDc4Mzk3MTUxNSIsIlBIT1RPX0NMSUVOVCI6Ikh1Z29MSUVHRUFSRDE1MTkwMDc5NTEuanBnIiwiQURSRVNTRV9DTElFTlQiOiIiLCJDUF9DTElFTlQiOiIiLCJWSUxMRV9DTElFTlQiOiIiLCJQQVlTX0NMSUVOVCI6IiIsIkVNQUlMX0NMSUVOVCI6Imh1Z29AYml5bi5tZWRpYSIsIlBBU1NXT1JEX0NMSUVOVCI6IiQyeSQxMCRKVUVVekRUUjZJMWhVYmh1dHI1Y1RlV1FKMVZTUnRuN1RRU08zM1h0ZGlsQS5xQU9QNHZtVyIsIkRBVEVJTlNDUklQVElPTl9DTElFTlQiOiIyMDE4LTAxLTIzIDEzOjAxOjQzIiwiTE9HX0NMSUVOVCI6ImxlIDAxXC8wMlwvMjAxOCAwOTo1OSBkZXB1aXMgMzcuMTY4LjIyOC4yMzIifX0.epaDfbiuv1bafaixb_b9IK8gQv4T8sGcC2PiG3I95Kc';//this.getTokenFromAsync();
    return this.getToken().then(token => {

      let headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + token);

      return this.http.get( 'https://reservations.spotevasion.com/api/refreshuserdata',{headers:headers} ).subscribe(
        token => {
          let t:any = token;
          if(t.success) {
            this.setToken(t.jwt);
          }
        }
      );

    })

  }

  saveUserData(user:any, callback : (response) => void){

    this.getToken().then(token => {

      let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token);

      const body = { "user": user };

      this.http.post( 'https://reservations.spotevasion.com/api/saveuserdata', body,{headers:headers} ).subscribe(
        token => {
          console.log(token);
          let t:any = token;
          if(t.success) {
            this.setToken(t.jwt);
            callback({'data':true});
          }
        }
      );

    })

  }

}
