//Interfaz que maneja los datos de los usuarios
export interface Usuario{

  nombre_usuario?: string,
  contrasenna: string,
  email: string, 
  id_usuario: string,
  foto_perfil: string,
  nivel_usuario: number
 
}

//Interfaz que maneja los datos de los mensajes
export interface Mensaje{

  id_mensaje?: string,
  mensaje: string,
  fecha_envio: Date,
  //estado_envio: boolean
  nombre_usuario_mensaje: string,

}


//Interfaz que maneja los datos de las publicaciones
export interface Publicaciones{

  id_publicacion?: string,
  nombre_usuario: string,
  multimedia: string,
  fecha_de_publicacion: Date,
  nombre_publicacion: string,
  descripcion: string,
  ubicacion: string,
  
}