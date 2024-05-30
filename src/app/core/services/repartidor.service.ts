import { Injectable, inject } from '@angular/core';
import { Firestore, query,QueryDocumentSnapshot, QuerySnapshot, addDoc, collection, getFirestore, onSnapshot, orderBy, where, getDocs } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { doc, updateDoc } from '@firebase/firestore';
import { Repartidor } from '../models/repartidor.model';

@Injectable({
  providedIn: 'root'
})
export class RepartidorServices {

  private tabla = 'repartidor'

  //firestore = inject(AngularFirestore)
  dbFirebase =inject( Firestore)
  storage = getStorage();
  

  async newData(repartidor: Repartidor) {

    const retorno ={estado:false, mensaje:"No se cargo el repartidor, error inesperado"}
    if(await this.existeDni(repartidor.dni)){
      retorno.estado =false
      retorno.mensaje ="Ya existe un repartidor con este DNI"
      return retorno
    }

    return addDoc(collection(getFirestore(),(this.tabla)),repartidor).then(async res=>{
      repartidor.id = res.id
      await this.updateData(repartidor)

      retorno.estado=true
      retorno.mensaje ="Repartidor guardado con exito"
      return retorno
    }).catch(err=>{
      retorno.mensaje= err.message
      return retorno
    })
  }

 async  updateData(repartidor:Repartidor){

    const document = doc(this.dbFirebase,this.tabla,repartidor.id)
    return await updateDoc(document,{ ...repartidor})
  }

  getData(funcion:(repartidores:Repartidor[])=>void,finaly?:()=>void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.tabla)
    const q = query(mensajeRef,orderBy('fecha_nacimiento'))
    
    try{
      return onSnapshot(q,(snapshot:QuerySnapshot)=>{
        let repartidores :Repartidor[] =[];
        snapshot.forEach((doc:QueryDocumentSnapshot)=>{
          let repartidorIn =  doc.data() as Repartidor
          repartidores.push( repartidorIn)
        })
        funcion(repartidores)
        finaly?finaly():""
      })
    }catch(error){
      finaly?finaly():""
      return error
    }
  }


  async existeDni(dni:string):Promise<boolean>{
    const mensajeRef = collection(this.dbFirebase,this.tabla)
      const q = query(mensajeRef,where("dni",'==',dni))

      const snapshot = await getDocs(q);
      return snapshot.docs.length !== 0;
  }
}
