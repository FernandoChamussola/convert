// Middleware para verificar se o usuário está autenticado
export const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    error: 'Não autorizado',
    message: 'Você precisa fazer login para usar esta funcionalidade',
    requiresAuth: true
  });
};

// Middleware opcional - permite acesso mas adiciona info do usuário se logado
export const optionalAuth = (req, res, next) => {
  // Apenas continua, o usuário pode ou não estar logado
  next();
};
