import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment }  from '../../environments/environment';
import { Mensaje, Usuario, Publicaciones } from '../interfaces/info-pagina.interface';




@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  
  baseUrl = environment.baseUlr;

  constructor(public http:HttpClient ) { }


  //Usuarios
  getUsuarios() {
   return this.http.get<any>(this.baseUrl);
  }

  addUsuario(obj: any) {
    return this.http.post<Usuario>(this.baseUrl, obj)
  }
  
  updateEmail(obj: any) {
    return this.http.put<Usuario>(this.baseUrl, obj)
  }

  updateContrasenna(obj: any) {
    return this.http.put<Usuario>(this.baseUrl, obj)
  }

  updateFoto(obj: any) {
    return this.http.put<Usuario>(this.baseUrl, obj)
  }

  updateNombreUsuario(obj: any) {
    return this.http.put<Usuario>(this.baseUrl, obj)
  }


  deleteUsuario(obj: any) {
    return this.http.delete<any>(this.baseUrl, obj)
  }

 /* deleteProduct(id: string) {
    return this.http.delete<any>(this.baseUrl+`?id=${id}`);
  }


  getUsuario(id: string) {
    return this.http.get<any>(this.baseUrl+`?nombre_usuario=${id}`);
  }
  
  /*
  updateProduct(obj: Registro) {
    return this.http.put<Registro>(this.baseUrl, obj)
  }*/

  //realizo solicitudes HTTP. 
//Mensajes
getMensajes() {
  return this.http.get<any>(this.baseUrl);
 }

 addMensaje(obj: any) {
   return this.http.post<Mensaje>(this.baseUrl, obj)
 }

 



//Publicaciones
 getPublicaciones() {
  return this.http.get<any>(this.baseUrl);
 }

 addPublicacion(obj: any) {
   return this.http.post<Publicaciones>(this.baseUrl, obj);
 }
}