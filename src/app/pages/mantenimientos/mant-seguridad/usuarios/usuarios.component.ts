/**
 * @author Edgar Ramirez
 * @returns mantenimientos de usuario
 * @name UsuariosComponent
 * @alias _usuariosComponent
 * @version 1.0.0
 * @fecha 17/01/2019
 */
import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones

// Services uses of thw Class
import { UsuarioService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

// Model of Class
import { UsuarioModel } from '../../models/usuarios.model';
import { ConfigSmartTableService } from '../../services/usuarios.settings.smart-table.service';

// Varieble Jquey
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'ngx-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService, ConfigSmartTableService],
})
export class UsuariosComponent implements OnInit {

  // Variables Tipo JSON, para usarlas en los Servicios Invocados
  public JsonReceptionUsuarios: any;
  public JsonReceptionTipoUsuarios: any;

  // Instacia de la variable del Modelo | Json de Parametros
  public _usuarioModel: UsuarioModel;

  /**
     * Smart table Generated
     */
  data: any;
  listArrayData3: any
  data1: any;
  arrayTipoUsuarios: any

  public onSaveConfirm(id) {
    alert('id selecionado ' + id)
  }

  config: ToasterConfig;

  position = 'toast-bottom-full-width';
  animationType = 'slideDown';
  title = 'Se ha grabado la Información! ';
  content = 'los cambios han sido grabados temporalmente, en la PGC!';
  timeout = 10000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  settings: any;
  public responsedata: any;

  /****************************************************************************
 * Funcion: makeToast
 * Object Number: 003
 * Fecha: 17-01-2019
 * Descripcion: Method makeToast of the Class
 * Objetivo: makeToast in the method header API
 ****************************************************************************/
  makeToast() {
    this.showToast(this.type, this.title, this.content);
    // console.log('Opcion de Toaster 1.3 ' + JSON.stringify(this.content));
  } // FIN | makeToast

  /****************************************************************************
  * Funcion: showToast
  * Object Number: 004
  * Fecha: 17-01-2019
  * Descripcion: Method showToast of the Class
  * Objetivo: showToast in the method header API
  ****************************************************************************/
  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    // this._toasterService.popAsync(toast);
    this._toasterService.pop(toast);
  } // FIN | showToast

  /**
   * Constructor
   * @param _router
   * @param _usuariosService
   */
  constructor(protected _router: Router,
    public _usuariosService: UsuarioService, // Inicializa el ToasterService
    private _toasterService: ToasterService,
    public _configSmartTableService: ConfigSmartTableService) {
    // Llamamos a la Funcion de Configuracion de las Smart Table
    this._configSmartTableService.configSmartTable('userSmart', 1, null);
    this.settings = this._configSmartTableService.settings;
    /* Llamado a la Funcion: 007, la cual obtiene el detalle da la Info.
     del Usuario */
    this.usuariosListAllService();
    this.responsedata = { 'error': false, 'msg': 'error campos solicitado' };
  }

  /****************************************************************************
* Funcion: ngOnInit
* Object Number: 002
* Fecha: 17-01-2019
* Descripcion: Method ngOnInit of the Class
* Objetivo: ngOnInit in the method header API
****************************************************************************/
  ngOnInit() {
    // Inicializacion del Modelo de la Clase
    this._usuarioModel = new UsuarioModel(
      0, null, null, null,
      null, null, null, null, null, null, null, 0, '', null, 0, '', null, 0, '', null, 0, '',
    );
    // inicializar la lista de tipo de perfiles
    //  this.usuariosTipoService();
  }


  /* **************************************************************************/
  /* ****************** Funciones Propias de la Clase *************************/

  /****************************************************************************
  * Funcion: usuariosDatailsService
  * Object Number: 001
  * Fecha: 17-01-2019
  * Descripcion: Method usuariosDatailsService of the Class
  * Objetivo: usuariosDatailsService detalle del Perfil llamando a la API
  ****************************************************************************/
  private usuariosListAllService() {
    this._usuariosService.getAllUsuarios().subscribe(
      response => {
        if (response.status !== 200) {
          // console.log(response.status);
          // console.log(response.message);
          this.showToast('error', 'Error al Obtener la Información del Usuario', response.message);
        } else if (response.status === 200) {
          // this.productos = result.data;
          // console.log(result.status);
          this.JsonReceptionUsuarios = response.data;
          this.data = this.JsonReceptionUsuarios;
          // console.log(response.data);
        }
      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);

        // Borramos los datos del LocalStorage
        localStorage.removeItem('auth_app_token');
        localStorage.removeItem('identity');

        const redirect = '/auth/login';
        setTimeout(() => {
          // Iniciativa Temporal
          location.reload();
          return this._router.navigateByUrl(redirect);
        }, 2000);
      },
    );
  } // FIN | usuariosDatailsService



}
