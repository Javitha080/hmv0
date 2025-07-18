const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const ExpressBrute = require('express-brute');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'a-super-secret-key', // Replace with a strong secret in a real application
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// In-memory store for Brute-force protection
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour
  failCallback: (req, res, next, nextValidRequestDate) => {
    res.status(429).send('Too many failed login attempts. Please try again later.');
  }
});

// Serve static files
app.use(express.static(__dirname));

// --- Hardcoded user for now ---
const users = {
  editor: {
    // password is "password"
    hash: '$2b$10$f/7S.MTv2msm6S5K4ULd.O4.2J2D9.JdG/Cq/c.b.L.L.H.w.H.H'
  }
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const SECURE_ROUTE = 'ffa3eea53d653948ca6f2f1b195d1dc425940171f97ee0527e70e57fac170a00';

// CMS Login Route
app.get(`/${SECURE_ROUTE}/login`, (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Login POST handler
app.post(`/${SECURE_ROUTE}/login`, bruteforce.prevent, (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (user) {
    bcrypt.compare(password, user.hash, (err, result) => {
      if (result) {
        req.session.user = username;
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// CMS Dashboard Route (Protected)
app.get(`/${SECURE_ROUTE}`, (req, res) => {
  if (req.session.user) {
    res.sendFile(__dirname + '/cms.html');
  } else {
    res.redirect(`/${SECURE_ROUTE}/login`);
  }
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect(`/${SECURE_ROUTE}/login`);
});

// --- Gallery API Routes ---

// GET all gallery items
app.get('/api/gallery', (req, res) => {
  fs.readFile('gallery.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading gallery data' });
    }
    res.json(JSON.parse(data));
  });
});

// POST a new gallery item
app.post('/api/gallery', (req, res) => {
  fs.readFile('gallery.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading gallery data' });
    }
    const gallery = JSON.parse(data);
    const newItem = {
      id: Date.now(),
      ...req.body
    };
    gallery.push(newItem);
    fs.writeFile('gallery.json', JSON.stringify(gallery, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing gallery data' });
      }
      res.status(201).json(newItem);
    });
  });
});

// PUT (update) a gallery item
app.put('/api/gallery/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  fs.readFile('gallery.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading gallery data' });
    }
    let gallery = JSON.parse(data);
    const itemIndex = gallery.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }
    gallery[itemIndex] = { ...gallery[itemIndex], ...req.body };
    fs.writeFile('gallery.json', JSON.stringify(gallery, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing gallery data' });
      }
      res.json(gallery[itemIndex]);
    });
  });
});

// DELETE a gallery item
app.delete('/api/gallery/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  fs.readFile('gallery.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading gallery data' });
    }
    let gallery = JSON.parse(data);
    const updatedGallery = gallery.filter(item => item.id !== itemId);
    if (gallery.length === updatedGallery.length) {
      return res.status(404).json({ message: 'Item not found' });
    }
    fs.writeFile('gallery.json', JSON.stringify(updatedGallery, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing gallery data' });
      }
      res.status(204).send();
    });
  });
});

// --- News API Routes ---

// GET all news items
app.get('/api/news', (req, res) => {
  fs.readFile('news.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading news data' });
    }
    res.json(JSON.parse(data));
  });
});

// POST a new news item
app.post('/api/news', (req, res) => {
  fs.readFile('news.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading news data' });
    }
    const news = JSON.parse(data);
    const newItem = {
      id: Date.now(),
      ...req.body
    };
    news.push(newItem);
    fs.writeFile('news.json', JSON.stringify(news, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing news data' });
      }
      res.status(201).json(newItem);
    });
  });
});

// PUT (update) a news item
app.put('/api/news/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  fs.readFile('news.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading news data' });
    }
    let news = JSON.parse(data);
    const itemIndex = news.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }
    news[itemIndex] = { ...news[itemIndex], ...req.body };
    fs.writeFile('news.json', JSON.stringify(news, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing news data' });
      }
      res.json(news[itemIndex]);
    });
  });
});

// DELETE a news item
app.delete('/api/news/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  fs.readFile('news.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading news data' });
    }
    let news = JSON.parse(data);
    const updatedNews = news.filter(item => item.id !== itemId);
    if (news.length === updatedNews.length) {
      return res.status(404).json({ message: 'Item not found' });
    }
    fs.writeFile('news.json', JSON.stringify(updatedNews, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing news data' });
      }
      res.status(204).send();
    });
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
