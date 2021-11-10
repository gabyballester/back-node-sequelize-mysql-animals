import {
  createService,
  getAllService,
  getOneService,
  updateOneService,
  deleteOneService,
  deleteAllService,
} from "../services/entity.service";
const entity = "Like";

export const createLike = async (req, res) => {
  const userId = req.user.sub;
  const { postId } = req.body;

  try {
    // valida postId
    if (!postId)
      return res.status(404).json({
        message: "Faltan datos en el formulario",
      });

    //crea like
    const likeToCreate = { userId, postId };
    const newLike = await createService(entity, likeToCreate);
    if (newLike)
      return res.status(200).json({
        message: "Like creado!!",
        newLike,
      });

    // si falla
    return res.status(404).json({ message: "Like no creado :(" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const getAllLikes = async (req, res) => {
  try {
    const allLikes = await getAllService(entity);
    if (allLikes.length > 0) {
      return res.status(200).json({ allLikes });
    }

    return res.status(404).json({ message: "No hay likes" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getOneLike = async (req, res) => {
  const { id } = req.params;

  try {
    // busca
    const like = await getOneService(entity, id);
    if (!like)
      return res.status(404).json({
        message: "Like no encontrado",
      });
    //si existe
    return res.status(200).json({ like });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateOneLike = async (req, res) => {
  const { id } = req.params;
  const like = req.body;

  try {
    // si like existe
    const likeExists = await getOneService(entity, id);
    if (!likeExists || likeExists.length === 0)
      return res.status(404).json({ message: "Like no encontrado" });

    // si se actualiza like
    const updatedCount = await updateOneService(like, entity, id);
    if (!updatedCount || updatedCount.length === 0) {
      return res.status(404).json({ message: "Like no actualizado" });
    }

    //si todo ok
    let message = "Like actualizado correctamente!!";
    return res.status(200).json({ message, updatedLike: like });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteOneLike = async (req, res) => {
  const { id } = req.params;

  try {
    // busco si existe
    const likeExists = await getOneService(entity, id);
    if (!likeExists || likeExists.length === 0)
      return res.status(404).json({ message: "Like no encontrado" });

    // si se borra like
    const deleteRowCount = await deleteOneService(entity, id);
    if (!deleteRowCount || deleteRowCount.length === 0) {
      return res.status(404).json({ message: "Like no borrado" });
    }
    const message = "Like borrado!!";
    return res.status(200).json({ message, deletedLike: likeExists });
  } catch (error) {
    //si falla
    console.error(error);
    res.status(500).json({ error });
  }
};

export const deleteAllLikes = async (req, res) => {
  try {
    // busca si hay alguno
    const existAnyLike = await getAllService(entity);
    if (!existAnyLike || existAnyLike.length === 0) {
      return res.status(404).json({ message: "No hay likes para borrar" });
    }

    // si hay, los borra
    const deletedCount = await deleteAllService(entity);

    // si los ha borrado
    if (deletedCount > 0)
      return res
        .status(200)
        .json({ message: "Todos los likes han sido borrados!!" });

    // si no los ha borrado
    return res.status(404).json({ message: "Likes no borrados" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
