import express from 'express';
import passport from '../config/passport.js';

const router = express.Router();

// Iniciar autenticação Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback do Google
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    // Sucesso - redireciona para o frontend
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
    res.redirect(`${frontendUrl}/auth/success`);
  }
);

// Verificar se está autenticado
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture
      }
    });
  } else {
    res.json({
      authenticated: false,
      user: null
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao destruir sessão' });
      }
      res.clearCookie('connect.sid');
      res.json({ success: true });
    });
  });
});

// Falha na autenticação
router.get('/failure', (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
  res.redirect(`${frontendUrl}/auth/error`);
});

export default router;
