import Models from '../../database/models';

export const createService = async (entity, entityData) => {
  return await Models[entity].create(entityData);
}

export const getOneByUsernameService = async (entity, username) => {
  return await Models[entity].findOne({ where: { username } });
}

export const getOneByEmailService = async (entity, email) => {
  return await Models[entity].findOne({ where: { email } });
}

export const getOneByHashService = async (entity, hash) => {
  return await Models[entity].findOne({ where: { hash } });
}

export const getOneById = async (entity, id) => {
  return await Models[entity].findOne({ where: { id } });
}

export const getAllService = async (entity) => {
  return await Models[entity].findAll();
}

export const getOneService = async (entity, id) => {
  return await Models[entity].findOne({ where: { id } });
}

export const updateOneService = async (data, entity, id) => {
  return await Models[entity].update(data, { where: { id } });
}

export const updateOneByEmailService = async (data, entity, email) => {
  return await Models[entity].update(data, { where: { email } });
}

export const deleteOneService = async (entity, id) => {
  return await Models[entity].destroy({ where: { id } });
}

export const deleteAllService = async (entity) => {
  return await Models[entity].destroy({where: {},
    // truncate: true
  });
}
