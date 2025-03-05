import express from 'express';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config({ path: './backend.env' });

// Database connection
const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'webshoppp',
  password: process.env.DB_PASS || 'Premo900',
  database: process.env.DB_NAME || 'webshoppp'
});

console.log('Connected to database');

// SendGrid setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// 🔹 Regisztráció
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const [users] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
    if (users.length > 0) {
      return res.status(400).json({ error: 'Ez az email már regisztrálva van!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute('INSERT INTO user (felhasznalonev, email, jelszo) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    // Return user data for automatic login
    res.status(201).json({ 
      message: 'Sikeres regisztráció!',
      user: {
        username: name,
        email: email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Adatbázis hiba!' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
      const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);

      if (rows.length === 0) {
          return res.status(400).json({ error: 'Felhasználó nem található!' });
      }

      const user = rows[0];
      // Mivel a regisztráció működik, használjuk ugyanazt a jelszó ellenőrzést
      const isMatch = await bcrypt.compare(password, user.jelszo);

      if (!isMatch) {
          return res.status(400).json({ error: 'Hibás jelszó!' });
      }

      return res.json({ 
          success: true,
          message: 'Sikeres bejelentkezés!',
          user: {
              username: user.felhasznalonev,
              email: user.email
          }
      });

  } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ error: 'Szerver hiba!' });
  }
});



sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send-confirmation', async (req, res) => {
  const { email, name, orderId } = req.body;
  
  const msg = {
    to: email,
    from: {
      name: 'Adali Clothing',
      email: 'adaliclothing@gmail.com'  // Verified sender
    },
    subject: 'Rendelés visszaigazolás - Adali Clothing',
    html: `
      <h2>Kedves ${name}!</h2>
      <p>Köszönjük, hogy nálunk vásárolt!</p>
      <p>Rendelési azonosító: #${orderId}</p>
    `
  };

  try {
    console.log('Attempting to send email with SendGrid...');
    const result = await sgMail.send(msg);
    console.log('SendGrid Response:', result);
    res.json({ success: true });
  } catch (error) {
    console.error('Detailed SendGrid Error:', error.response?.body);
    res.status(500).json({ 
      error: 'Email sending failed',
      details: error.response?.body?.errors 
    });
  }
});
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

