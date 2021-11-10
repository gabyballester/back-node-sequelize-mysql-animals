import {
  createService,
  getAllService,
  getOneService,
  updateOneService,
  deleteOneService,
  deleteAllService,
} from "../services/entity.service";
const entity = "Post";
import Models from '../../database/models';

export async function createPost(req, res) {
  const userId = req.user.sub;
  const { text } = req.body;
  try {
    // valida texto
    if (!text)
      return res.status(404).json({
        message: "Faltan datos en el formulario",
      });

    //crea post
    const postToCreate = { userId, text };
    console.log(Models.Post.create(postToCreate));
    const newPost = await Models.Post.create(postToCreate);
    // const newPost = await createService(entity, postToCreate);
    console.log('entra');
    if (newPost)
      return res.status(200).json({
        message: "Post creado!!",
        newPost,
      });

    // si falla
    return res.status(404).json({ message: "Post no creado :(" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await getAllService(entity);
    if (allPosts.length > 0) {
      return res.status(200).json({ allPosts });
    }

    return res.status(404).json({ message: "No hay posts" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getOnePost = async (req, res) => {
  const { id } = req.params;

  try {
    // busca
    const post = await getOneService(entity, id);
    if (!post)
      return res.status(404).json({
        message: "Post no encontrado",
      });
    //si existe
    return res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateOnePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  try {
    // si post existe
    const postExists = await getOneService(entity, id);
    if (!postExists || postExists.length === 0)
      return res.status(404).json({ message: "Post no encontrado" });

    // si se actualiza post
    const updatedCount = await updateOneService(post, entity, id);
    if (!updatedCount || updatedCount.length === 0) {
      return res.status(404).json({ message: "Post no actualizado" });
    }

    //si todo ok
    let message = "Post actualizado correctamente!!";
    return res.status(200).json({ message, updatedPost: post });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteOnePost = async (req, res) => {
  const { id } = req.params;

  try {
    // busco si existe
    const postExists = await getOneService(entity, id);
    if (!postExists || postExists.length === 0)
      return res.status(404).json({ message: "Post no encontrado" });

    // si se borra post
    const deleteRowCount = await deleteOneService(entity, id);
    if (!deleteRowCount || deleteRowCount.length === 0) {
      return res.status(404).json({ message: "Post no borrado" });
    }
    const message = "Post borrado!!";
    return res.status(200).json({ message, deletedPost: postExists });
  } catch (error) {
    //si falla
    console.error(error);
    res.status(500).json({ error });
  }
};

export const deleteAllPosts = async (req, res) => {
  try {
    // busca si hay alguno
    const existAnyPost = await getAllService(entity);
    if (!existAnyPost || existAnyPost.length === 0) {
      return res.status(404).json({ message: "No hay posts para borrar" });
    }

    // si hay, los borra
    const remainingCount = await deleteAllService(entity);

    // si los ha borrado
    if (remainingCount === 0)
      return res
        .status(200)
        .json({ message: "Todos los posts han sido borrados!!" });

    // si no los ha borrado
    return res.status(404).json({ message: "Posts no borrados" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
