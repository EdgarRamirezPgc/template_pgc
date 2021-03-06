/**
 * @author Nahum Martinez
 * @returns servicios de Actividades
 * @name ActivityService
 * @alias _activityService
 * @version 1.0.0
 * @fecha 09/01/2019
 */
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';

// Clases nesesarias para el envio via Ajax
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Importamos la Clase de las Propiedades del Sistema
import { SystemPropertiesService } from '../../../shared/system-properties.service';
import { SystemEndPointsService } from '../../../shared/system-end-points.service';

@Injectable({
    providedIn: 'root',
})
export class EspacioTrabajoService {
    // Variables de la Ruta de la API
    public _url: string;
    public _urlResourses: string;

    // Variables para el localStorage
    public _identity;
    public _token;

    public tokenHeader = this._systemPropertiesService.getIdentity().token;
    public usernameHeader = this._systemPropertiesService.getIdentity().userName;

    // Variable de cabezeras http
    public headers = new HttpHeaders();

    /****************************************************************************
    * Funcion: FND-00001
    * Fecha: 01-09-2019
    * Descripcion: Metodo para obtener los Datos de la
    * variable identity del localStorage
    * Objetivo: Seteo de las variables en json
    ****************************************************************************/
    constructor(private _http: HttpClient,
        // Instanciamos la Url de la API
        private _systemEndPointsService: SystemEndPointsService,
        private _systemPropertiesService: SystemPropertiesService) {

        // Seteo de los Headers
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.tokenHeader, 'Access-Control-Allow-Origin': '*',
        });
    } // FIN | Constructor


    /****************************************************************************
    * Funcion: FND-00001
    * Fecha: 21-08-2018
    * Descripcion: Metodo para obtener los Datos de los Estados de la Actividad
    * Objetivo: datos de los Estados de las Actividades
    * Params: {  }
    ****************************************************************************/
    getAllEstados(idGrupo): Observable<any> {
        // Parametros solicitados (Grupo Solicitao)
        const paramSend = idGrupo;
        // Retorno de la Funcion
        return this._http.get(this._systemEndPointsService.getEndPointService('estadosGroup', 2) + paramSend, {
            headers: this.headers,
            params: { 'tokenApi': this.tokenHeader },
        });
    }// FIN | FND-00001


    /****************************************************************************
    * Funcion: FND-00001
    * Fecha: 21-08-2018
    * Descripcion: Metodo para obtener los Datos de los Estados de la Actividad
    * Objetivo: datos de los Estados de las Actividades
    * Params: {  }
    ****************************************************************************/
   getAllTipo(idTipo): Observable<any> {
    // Parametros solicitados (Grupo Solicitao)
    const paramSend = idTipo;
    // Retorno de la Funcion
    return this._http.get(this._systemEndPointsService.getEndPointService('estadosGroup', 3) + paramSend, {
        headers: this.headers,
        params: { 'tokenApi': this.tokenHeader },
    });
}// FIN | FND-00001

}
