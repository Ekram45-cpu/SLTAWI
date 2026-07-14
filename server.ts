import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), 'db.json');

app.use(express.json({ limit: '10mb' }));

// Simple Auth Token Store (in-memory mock JWT storage for security)
const sessionTokens = new Map<string, any>();

// Helper to load or initialize DB
function getDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initialDB = {
      users: [
        { id: 'u1', username: 'admin', password: 'password123', name: 'Abebe Kebede', role: 'Admin', email: 'abebe@siltawi.com', createdAt: new Date().toISOString() },
        { id: 'u2', username: 'manager', password: 'password123', name: 'Saba Hailu', role: 'Manager', email: 'saba@siltawi.com', createdAt: new Date().toISOString() },
        { id: 'u3', username: 'staff', password: 'password123', name: 'Kidus Yosef', role: 'Staff', email: 'kidus@siltawi.com', createdAt: new Date().toISOString() }
      ],
      menuItems: [
        {
          id: 'm1',
          name: 'Traditional Ethiopian Coffee Ceremony',
          description: 'Freshly roasted organic Arabica beans, brewed in a traditional clay jebena. Served with complimentary popcorn and traditional incense.',
          price: 180,
          category: 'Drinks',
          images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'],
          isPopular: true,
          views: 342,
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'm2',
          name: 'Special Sheba Platter (Agelgil)',
          description: 'A traditional leather-wrapped agelgil basket layered with injera, key wat, doro wat, tibs, gomen, and shiro. Feeds 2-3 people.',
          price: 750,
          category: 'Food',
          images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'],
          isPopular: true,
          views: 521,
          createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'm3',
          name: 'Spicy Avocado Spris Juice',
          description: 'Thick, layered avocado, mango, and papaya purée with a squeeze of fresh lime and optional chili syrup.',
          price: 140,
          category: 'Drinks',
          images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80'],
          isPopular: false,
          views: 120,
          createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'm4',
          name: 'Gondar Beef Tibs',
          description: 'Tender beef cubes sautéed in purified spiced butter, onions, garlic, rosemary, and green chilies. Served with warm honey mustard dip.',
          price: 480,
          category: 'Food',
          images: ['https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80'],
          isPopular: true,
          views: 405,
          createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'm5',
          name: 'Tej-infused Honey Glazed Wings',
          description: 'Crispy chicken wings glazed in a rich reduction of traditional Ethiopian honey wine (Tej) and berbere spice.',
          price: 320,
          category: 'Starters',
          images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80'],
          isPopular: false,
          views: 189,
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'm6',
          name: 'Crispy Lentil Sambusas',
          description: 'Three crispy pastry shells stuffed with seasoned green lentils, onions, garlic, and jalapeños. Perfect starter.',
          price: 120,
          category: 'Starters',
          images: ['https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80'],
          isPopular: false,
          views: 280,
          createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'm7',
          name: 'Teff Flour Chocolate Decadence',
          description: 'A rich, gluten-free molten chocolate cake crafted with organic Ethiopian teff flour, served with honey vanilla ice cream.',
          price: 250,
          category: 'Desserts',
          images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80'],
          isPopular: true,
          views: 310,
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2));
    return initialDB;
  }
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeDB(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Authentication Middleware
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const user = sessionTokens.get(token);
  if (!user) {
    return res.status(403).json({ error: 'Invalid or expired session token' });
  }

  req.user = user;
  next();
}

// Check Role-Based Access Control
function requireRole(roles: string[]) {
  return (req: any, res: any, next: any) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permission denied. Insufficient privileges.' });
    }
    next();
  };
}

// ==========================================
// API ENDPOINTS
// ==========================================

// Auth API
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const db = getDB();
  const user = db.users.find((u: any) => u.username.toLowerCase() === username.toLowerCase() && u.password === password);

  if (!user) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  // Create simple unique session token
  const token = `siltawi_token_${Math.random().toString(36).substr(2)}${Date.now()}`;
  const userResponse = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    email: user.email,
    createdAt: user.createdAt
  };
  sessionTokens.set(token, userResponse);

  res.json({ token, user: userResponse });
});

app.post('/api/auth/logout', authenticateToken, (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    sessionTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

app.get('/api/auth/me', authenticateToken, (req: any, res) => {
  res.json({ user: req.user });
});

app.post('/api/auth/change-password', authenticateToken, (req: any, res) => {
  const { currentPassword, newPassword } = req.body;
  const db = getDB();
  const dbUser = db.users.find((u: any) => u.id === req.user.id);

  if (!dbUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (dbUser.password !== currentPassword) {
    return res.status(400).json({ error: 'Incorrect current password' });
  }

  dbUser.password = newPassword;
  writeDB(db);
  res.json({ success: true, message: 'Password updated successfully' });
});

// Menu Analytics increment (Public)
app.post('/api/menu/:id/view', (req, res) => {
  const { id } = req.params;
  const db = getDB();
  const item = db.menuItems.find((m: any) => m.id === id);

  if (item) {
    item.views = (item.views || 0) + 1;
    writeDB(db);
    return res.json({ success: true, views: item.views });
  }
  res.status(404).json({ error: 'Item not found' });
});

// Analytics Summary Endpoint (Requires auth or can be public for UI showcasing)
app.get('/api/analytics', (req, res) => {
  const db = getDB();
  const totalItems = db.menuItems.length;
  const totalViews = db.menuItems.reduce((acc: number, item: any) => acc + (item.views || 0), 0);
  const totalEmployees = db.users.length;
  
  // Get top 4 most popular items by views
  const popularItems = [...db.menuItems]
    .sort((a: any, b: any) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);

  res.json({
    totalItems,
    totalViews,
    totalEmployees,
    popularItems
  });
});

// Menu API: Paginated, Filtered, and Sorted
app.get('/api/menu', (req, res) => {
  const db = getDB();
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 6;
  const category = req.query.category as string;
  const isPopular = req.query.isPopular === 'true';
  const search = req.query.search as string;
  const sortBy = req.query.sortBy as string || 'name'; // 'name', 'price', 'views', 'createdAt'
  const sortOrder = req.query.sortOrder as string || 'asc'; // 'asc', 'desc'

  let filteredItems = [...db.menuItems];

  // Filtering
  if (category && category !== 'All') {
    filteredItems = filteredItems.filter((item: any) => item.category === category);
  }
  if (isPopular) {
    filteredItems = filteredItems.filter((item: any) => item.isPopular);
  }
  if (search) {
    const q = search.toLowerCase();
    filteredItems = filteredItems.filter((item: any) => 
      item.name.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q)
    );
  }

  // Sorting
  filteredItems.sort((a: any, b: any) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const total = filteredItems.length;
  const startIndex = (page - 1) * limit;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + limit);

  res.json({
    items: paginatedItems,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  });
});

// Menu Create (RBAC: Admin, Manager)
app.post('/api/menu', authenticateToken, requireRole(['Admin', 'Manager']), (req, res) => {
  const { name, description, price, category, images, isPopular } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Name, price, and category are required' });
  }

  const db = getDB();
  const newItem = {
    id: `m_${Math.random().toString(36).substr(2)}${Date.now()}`,
    name,
    description: description || '',
    price: parseFloat(price),
    category,
    images: images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'],
    isPopular: !!isPopular,
    views: 0,
    createdAt: new Date().toISOString()
  };

  db.menuItems.push(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

// Menu Update (RBAC: Admin, Manager)
app.put('/api/menu/:id', authenticateToken, requireRole(['Admin', 'Manager']), (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, images, isPopular } = req.body;

  const db = getDB();
  const itemIndex = db.menuItems.findIndex((m: any) => m.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const existing = db.menuItems[itemIndex];
  db.menuItems[itemIndex] = {
    ...existing,
    name: name !== undefined ? name : existing.name,
    description: description !== undefined ? description : existing.description,
    price: price !== undefined ? parseFloat(price) : existing.price,
    category: category !== undefined ? category : existing.category,
    images: images !== undefined ? images : existing.images,
    isPopular: isPopular !== undefined ? !!isPopular : existing.isPopular
  };

  writeDB(db);
  res.json(db.menuItems[itemIndex]);
});

// Menu Delete (RBAC: Admin only)
app.delete('/api/menu/:id', authenticateToken, requireRole(['Admin']), (req, res) => {
  const { id } = req.params;
  const db = getDB();
  const filtered = db.menuItems.filter((m: any) => m.id !== id);

  if (filtered.length === db.menuItems.length) {
    return res.status(404).json({ error: 'Item not found' });
  }

  db.menuItems = filtered;
  writeDB(db);
  res.json({ success: true, message: 'Item deleted successfully' });
});

// Employees API (RBAC: Admin, Manager)
app.get('/api/employees', authenticateToken, requireRole(['Admin', 'Manager']), (req, res) => {
  const db = getDB();
  const sanitizedUsers = db.users.map((u: any) => ({
    id: u.id,
    username: u.username,
    name: u.name,
    role: u.role,
    email: u.email,
    createdAt: u.createdAt
  }));
  res.json(sanitizedUsers);
});

// Create Employee (RBAC: Admin only)
app.post('/api/employees', authenticateToken, requireRole(['Admin']), (req, res) => {
  const { username, password, name, role, email } = req.body;

  if (!username || !password || !name || !role || !email) {
    return res.status(400).json({ error: 'Username, password, name, role, and email are required' });
  }

  const db = getDB();
  if (db.users.find((u: any) => u.username.toLowerCase() === username.toLowerCase())) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const newUser = {
    id: `u_${Math.random().toString(36).substr(2)}${Date.now()}`,
    username: username.toLowerCase(),
    password,
    name,
    role,
    email,
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDB(db);

  const { password: _, ...sanitized } = newUser;
  res.status(201).json(sanitized);
});

// Update Employee (RBAC: Admin only)
app.put('/api/employees/:id', authenticateToken, requireRole(['Admin']), (req, res) => {
  const { id } = req.params;
  const { name, role, email, password } = req.body;

  const db = getDB();
  const userIndex = db.users.findIndex((u: any) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const existing = db.users[userIndex];
  db.users[userIndex] = {
    ...existing,
    name: name !== undefined ? name : existing.name,
    role: role !== undefined ? role : existing.role,
    email: email !== undefined ? email : existing.email,
    password: password !== undefined && password !== '' ? password : existing.password
  };

  writeDB(db);

  const { password: _, ...sanitized } = db.users[userIndex];
  res.json(sanitized);
});

// Delete Employee (RBAC: Admin only)
app.delete('/api/employees/:id', authenticateToken, requireRole(['Admin']), (req, res) => {
  const { id } = req.params;

  if (id === 'u1') {
    return res.status(400).json({ error: 'Cannot delete the primary root admin account' });
  }

  const db = getDB();
  const filtered = db.users.filter((u: any) => u.id !== id);

  if (filtered.length === db.users.length) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  db.users = filtered;
  writeDB(db);
  res.json({ success: true, message: 'Employee deleted successfully' });
});

// ==========================================
// VITE OR STATIC SERVING MIDDLEWARE
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static files from dist/');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
  });
}

startServer();
