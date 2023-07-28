//import { getConnection } from "./../database/database.js";
const { getConnection } = require("./../database/database.js");
const getDetalles= async (req, res)=>{
    try {
        const connection= await getConnection();
        const result = await connection.query("SELECT * FROM detalle");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);

    }
};
const getDetallesReducidos=async(req, res)=>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT detalle.Id, detalle.Id_viaje , cliente.Nombre AS Nombre_cliente, usuario.Nombre AS Nombre_usuario, detalle.personas, sube, habitacion, costo, anticipo, estado,pago,viaje, fecha_regreso, fecha_venta FROM detalle JOIN cliente ON detalle.Id_cliente = cliente.Id JOIN usuario ON detalle.Id_usuario = usuario.Id ORDER BY id ASC LIMIT 14, 18446744073709551615;");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
const getDetallebyId = async(req, res)=>{
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM detalle WHERE detalle.id = ?",id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
const getAnticipo = async(req,res)=>{
    try {
        const {id} = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT anticipo FROM detalle WHERE detalle.id = ?",id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}
const addDetalle = async (req, res) => {
    try {
        //desconstruccion de todos los campos de la base de datos para insertar 
      const { id_viaje, id_cliente, id_usuario, personas, sube, hora, habitacion, costo, anticipo, liquidado, estado, pago, viaje, hora_regreso, fecha_regreso, fecha_venta } = req.body;
      //este bloque verifica que los campos que no puden ser nulos no vayan a estar vácios
      if (
        id_viaje == undefined ||
        id_cliente == undefined||
        id_usuario == undefined||
        personas == undefined||
        sube == undefined||
        hora == undefined||
        habitacion == undefined||
        costo == undefined||
        anticipo == undefined||
        liquidado == undefined||
        estado == undefined||
        pago == undefined||
        viaje == undefined||
        fecha_venta== undefined
      ) {
        return res.status(400).json({ message: "Mala petición, por favor llene todos los datos" });
      }
      //todos los campos los asignamos a un arreglo de nombre detalle para pasarlos al await de la consulta
      //pasando unicamente el arreglo
      const detalles = { id_viaje, id_cliente, id_usuario, personas, sube, hora, habitacion, costo, anticipo, liquidado, estado, pago, viaje, hora_regreso, fecha_regreso, fecha_venta };
      const connection = await getConnection();
      await connection.query("INSERT INTO detalle SET ?", detalles);
      res.json({ message: "Detalle Registrado" });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

// const updateDetalle = async (req, res)=>{
//     try {
//         //const {id} = req.params;
//         const {id,anticipo} = req.body;

//         if (id == undefined || anticipo == undefined) {
//             return res.status(400).json({message:"Algo salió mal, por favor compruebe que todos los campos sean correctos"});
//         }
//         const connection = await getConnection();
//         const result = await connection.query("UPDATE detalle SET anticipo=? WHERE detalle.id = ?", [anticipo, id]);
//         res.json(result);
//         res.status(200);
//     } catch (error) {
//         res.status(500);
//         res.send(error.message);
//     }
// }
const updateDetalle = async (req, res) => {
    try {
      const { id, anticipo } = req.body;
  
      if (id == undefined || anticipo == undefined) {
        return res
          .status(400)
          .json({ message: "Algo salió mal, por favor compruebe que todos los campos sean correctos" });
      }
  
      const connection = await getConnection();
      const currentDetalle = await connection.query("SELECT costo,anticipo FROM detalle WHERE id = ?", [id]);
  
      if (currentDetalle.length === 0) {
        return res.status(404).json({ message: "Detalle no encontrado" });
      }
  
      const currentAnticipo = currentDetalle[0].anticipo;
      const costo = currentDetalle[0].costo;
      const newAnticipo = currentAnticipo + anticipo;
  
      if (newAnticipo>costo) {
        return res.status(400).json({ message: "El anticipo no puede ser mayor que el costo" });
      }
      const result = await connection.query("UPDATE detalle SET anticipo = ? WHERE id = ?", [newAnticipo, id]);
      res.json(result);
      
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
const removeDetalle = async(req, res)=>{
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM detalle WHERE detalle.id = ?",id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
module.exports= {
  getAnticipo,
  getDetalles,
  getDetallebyId,
  getDetallesReducidos,
  addDetalle,
  removeDetalle,
  updateDetalle
};

//module.exports = methods;

// export const methods = {
//     getAnticipo,
//     getDetalles,
//     getDetalle,
//     getDetallesReducidos,
//     addDetalle,
//     removeDetalle,
//     updateDetalle
// };