import { Injectable } from '@angular/core';
import {listaUser} from '../../model/usuario.interface'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { listaProductos } from 'src/app/model/primeros.interface';
import { listaPedidos } from 'src/app/model/pedidos.interface';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:8080'
  constructor(private http:HttpClient) { }
  //Buscar email para no registrarse
  searchUser(email:string):Observable<listaUser[]>{
    return this.http.get<listaUser[]>(this.url + '/searchUser/'+email);

  }
  //Login
  login(email:string,pass:string):Observable<listaUser[]>{
    return this.http.get<listaUser[]>(this.url + `/login/${email}/${pass}`);

  }
   //Todos los productos
  getProductAll():Observable<listaProductos[]>{
    return this.http.get<listaProductos[]>(this.url + '/productosAll' );
  }
  //Todos los productos por id y  disponible
  getAllProduct(tipo:string):Observable<listaProductos[]>{
    return this.http.get<listaProductos[]>(this.url + `/productos/${tipo}`);
  }

  //buscar por id 
  getProductID(id:string):Observable<listaProductos[]>{
    return this.http.get<listaProductos[]>(this.url + `/productosID/${id}`);

  }
    //insertar pedido 
    postPedidos(idUser:number,fecha:string, estado:string,total:number):Observable<listaPedidos[]>{
      const headers = { 'content-type': 'application/json'} 
    const body = { idUser: idUser ,fecha:fecha,estado:estado,total:total };
     return this.http.post<any>(this.url+'/insertPedidos',body,{'headers':headers})
  
    }

    

  //pedido por id y fecha 
  getProductDate(id:number , fecha:string):Observable<listaPedidos[]>{
    return this.http.get<listaPedidos[]>(this.url + `/pedidos/${id}/${fecha}`);

  }
    //insertar lineapedidos 
    postLineaPedidos(idPedidos:number,idProductos:number):Observable<listaPedidos[]>{
      const headers = { 'content-type': 'application/json'} 
    const body = { idPedidos: idPedidos ,idProductos:idProductos };
     return this.http.post<any>(this.url+'/lineaPedidos',body,{'headers':headers})
  
    }

    
    updateCheck(disponible:string,id:number):Observable<listaPedidos[]>{
      const headers = { 'content-type': 'application/json'} 
    const body = { disponible: disponible ,id:id };
     return this.http.post<any>(this.url+'/changeProduct',body,{'headers':headers})
  
    }
    '/pedidos/:estado'
    getOrderPay(estado:string):Observable<listaPedidos[]>{
      return this.http.get<listaPedidos[]>(this.url + `/pedidos/${estado}`);
  
    }
  //ejemplos
  getAllUser():Observable<listaUser[]>{
    return this.http.get<listaUser[]>(this.url);
  }

  getUser(id:string):Observable<listaUser>{
    return this.http.get<listaUser>(this.url +"/"+id)
  }

  postUser(user:string,pass:string): Observable<any>{
    const headers = { 'content-type': 'application/json'} 
    const body = { usuario: user ,password:pass };
     return this.http.post<any>(this.url+'/userImport',body,{'headers':headers})
  }
  
}
