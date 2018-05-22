const isExist = async (objectId, model) => {
  const data = await model.findById(objectId);

  if (data) return String(data._id) === objectId;

  return false;
};

export default isExist;
