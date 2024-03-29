import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }


/**
 * Obtener todas categorias
 * @returns
 */

  getCategories(){
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }

  /**
   * Insertar nueva categoria
   */
  saveCategories(body: any){
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint,body);
  }

  /**
   * Update categoria
   */

  updateCategories(body : any, id : any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.put(endpoint,body);
  }

  /**
   * delete categoria
   */

  deleteCategories( id : any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * search id
   */
  getCategoriesById( id : any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.get(endpoint);
  }


  /**
   * export excel
   */
   exportCategories(){
    const endpoint = `${base_url}/categories/export/excel`;
    return this.http.get(endpoint,{
      responseType:'blob'
    });

  }
}
