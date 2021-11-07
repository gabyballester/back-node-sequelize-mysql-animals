// Archivo de control de roles como middleware -> role.middleware.js

export const isAdmin = (req, res, next) => {
  const { role } = req.user;
  const admins = ['admin1', 'admin2'];
  if (!admins.includes(role)) {
    return res.status(403).send({
      message: 'Sólo un Admin puede ver esta sección'
    });
  }
  next();
}


