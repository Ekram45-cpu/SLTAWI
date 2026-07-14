import React, { useState, useEffect } from 'react';
import { User, Role, MenuItem, MenuCategory, StatsOverview } from '../types';
import { ShieldCheck, LogIn, KeyRound, LayoutDashboard, Utensils, Users, Lock, ChevronLeft, ChevronRight, Plus, Trash2, Edit3, Eye, AlertCircle, FileSpreadsheet, ClipboardList, CheckCircle } from 'lucide-react';

interface AdminViewProps {
  token: string | null;
  currentUser: User | null;
  onLoginSuccess: (token: string, user: User) => void;
  onLogout: () => void;
}

export default function AdminView({ token, currentUser, onLoginSuccess, onLogout }: AdminViewProps) {
  // Login credentials state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // active sub-tab inside admin panel: 'dashboard', 'menu', 'employees', 'profile'
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'menu' | 'employees' | 'profile'>('dashboard');

  // Stats / Dashboard state
  const [stats, setStats] = useState<StatsOverview | null>(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState({ text: '', isError: false });

  // Menu items list (Admin view with pagination and search)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuTotalPages, setMenuTotalPages] = useState(1);
  const [menuPage, setMenuPage] = useState(1);
  const [menuFilterCategory, setMenuFilterCategory] = useState('All');
  const [menuSearchQuery, setMenuSearchQuery] = useState('');

  // Employee list state
  const [employees, setEmployees] = useState<User[]>([]);

  // Modals / Form states
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemCategory, setItemCategory] = useState<MenuCategory>('Food');
  const [itemImagesInput, setItemImagesInput] = useState(''); // comma-separated strings
  const [itemIsPopular, setItemIsPopular] = useState(false);
  const [menuFormError, setMenuFormError] = useState('');

  // Employee CRUD Modal / Form state
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<User | null>(null);
  const [empUsername, setEmpUsername] = useState('');
  const [empPassword, setEmpPassword] = useState('');
  const [empName, setEmpName] = useState('');
  const [empRole, setEmpRole] = useState<Role>('Staff');
  const [empEmail, setEmpEmail] = useState('');
  const [empFormError, setEmpFormError] = useState('');

  // Notification banners
  const [bannerMsg, setBannerMsg] = useState({ text: '', isError: false });

  // Fetch Dashboard Stats
  const fetchDashboardStats = async () => {
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching dashboard metrics:', err);
    }
  };

  // Fetch Menu items for CRUD with filters and pagination
  const fetchAdminMenuItems = async () => {
    try {
      const params = new URLSearchParams({
        page: menuPage.toString(),
        limit: '8',
        category: menuFilterCategory,
        search: menuSearchQuery
      });
      const res = await fetch(`/api/menu?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data.items);
        setMenuTotalPages(data.totalPages);
      }
    } catch (err) {
      console.error('Error fetching admin menu items:', err);
    }
  };

  // Fetch Employees List (RBAC: Admin, Manager)
  const fetchEmployees = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/employees', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setEmployees(data);
      }
    } catch (err) {
      console.error('Error fetching employee directory:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardStats();
      fetchAdminMenuItems();
      if (currentUser?.role === 'Admin' || currentUser?.role === 'Manager') {
        fetchEmployees();
      }
    }
  }, [token, menuPage, menuFilterCategory, currentUser]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data.token, data.user);
        setUsername('');
        setPassword('');
      } else {
        setLoginError(data.error || 'Login failed. Please verify credentials.');
      }
    } catch (err) {
      setLoginError('Server connection failed. Is Express running?');
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage({ text: '', isError: false });
    if (!token) return;

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordMessage({ text: 'Password successfully changed!', isError: false });
        setCurrentPassword('');
        setNewPassword('');
      } else {
        setPasswordMessage({ text: data.error || 'Password update failed', isError: true });
      }
    } catch (err) {
      setPasswordMessage({ text: 'Error communication with backend auth', isError: true });
    }
  };

  // Handle Delete Menu Item (RBAC: Admin only)
  const handleDeleteMenuItem = async (id: string) => {
    if (currentUser?.role !== 'Admin') {
      setBannerMsg({ text: 'RBAC Access Denied: Only Admins can delete items. Managers and Staff are blocked.', isError: true });
      setTimeout(() => setBannerMsg({ text: '', isError: false }), 5000);
      return;
    }

    if (!confirm('Are you absolutely sure you want to delete this menu item?')) return;

    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setBannerMsg({ text: 'Menu item deleted successfully from db.json!', isError: false });
        fetchAdminMenuItems();
        fetchDashboardStats();
      } else {
        const errData = await res.json();
        setBannerMsg({ text: errData.error || 'Delete failed', isError: true });
      }
    } catch (err) {
      setBannerMsg({ text: 'Error executing delete endpoint', isError: true });
    }
    setTimeout(() => setBannerMsg({ text: '', isError: false }), 5000);
  };

  // Open Create Menu Item Modal
  const openCreateItemModal = () => {
    if (currentUser?.role === 'Staff') {
      setBannerMsg({ text: 'RBAC Lock: Staff role is restricted from adding or updating inventory.', isError: true });
      setTimeout(() => setBannerMsg({ text: '', isError: false }), 5000);
      return;
    }
    setEditingItem(null);
    setItemName('');
    setItemDesc('');
    setItemPrice(0);
    setItemCategory('Food');
    setItemImagesInput('');
    setItemIsPopular(false);
    setMenuFormError('');
    setItemModalOpen(true);
  };

  // Open Edit Menu Item Modal
  const openEditItemModal = (item: MenuItem) => {
    if (currentUser?.role === 'Staff') {
      setBannerMsg({ text: 'RBAC Lock: Staff role is restricted from adding or updating inventory.', isError: true });
      setTimeout(() => setBannerMsg({ text: '', isError: false }), 5000);
      return;
    }
    setEditingItem(item);
    setItemName(item.name);
    setItemDesc(item.description);
    setItemPrice(item.price);
    setItemCategory(item.category);
    setItemImagesInput(item.images.join(', '));
    setItemIsPopular(item.isPopular);
    setMenuFormError('');
    setItemModalOpen(true);
  };

  // Handle Save Menu Item Form (Create or Edit)
  const handleSaveMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setMenuFormError('');

    if (!itemName || itemPrice <= 0) {
      setMenuFormError('Name and valid Price are required.');
      return;
    }

    const imagesArray = itemImagesInput
      ? itemImagesInput.split(',').map((url) => url.trim()).filter((url) => url !== '')
      : [];

    const payload = {
      name: itemName,
      description: itemDesc,
      price: itemPrice,
      category: itemCategory,
      images: imagesArray,
      isPopular: itemIsPopular
    };

    try {
      const url = editingItem ? `/api/menu/${editingItem.id}` : '/api/menu';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setItemModalOpen(false);
        setBannerMsg({
          text: editingItem ? 'Item updated successfully!' : 'New menu item created!',
          isError: false
        });
        fetchAdminMenuItems();
        fetchDashboardStats();
      } else {
        setMenuFormError(data.error || 'Failed to save menu item');
      }
    } catch (err) {
      setMenuFormError('Network communication failure with server API.');
    }
    setTimeout(() => setBannerMsg({ text: '', isError: false }), 5000);
  };

  // Open Employee Create/Edit Modal
  const openCreateEmployeeModal = () => {
    if (currentUser?.role !== 'Admin') {
      setBannerMsg({ text: 'RBAC Restricted: Only Admin accounts can manage employees.', isError: true });
      setTimeout(() => setBannerMsg({ text: '', isError: false }), 5000);
      return;
    }
    setEditingEmployee(null);
    setEmpUsername('');
    setEmpPassword('');
    setEmpName('');
    setEmpRole('Staff');
    setEmpEmail('');
    setEmpFormError('');
    setEmployeeModalOpen(true);
  };

  const openEditEmployeeModal = (emp: User) => {
    if (currentUser?.role !== 'Admin') {
      setBannerMsg({ text: 'RBAC Restricted: Only Admin accounts can manage employees.', isError: true });
      setTimeout(() => setBannerMsg({ text: '', isError: false }), 5000);
      return;
    }
    setEditingEmployee(emp);
    setEmpUsername(emp.username);
    setEmpPassword('');
    setEmpName(emp.name);
    setEmpRole(emp.role);
    setEmpEmail(emp.email);
    setEmpFormError('');
    setEmployeeModalOpen(true);
  };

  // Save Employee Form (Create / Edit)
  const handleSaveEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmpFormError('');

    if (!empUsername || !empName || !empEmail) {
      setEmpFormError('Username, Name, and Email are required.');
      return;
    }

    if (!editingEmployee && !empPassword) {
      setEmpFormError('Password is required for new employees.');
      return;
    }

    const payload: any = {
      username: empUsername,
      name: empName,
      role: empRole,
      email: empEmail
    };

    if (empPassword) {
      payload.password = empPassword;
    }

    try {
      const url = editingEmployee ? `/api/employees/${editingEmployee.id}` : '/api/employees';
      const method = editingEmployee ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setEmployeeModalOpen(false);
        setBannerMsg({
          text: editingEmployee ? 'Employee updated successfully!' : 'New employee registered!',
          isError: false
        });
        fetchEmployees();
        fetchDashboardStats();
      } else {
        setEmpFormError(data.error || 'Failed to register employee');
      }
    } catch (err) {
      setEmpFormError('Network communication error with server API.');
    }
    setTimeout(() => setBannerMsg({ text: '', isError: false }), 5000);
  };

  // Handle Delete Employee (RBAC: Admin only)
  const handleDeleteEmployee = async (id: string) => {
    if (currentUser?.role !== 'Admin') {
      setBannerMsg({ text: 'RBAC Restricted: Only Admin accounts can delete employees.', isError: true });
      setTimeout(() => setBannerMsg({ text: '', isError: false }), 5000);
      return;
    }

    if (id === 'u1') {
      alert('Cannot delete the root admin master account!');
      return;
    }

    if (!confirm('Are you absolutely sure you want to delete this employee? This will revoke all dashboard access.')) return;

    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setBannerMsg({ text: 'Employee credentials revoked successfully.', isError: false });
        fetchEmployees();
        fetchDashboardStats();
      } else {
        const data = await res.json();
        setBannerMsg({ text: data.error || 'Failed to revoke employee', isError: true });
      }
    } catch (err) {
      setBannerMsg({ text: 'Network failure revoking credentials.', isError: true });
    }
    setTimeout(() => setBannerMsg({ text: '', isError: false }), 5000);
  };

  // ==========================================
  // VIEW RENDER: LOGIN PORTAL
  // ==========================================
  if (!token || !currentUser) {
    return (
      <div id="admin-login-portal" className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 max-w-md w-full shadow-lg space-y-8">
          
          <div className="text-center space-y-3">
            <div className="p-3 bg-orange-50 text-orange-500 rounded-full inline-block">
              <Lock className="w-8 h-8 animate-pulse" />
            </div>
            <h2 className="font-sans font-extrabold text-2xl text-slate-950">Siltawi Admin Portal</h2>
            <p className="text-slate-500 text-xs sm:text-sm">Enter registered credentials to access internal inventory and employee matrices.</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-100 text-red-800 p-4 rounded-xl flex items-start gap-2.5 text-xs font-semibold animate-bounce-slow">
              <AlertCircle className="w-4.5 h-4.5 text-red-500 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Quick guide indicators */}
          <div className="bg-orange-50/50 border border-orange-200/50 p-4 rounded-xl space-y-2 text-xs">
            <span className="block font-bold text-orange-950">Intelligent Pre-seeded Test Profiles:</span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
              <div>Username: <span className="font-bold text-slate-900">admin</span></div>
              <div>Password: <span className="font-bold text-slate-900">password123</span></div>
              <div>Username: <span className="font-bold text-slate-900">manager</span></div>
              <div>Password: <span className="font-bold text-slate-900">password123</span></div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Username</label>
              <input
                required
                type="text"
                placeholder="admin / manager / staff"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Password</label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
            >
              <LogIn className="w-4.5 h-4.5 text-white" /> Secure Authorize Entry
            </button>
          </form>

        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW RENDER: LOGGED IN WORKSPACE
  // ==========================================
  return (
    <div id="admin-dashboard-workspace" className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Workspace Top Banner bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4.5">
            <div className="p-3 bg-orange-50 text-orange-500 rounded-xl">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Active Secure Session</div>
              <h2 className="text-lg font-extrabold text-slate-950 font-sans flex items-center gap-2">
                {currentUser.name}
                <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {currentUser.role}
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-semibold">{currentUser.email}</span>
            <button
              id="admin-workspace-logout"
              onClick={onLogout}
              className="px-4.5 py-2.5 border border-red-200 text-red-600 font-bold rounded-xl text-xs hover:bg-red-50 transition-all"
            >
              Terminate Session
            </button>
          </div>
        </div>

        {/* Global Banner Messages */}
        {bannerMsg.text && (
          <div className={`p-4.5 rounded-2xl flex items-center gap-3 text-sm font-bold border animate-bounce-slow ${
            bannerMsg.isError ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'
          }`}>
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{bannerMsg.text}</span>
          </div>
        )}

        {/* Workspace Horizontal Navigation tabs */}
        <div className="border-b border-slate-200 flex flex-wrap gap-2 pb-1.5">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`px-4.5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'dashboard' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard Analytics
          </button>

          <button
            onClick={() => setActiveSubTab('menu')}
            className={`px-4.5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'menu' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Utensils className="w-4 h-4" /> Menu Management
          </button>

          {(currentUser.role === 'Admin' || currentUser.role === 'Manager') && (
            <button
              onClick={() => setActiveSubTab('employees')}
              className={`px-4.5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'employees' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4" /> Employee & RBAC Matrix
            </button>
          )}

          <button
            onClick={() => setActiveSubTab('profile')}
            className={`px-4.5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'profile' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <KeyRound className="w-4 h-4" /> Credentials Profile
          </button>
        </div>

        {/* ==========================================
            SUB-TAB: DASHBOARD ANALYTICS
            ========================================== */}
        {activeSubTab === 'dashboard' && stats && (
          <div id="subtab-dashboard-view" className="space-y-8 animate-fade-in">
            
            {/* Quick stats board */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                <div className="p-4 bg-orange-100 rounded-xl text-orange-600">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-950">{stats.totalItems}</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Menu Items</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                <div className="p-4 bg-orange-100 rounded-xl text-orange-600">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-950">{stats.totalViews}</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">All-Time Views logged</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                <div className="p-4 bg-orange-100 rounded-xl text-orange-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-950">{stats.totalEmployees}</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Registered Workers</div>
                </div>
              </div>
            </div>

            {/* Popular items detail list */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-sans font-extrabold text-slate-950 text-base sm:text-lg flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-orange-500" /> Popularity Leaderboard (Views tracked in db.json)
                </h3>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Live attribution</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.popularItems && stats.popularItems.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-4 p-4.5 bg-slate-50 border border-slate-150 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-slate-950 text-orange-500 font-bold flex items-center justify-center flex-shrink-0">
                      #{idx + 1}
                    </div>
                    <img src={item.images[0]} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-grow space-y-1">
                      <h4 className="font-bold text-sm text-slate-950 truncate">{item.name}</h4>
                      <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
                        <span className="text-orange-600 font-extrabold">{item.price} ETB</span>
                        <span>•</span>
                        <span>{item.views || 0} Views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RBAC Rules Showcase box */}
            <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-bold text-orange-500 text-sm tracking-wider uppercase">Role-Based Access Control Rulebook</h4>
                <p className="text-slate-400 text-xs">Security restrictions are hardcoded in server.ts and fully verified per JWT request.</p>
              </div>

              <div className="flex flex-wrap gap-4 text-xs">
                <div className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="font-bold block text-white">Staff</span>
                  <span className="block text-[10px] text-slate-400">Read menu & profile</span>
                </div>
                <div className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="font-bold block text-white">Manager</span>
                  <span className="block text-[10px] text-slate-400">CRUD Menu only</span>
                </div>
                <div className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="font-bold block text-white">Admin</span>
                  <span className="block text-[10px] text-slate-400">Total access, CRUD employees</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            SUB-TAB: MENU MANAGEMENT
            ========================================== */}
        {activeSubTab === 'menu' && (
          <div id="subtab-menu-management" className="space-y-6 animate-fade-in">
            
            {/* Filtering / Adding Toolbar */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {['All', 'Food', 'Drinks', 'Desserts', 'Starters'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setMenuFilterCategory(cat);
                      setMenuPage(1);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      menuFilterCategory === cat ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                id="admin-create-item-btn"
                onClick={openCreateItemModal}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Menu Item
              </button>
            </div>

            {/* List Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                      <th className="p-4">Item Details</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price (ETB)</th>
                      <th className="p-4">Views Recorded</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {menuItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={item.images[0]} alt={item.name} className="w-11 h-11 rounded-lg object-cover" />
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 truncate max-w-[200px]">{item.name}</div>
                              <div className="text-xs text-slate-400 truncate max-w-[200px]">{item.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-slate-700">{item.category}</td>
                        <td className="p-4 font-bold text-slate-950">{item.price} ETB</td>
                        <td className="p-4 text-slate-500 font-medium">{item.views || 0} views</td>
                        <td className="p-4">
                          {item.isPopular ? (
                            <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Popular</span>
                          ) : (
                            <span className="text-slate-400 text-xs">Standard</span>
                          )}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            id={`edit-item-${item.id}`}
                            onClick={() => openEditItemModal(item)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors inline-block"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            id={`delete-item-${item.id}`}
                            onClick={() => handleDeleteMenuItem(item.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors inline-block"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Server-Side Pagination under table */}
              {menuTotalPages > 1 && (
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">
                    Page {menuPage} of {menuTotalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={menuPage === 1}
                      onClick={() => setMenuPage((p) => Math.max(p - 1, 1))}
                      className="p-1.5 rounded bg-white border border-slate-200 text-slate-700 disabled:opacity-50 text-xs font-bold"
                    >
                      Prev
                    </button>
                    <button
                      disabled={menuPage === menuTotalPages}
                      onClick={() => setMenuPage((p) => Math.min(p + 1, menuTotalPages))}
                      className="p-1.5 rounded bg-white border border-slate-200 text-slate-700 disabled:opacity-50 text-xs font-bold"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ==========================================
            SUB-TAB: EMPLOYEE & RBAC MATRIX
            ========================================== */}
        {activeSubTab === 'employees' && (
          <div id="subtab-employee-matrix" className="space-y-6 animate-fade-in">
            
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="space-y-1">
                <h3 className="font-sans font-extrabold text-slate-950 text-base">Personnel Matrices</h3>
                <p className="text-xs text-slate-500">Only Admin master accounts possess privilege levels to add, edit, or revoke credentials.</p>
              </div>

              <button
                id="admin-create-emp-btn"
                onClick={openCreateEmployeeModal}
                className="w-full sm:w-auto px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add New Staff / Manager
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                      <th className="p-4">Employee Name</th>
                      <th className="p-4">Username</th>
                      <th className="p-4">Role Privileges</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Registered Date</th>
                      <th className="p-4 text-right">Revoke Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{emp.name}</div>
                        </td>
                        <td className="p-4 font-mono text-xs text-slate-600">{emp.username}</td>
                        <td className="p-4">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            emp.role === 'Admin' ? 'bg-red-100 text-red-800' : emp.role === 'Manager' ? 'bg-orange-100 text-orange-800' : 'bg-slate-150 text-slate-800'
                          }`}>
                            {emp.role}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">{emp.email}</td>
                        <td className="p-4 text-xs text-slate-400">{new Date(emp.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => openEditEmployeeModal(emp)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors inline-block text-xs"
                            title="Edit employee"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            disabled={emp.id === 'u1'}
                            onClick={() => handleDeleteEmployee(emp.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors inline-block disabled:opacity-40"
                            title="Revoke access"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            SUB-TAB: CREDENTIALS PROFILE
            ========================================== */}
        {activeSubTab === 'profile' && (
          <div id="subtab-profile-settings" className="max-w-xl mx-auto bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-6 animate-fade-in">
            <h3 className="font-sans font-extrabold text-slate-950 text-lg flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-orange-500" /> Authorized Password Change
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">Verify your old secret string prior to storing a new pass key onto server-side memory.</p>

            {passwordMessage.text && (
              <div className={`p-4.5 rounded-xl border text-xs font-semibold ${
                passwordMessage.isError ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'
              }`}>
                {passwordMessage.text}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Current Password</label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">New Password</label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-xl text-sm transition-all"
              >
                Store Credentials Change
              </button>
            </form>
          </div>
        )}

      </div>

      {/* ==========================================
          MODAL: MENU ITEM CRUD FORM
          ========================================== */}
      {itemModalOpen && (
        <div id="menu-crud-modal" className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-fade-in relative p-6 sm:p-8 space-y-6">
            
            <h3 className="font-sans font-extrabold text-slate-950 text-xl">
              {editingItem ? 'Edit Menu Item' : 'Create New Menu Item'}
            </h3>

            {menuFormError && (
              <div className="bg-red-50 border border-red-100 text-red-800 p-3.5 rounded-xl text-xs font-semibold">
                {menuFormError}
              </div>
            )}

            <form onSubmit={handleSaveMenuItem} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-700">Item Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="E.g. Spiced Beef Tibs"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-700">Price (ETB) *</label>
                  <input
                    required
                    type="number"
                    placeholder="450"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-700">Category *</label>
                  <select
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value as MenuCategory)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-950 text-xs sm:text-sm bg-white focus:outline-none"
                  >
                    <option>Food</option>
                    <option>Drinks</option>
                    <option>Desserts</option>
                    <option>Starters</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1">Popular Choice?</label>
                  <div className="flex items-center h-10">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                      <input
                        type="checkbox"
                        checked={itemIsPopular}
                        onChange={(e) => setItemIsPopular(e.target.checked)}
                        className="rounded border-slate-300 text-orange-500 focus:ring-orange-500 w-4.5 h-4.5"
                      />
                      Enable Star
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-700">Item Description</label>
                <textarea
                  rows={2}
                  placeholder="Detailed preparation ingredients, sizing, and traditional spice metrics."
                  value={itemDesc}
                  onChange={(e) => setItemDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-700">Image URLs (comma separated)</label>
                <input
                  type="text"
                  placeholder="https://image-url1.com, https://image-url2.com"
                  value={itemImagesInput}
                  onChange={(e) => setItemImagesInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
                <span className="block text-[10px] text-slate-400">Provide high-resolution web links. Leave empty to fallback to beautiful pre-seeded visuals.</span>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setItemModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Save Item
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: EMPLOYEE CRUD FORM
          ========================================== */}
      {employeeModalOpen && (
        <div id="employee-crud-modal" className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-fade-in relative p-6 sm:p-8 space-y-6">
            
            <h3 className="font-sans font-extrabold text-slate-950 text-xl">
              {editingEmployee ? 'Edit Employee Credentials' : 'Register New Personnel'}
            </h3>

            {empFormError && (
              <div className="bg-red-50 border border-red-100 text-red-800 p-3.5 rounded-xl text-xs font-semibold">
                {empFormError}
              </div>
            )}

            <form onSubmit={handleSaveEmployee} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-700">Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="E.g. Dr. Kidus Yosef"
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-700">Role Privilege *</label>
                  <select
                    value={empRole}
                    onChange={(e) => setEmpRole(e.target.value as Role)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-950 text-xs sm:text-sm bg-white focus:outline-none"
                  >
                    <option>Staff</option>
                    <option>Manager</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-700">Login Username *</label>
                  <input
                    required
                    type="text"
                    placeholder="kidus.yosef"
                    value={empUsername}
                    onChange={(e) => setEmpUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-700">Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="kidus@siltawi.com"
                    value={empEmail}
                    onChange={(e) => setEmpEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-700">
                  {editingEmployee ? 'Change Password (leave empty to keep unchanged)' : 'Login Password *'}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={empPassword}
                  onChange={(e) => setEmpPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEmployeeModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Save Employee
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
