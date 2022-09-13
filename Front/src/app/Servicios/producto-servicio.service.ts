import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NuevoProducto } from '../Models/nuevo-producto';
import { Producto } from '../Models/producto';
import { BaseServicioService } from './base-servicio.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoServicioService extends BaseServicioService{
  constructor(protected http: HttpClient) {
    super(http);
    this.pathService ='Productos/';
  }
  public listAll(){
    return this.Get<Producto[]>('Listar');
  }
  public getDetalle(id:number){
    return this.Get<Producto>('Detalle/'+id);
  }
  public add(producto:NuevoProducto){
    return this.Post<number,NuevoProducto>('Nuevo',producto);
  }
  public update(id:number,producto:NuevoProducto){
    return this.Put<string,NuevoProducto>('Actualizar/'+id,producto);
  }
  public delete(id:number){
    return this.Delete<string>('Eliminar/'+id);
  }
}
