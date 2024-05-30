
import { Injectable, inject, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, getAuth, signOut, updateProfile } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import { Firestore, QueryDocumentSnapshot, QuerySnapshot, addDoc, collection, getFirestore, where,query, onSnapshot } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  auth = inject(Auth)
  toastSVC = inject(ToastrService)
  userLogin: boolean = false;
  user: any;
  dbFirebase =inject( Firestore)
  rol!:"empleado"|"admin"; 
  private bdUsuarios = "usuarios"
  private userSubject = new Subject<any>(); // Subject to store the user state
  user$: Observable<any>;



  //instancia el obserbable de user
  constructor() {
    this.user$ = this.userSubject.asObservable(); // Make user data observable

    onAuthStateChanged(getAuth(),
      (user) => {
        if (user) {
          this.user = user
          this.userSubject.next(user);

        } else {
          this.user = null
          this.userSubject.next(null);
        }
      },
      (error) => {

        this.toastSVC.error(this.mensajePersonalizadoFirebase(error.message), "Error")
      }
      // Handle errors (optional)this.mensajePersonalizadoFirebase(err.message)
    );
  }

  //guarda la informacion de un usuario en la base de datos
  addNewUser(user: User) {
    addDoc(collection(getFirestore(), this.bdUsuarios), user).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }


  //inicia secion
  async login(email: string, password: string, calback?: () => void) {
    
    await signInWithEmailAndPassword(this.auth, email!, password!).then(res => {
      this.userLogin = true;
      this.user = res.user
      
      const mensajeRef = collection(this.dbFirebase,this.bdUsuarios)
      const q = query(mensajeRef,where("_id",'==',this.user.uid))
      onSnapshot(q,(snapshot:QuerySnapshot)=>{
          this.rol = snapshot.docs[0].data()['rol']
          this.userSubject.next(res.user);
        }
      )



      if (calback) calback()
    }).catch(err => {
      this.toastSVC.error(this.mensajePersonalizadoFirebase(err.message), "Error")
    })
  }

  async register(user: User, password: string, calback?: () => void) {
    await createUserWithEmailAndPassword(this.auth, user.email, password).then(res => {
      user._id = res.user.uid
      this.userLogin = true;
      this.user = res.user
      this.addNewUser(user)
      //this.addNewLogin(res.user.uid)
      this.userSubject.next(res.user);
      this.actualizarUsuario({ displayName: user.nombre })
      if (calback) calback()
    }).catch(err => {
      this.toastSVC.error(this.mensajePersonalizadoFirebase(err.message), "Error")
    })
  }


  //actualiza el valor de displayName del usuario
  actualizarUsuario({ displayName, photoURL: photoUrl }: { displayName?: string | null | undefined; photoURL?: string | null | undefined; }) {
    updateProfile(this.user, { displayName })
  }


  //cerrar secion
  logout() {
    signOut(getAuth())
      .then(() => {
        this.toastSVC.success("usuario deslogeado")
        this.user = null
      })
      .catch(() => {
        this.toastSVC.error("error en el deslogueo")
      })
  }

 


  //cambia el mensaje de erorr de firebase por uno personalizado
  mensajePersonalizadoFirebase(mensaje: string) {
    let retorno = "error no encontrado"
    if (mensaje === null) return retorno

    const regex = /\(([^)]+)\)/;
    //@ts-ignore
    const parenthesizedText = mensaje.match(regex)[1];
    switch (parenthesizedText) {
      case "auth/claims-too-large":
        retorno = "La carga supero el tamaño maximo de 1000 bits"
        break;
      case "auth/email-already-exists":
        retorno = "Este email ya se encuentra registrado en el sistema"
        break;
      case "auth/id-token-expired":
        retorno = "Su token ID de firebase esta vencido"
        break;
      case "auth/id-token-revoked":
        retorno = "Su token ID de firebase fue revocado"
        break;
      case "auth/insufficient-permission":
        retorno = "No cuenta con los permisos para acceder a los recursos"
        break;
      case "auth/internal-error":
        retorno = "El servidor de autentificacion encontro un error inesperado"
        break;
      case "auth/invalid-argument":
        retorno = "Se proporciono argumentos no validos "
        break;
      case "auth/invalid-claims":
        retorno = "Los atributos personalizados no son validos"
        break;
      case "auth/invalid-continue-uri":
        retorno = "La URL proporcionada no es valida"
        break;
      case "auth/invalid-creation-time":
        retorno = "La hora de creación debe ser una string de fecha en formato UTC válida"
        break;
      case "auth/invalid-credential":
        retorno = "Email o contraseña incorecta"
        break;
      case "auth/invalid-disabled-field":
        retorno = "El valor que se proporcionó para la propiedad del usuario disabled no es válido. Debe ser un booleano."
        break;
      case "auth/invalid-display-name":
        retorno = "El valor que se proporcionó para la propiedad del usuario displayName no es válido. Debe ser una string que no esté vacía."
        break;
      case "auth/invalid-dynamic-link-domain":
        retorno = "El dominio del vínculo dinámico proporcionado no se configuró o no se autorizó para el proyecto actual."
        break;
      case "auth/invalid-email":
        retorno = "El valor que se proporcionó para la propiedad del usuario email no es válido. Debe ser una dirección de correo electrónico de string."
        break;
      case "auth/invalid-email-verified":
        retorno = "El valor que se proporcionó para la propiedad del usuario emailVerified no es válido. Debe ser un booleano"
        break;
      case "auth/invalid-hash-algorithm":
        retorno = "El algoritmo de hash debe coincidir con las strings de la lista de algoritmos compatibles."
        break;
      case "auth/invalid-hash-block-size":
        retorno = "El tamaño del conjunto de hash debe ser un número válido."
        break;
      case "auth/invalid-hash-derived-key-length":
        retorno = "La longitud de la clave derivada de hash debe ser un número válido."
        break;
      case "auth/invalid-hash-key":
        retorno = "La clave de hash debe ser un búfer de bytes válido."
        break;
      case "auth/invalid-hash-memory-cost":
        retorno = "El costo de la memoria de hash debe ser un número válido."
        break;
      case "auth/invalid-hash-parallelization":
        retorno = "La paralelización de hash debe ser un número válido."
        break;
      case "auth/invalid-hash-rounds":
        retorno = "Las rondas de hash deben ser un número válido."
        break;
      case "auth/invalid-hash-salt-separator":
        retorno = "El campo del separador de sal del algoritmo de hash debe ser un búfer de bytes válido."
        break;
      case "auth/invalid-id-token":
        retorno = "El token de ID que se proporcionó no es un token de ID de Firebase válido."
        break;
      case "auth/invalid-last-sign-in-time":
        retorno = "La hora del último acceso debe ser una string de fecha en formato UTC válida."
        break;
      case "auth/invalid-page-token":
        retorno = "El token de página siguiente que se entregó en listUsers() no es válido. Debe ser una string válida que no esté vacía."
        break;
      case "auth/invalid-password":
        retorno = "El valor que se proporcionó para la propiedad del usuario password no es válido. Debe ser una string con al menos seis caracteres."
        break;
      case "auth/invalid-password-hash":
        retorno = "El hash de contraseñas debe ser un búfer de bytes válidos."
        break;
      case "auth/invalid-password-salt":
        retorno = "La contraseña con sal debe ser un búfer de bytes válido."
        break;
      case "auth/invalid-phone-number":
        retorno = "El valor que se proporcionó para phoneNumber no es válido"
        break;
      case "auth/invalid-photo-url":
        retorno = "El valor que se proporcionó para la propiedad del usuario photoURL no es válido"
        break;
      case "auth/invalid-provider-data":
        retorno = "providerData debe ser una serie de objetos UserInfo."
        break;
      case "auth/invalid-provider-id":
        retorno = "ProviderId debe ser una string del identificador del proveedor compatible válida."
        break;
      case "auth/invalid-oauth-responsetype":
        retorno = "Se debe configurar solo un responseType de OAuth como verdadera."
        break;
      case "auth/invalid-session-cookie-duration":
        retorno = "La duración de la cookie de sesión debe ser un número válido en milisegundos que vaya entre los 5 minutos y las 2 semanas."
        break;
      case "auth/invalid-uid":
        retorno = "El uid proporcionado debe ser una string no vacía con un máximo de 128 caracteres."
        break;
      case "auth/invalid-user-import":
        retorno = "El registro de usuarios para importar no es válido."
        break;
      case "auth/maximum-user-count-exceeded":
        retorno = "Se excedió la cantidad máxima de usuarios permitidos para importar."
        break;
      case "auth/missing-android-pkg-name":
        retorno = "Si es obligatorio instalar la app para Android, debe proporcionarse un nombre de paquete de Android."
        break;
      case "auth/missing-continue-uri":
        retorno = "Se debe proporcionar una URL de continuación válida en la solicitud."
        break;
      case "auth/missing-hash-algorithm":
        retorno = "Para importar usuarios con hash de contraseñas, es necesario proporcionar el algoritmo de hash y sus parámetros."
        break;
      case "auth/missing-ios-bundle-id":
        retorno = "Falta un ID del paquete en la solicitud."
        break;
      case "auth/missing-uid":
        retorno = "Se requiere un identificador uid para la operación actual."
        break;
      case "auth/missing-oauth-client-secret":
        retorno = "El secreto de cliente de la configuración de OAuth es obligatorio para habilitar el flujo de código de OIDC."
        break;
      case "auth/operation-not-allowed":
        retorno = "El proveedor de acceso proporcionado está inhabilitado para tu proyecto de Firebase."
        break;
      case "auth/phone-number-already-exists":
        retorno = "Otro usuario ya utiliza el phoneNumber proporcionado."
        break;
      case "auth/project-not-found":
        retorno = "No se encontró ningún proyecto de Firebase para la credencial que se usó para inicializar los SDK de Admin. "
        break;
      case "auth/reserved-claims":
        retorno = "Una o más reclamaciones personalizadas de usuarios que se entregaron a setCustomUserClaims() están reservadas"
        break;
      case "auth/session-cookie-expired":
        retorno = "La cookie proporcionada de la sesión de Firebase venció."
        break;
      case "auth/session-cookie-revoked":
        retorno = "Se revocaron las cookies de la sesión de Firebase."
        break;
      case "auth/too-many-requests":
        retorno = "La cantidad de solicitudes supera el máximo permitido."
        break;
      case "auth/uid-already-exists":
        retorno = "Otro usuario ya utiliza el uid proporcionado."
        break;
      case "auth/unauthorized-continue-uri":
        retorno = "El dominio de la URL de continuación no está en la lista blanca."
        break;
      case "auth/user-not-found":
        retorno = "No existe ningún registro de usuario que corresponda al identificador proporcionado."
        break;
      default:
        retorno = mensaje
        break;

    }

    return retorno
  }
}
