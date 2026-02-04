import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pool from './database.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL || 'http://localhost:3000'}/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const googleId = profile.id;
      const email = profile.emails[0].value;
      const name = profile.displayName;
      const picture = profile.photos[0]?.value || null;

      // Verificar se usuário já existe
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE google_id = ?',
        [googleId]
      );

      let user;

      if (rows.length > 0) {
        // Atualizar usuário existente
        await pool.execute(
          'UPDATE users SET name = ?, picture = ?, updated_at = NOW() WHERE google_id = ?',
          [name, picture, googleId]
        );
        user = rows[0];
        user.name = name;
        user.picture = picture;
      } else {
        // Criar novo usuário
        const [result] = await pool.execute(
          'INSERT INTO users (google_id, email, name, picture) VALUES (?, ?, ?, ?)',
          [googleId, email, name, picture]
        );
        user = {
          id: result.insertId,
          google_id: googleId,
          email,
          name,
          picture
        };
      }

      return done(null, user);
    } catch (error) {
      console.error('Error in Google Strategy:', error);
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    if (rows.length > 0) {
      done(null, rows[0]);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, null);
  }
});

export default passport;
