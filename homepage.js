import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
//import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"



const firebaseConfig = {
    //YOUR COPIED FIREBASE PART SHOULD BE HERE
 //WATCH THIS VIDEO TO LEARN WHAT TO PUT HERE   https://youtu.be/_Xczf06n6x0
 apiKey: "AIzaSyDfBKviQSIV8-5_Mn2F-A5-q8GorUrd7do",
 authDomain: "dbnavidad24.firebaseapp.com",
 projectId: "dbnavidad24",
 storageBucket: "dbnavidad24.appspot.com",
 messagingSenderId: "1088874986512",
 appId: "1:1088874986512:web:1a24b655e89bf6e7409e95",
 measurementId: "G-133MRYJG88"
  };
 
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;
               
               const _userId = user.uid
               console.log("Ok",_userId)
               marcarDiaChequeado(_userId, "241201", true);
            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })



async function marcarDiaChequeado(idUser, idDia, checked) {
  obtenerIdDiaPorFecha("241201").then((idDia) => {
      if (idDia) {
        console.log("ID del día encontrado:", idDia);
      } else {
        console.log("No se encontró un día con esa fecha.");
      }
    });
  try {
    const statusRef = await addDoc(collection(db, "calendar_status"), {
      idUser: idUser,      // ID del usuario
      idDia: idDia,        // ID del día en el calendario
      checked: checked,    // Estado del chequeo (true o false)
      timestamp: new Date()// Marca de tiempo
    });
    console.log("Día chequeado registrado con ID: ", statusRef.id);
  } catch (e) {
    console.error("Error al registrar el chequeo del día: ", e);
  }
}

// Ejemplo de uso
// marcarDiaChequeado(_userId, "241201", true);

//import { collection, query, where, getDocs } from "firebase/firestore";

// Función para obtener el id del calendario para una fecha específica
async function obtenerIdDiaPorFecha(fecha) {
  const calendarRef = collection(db, "calendar");
  const q = query(calendarRef, where("fecha", "==", fecha)); // Filtra los documentos que tengan fecha igual a "241201"

  const querySnapshot = await getDocs(q);
  let idDia = null;

  querySnapshot.forEach((doc) => {
    // Guarda el id del documento (idDia) si hay coincidencia
    idDia = doc.id;
  });

  if (idDia) {
    console.log("El ID del día para la fecha", fecha, "es:", idDia);
  } else {
    console.log("No se encontró un día con la fecha:", fecha);
  }

  return idDia;
}

// Ejemplo de uso
// obtenerIdDiaPorFecha("241201").then((idDia) => {
//   if (idDia) {
//     console.log("ID del día encontrado:", idDia);
//   } else {
//     console.log("No se encontró un día con esa fecha.");
//   }
// });


// Función para obtener y mostrar todos los documentos de la colección `CALENDAR`
async function mostrarContenidoCalendar(queTABLA) {
  console.log("Mostrar contenido")
  const calendarRef = collection(db, queTABLA); // Referencia a la colección `CALENDAR`
  
  try {
    const querySnapshot = await getDocs(calendarRef); // Obtiene todos los documentos de la colección

    // Recorre cada documento y muestra su contenido en consola
    querySnapshot.forEach((doc) => {
      console.log(`ID del documento: ${doc.id}, Datos: `, doc.data());
    });
  } catch (e) {
    console.error("Error al obtener el contenido de la colección CALENDAR:", e);
  }
}

// Llamada a la función
mostrarContenidoCalendar("calendar");