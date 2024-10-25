import { collection, addDoc } from "firebase/firestore";

async function marcarDiaChequeado(idUser, idDia, checked) {
  try {
    const statusRef = await addDoc(collection(db, "CALENDAR_STATUS"), {
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
marcarDiaChequeado("userId1", "dayId1", true);


// import { collection, query, where, getDocs } from "firebase/firestore";

// async function consultarDiaChequeado(idUser, idDia) {
//   const statusRef = collection(db, "CALENDAR_STATUS");
//   const q = query(statusRef, where("idUser", "==", idUser), where("idDia", "==", idDia));
  
//   const querySnapshot = await getDocs(q);
//   let diaChequeado = false;
//   querySnapshot.forEach((doc) => {
//     if (doc.data().checked === true) diaChequeado = true;
//   });
  
//   return diaChequeado;
// }

// Ejemplo de uso
//consultarDiaChequeado("userId1", "dayId1").then((checked) => { console.log("¿Día chequeado?", checked);});

