import express from "express"
import cors from "cors"
import session from "express-session"
import MySQLStore from "express-mysql-session"
import passport from "./config/passport.js"
import pool from "./config/database.js"

// Rotas
import auth from "./routes/auth.js"
import convert from "./routes/convert.js"
import wordToPdf from "./routes/wordToPdf.js"
import pdfToWord from "./routes/pdfToWord.js"
import imageResize from "./routes/imageResize.js"
import imageConverter from "./routes/imageConverter.js"
import imageToIcon from "./routes/imageToIcon.js"
import backgroundRemover from "./routes/backgroundRemover.js"

// Middleware
import { requireAuth } from "./middleware/auth.js"

const app = express()

// CORS configurado para permitir credenciais
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// Configurar sessão com MySQL
const MySQLStoreSession = MySQLStore(session)
const sessionStore = new MySQLStoreSession({
  clearExpired: true,
  checkExpirationInterval: 900000, // 15 minutos
  expiration: 86400000, // 24 horas
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
}, pool)

app.use(session({
  key: 'converter_session',
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
  }
}))

// Inicializar Passport
app.use(passport.initialize())
app.use(passport.session())

// Rota principal
app.get("/", (req, res) => {
  res.send("Conversor - API de Conversão de Arquivos")
})

// Rotas de autenticação (públicas)
app.use("/auth", auth)

// Rotas de conversão (protegidas - requerem login)
app.use("/convert", requireAuth, convert)
app.use("/convert", requireAuth, wordToPdf)
app.use("/convert", requireAuth, pdfToWord)
app.use("/convert", requireAuth, imageResize)
app.use("/convert", requireAuth, imageConverter)
app.use("/convert", requireAuth, imageToIcon)
app.use("/convert", requireAuth, backgroundRemover)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
