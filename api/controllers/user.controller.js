import { hashPassword } from "../services/bcrypt.service";
import {
  deleteOneService,
  getAllService,
  getOneService,
  updateOneService,
  deleteAllService,
} from "../services/entity.service";

const entity = "User";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllService(entity);
    if (users && users.length > 0) {
      return res.status(200).json({ users });
    }
    return res.status(404).json({ message: "No hay usuarios" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getOneService(entity, id);
    if (!user)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateOneUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    // compruebo si existe
    let doesUserExist = await getOneService(entity, id);
    if (!doesUserExist || doesUserExist.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    // encriptamos password si nos lo envía
    if (user.password) {
      user.password = hashPassword(user.password);
    }
    // compruebo si ha habido un error
    const updatedCount = await updateOneService(user, entity, id);
    if (!updatedCount || updatedCount.length === 0)
      return res.status(404).json({ message: "Usuario no actualizado" });

    //si es ok develvo usuario actualizado
    const updatedUser = await getOneService(entity, id);
    return res.status(200).json({
      //si actualiza retorna ok
      message: " Usuario actualizado!!",
      updatedCount,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const deleteOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    // busco si existe
    const getOneUser = await getOneService(entity, id);
    if (!getOneUser || getOneUser.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // comprobar el borrado
    const deleteRowCount = await deleteOneService(entity, id);
    //Si falla
    if (!deleteRowCount || deleteRowCount === 0) {
      return res.status(404).json({ message: "Usuario no borrado" });
    }
    // si es ok
    return res.status(200).json({
      message: " Usuario borrado!!",
      count: deleteRowCount, //registros borrados
      getOneUser, //usuario borrado,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    // busca si hay alguno
    const existAnyUser = await getAllService(entity);
    if (!existAnyUser || existAnyUser.length === 0) {
      return res.status(404).json({ message: "No hay usuarios para borrar" });
    }

    // si hay, los borra
    const remainingCount = await deleteAllService(entity);

    // si los ha borrado
    if (remainingCount === 0)
      return res
        .status(200)
        .json({ message: "Todos los usuarios han sido borrados!!" });

    // si no los ha borrado
    return res.status(404).json({ message: "Likes no borrados" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
