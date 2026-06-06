import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faFilter, faPlus, faEllipsisVertical,
  faCheckCircle, faClock, faTimesCircle, faXmark,
  faTrash, faPen, faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../context/AppContext';

const initialUsers = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'Admin', status: 'Active', joined: '2023-01-15', avatar: 'AJ' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Editor', status: 'Active', joined: '2023-03-22', avatar: 'SS' },
  { id: 3, name: 'Mike Chen', email: 'mike@example.com', role: 'Viewer', status: 'Inactive', joined: '2023-05-10', avatar: 'MC' },
  { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Editor', status: 'Active', joined: '2023-07-01', avatar: 'EB' },
  { id: 5, name: 'David Wilson', email: 'david@example.com', role: 'Viewer', status: 'Pending', joined: '2023-09-14', avatar: 'DW' },
  { id: 6, name: 'Lisa Park', email: 'lisa@example.com', role: 'Admin', status: 'Active', joined: '2023-11-20', avatar: 'LP' },
  { id: 7, name: 'James Taylor', email: 'james@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-01-08', avatar: 'JT' },
  { id: 8, name: 'Anna Martinez', email: 'anna@example.com', role: 'Editor', status: 'Active', joined: '2024-02-17', avatar: 'AM' },
];

const roleColors = {
  Admin: 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400',
  Editor: 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
  Viewer: 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300',
};

const statusConfig = {
  Active: { icon: faCheckCircle, cls: 'text-emerald-600 dark:text-emerald-400' },
  Inactive: { icon: faTimesCircle, cls: 'text-red-500 dark:text-red-400' },
  Pending: { icon: faClock, cls: 'text-amber-500 dark:text-amber-400' },
};

const avatarColors = [
  'from-indigo-500 to-violet-500', 'from-pink-500 to-rose-500',
  'from-emerald-500 to-teal-500', 'from-amber-500 to-orange-500',
  'from-blue-500 to-cyan-500', 'from-purple-500 to-fuchsia-500',
  'from-red-500 to-pink-500', 'from-green-500 to-emerald-500',
];

const getInitials = (name) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

const AddUserModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({ name: '', email: '', role: 'Viewer', status: 'Active' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onAdd(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-zinc-700">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
              <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Add New User</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 transition-colors">
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Full Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. John Doe"
              className={`w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${errors.name ? 'border-red-400' : 'border-gray-200 dark:border-zinc-700'}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Email Address *</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="e.g. john@example.com"
              className={`w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${errors.email ? 'border-red-400' : 'border-gray-200 dark:border-zinc-700'}`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Role</label>
              <select
                value={form.role}
                onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
              Add User
            </button>
            <button type="button" onClick={onClose} className="flex-1 py-2 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg text-sm font-medium transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UsersPage = () => {
  const { showToast, addNotification } = useApp();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = users.filter(u => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'All' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const handleAddUser = (form) => {
    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      role: form.role,
      status: form.status,
      joined: new Date().toISOString().split('T')[0],
      avatar: getInitials(form.name),
    };
    setUsers(prev => [newUser, ...prev]);
    showToast(`User "${form.name}" added successfully!`, 'success');
    addNotification({
      type: 'user',
      title: 'New User Added',
      message: `${form.name} joined as a ${form.role}`,
      icon: '👤',
    });
  };

  const handleDelete = (user) => {
    setUsers(prev => prev.filter(u => u.id !== user.id));
    setOpenMenu(null);
    showToast(`User "${user.name}" removed.`, 'warning');
  };

  const handleToggleStatus = (user) => {
    const next = user.status === 'Active' ? 'Inactive' : 'Active';
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: next } : u));
    setOpenMenu(null);
    showToast(`${user.name} is now ${next}.`, 'info');
  };

  return (
    <>
      {showModal && <AddUserModal onClose={() => setShowModal(false)} onAdd={handleAddUser} />}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your team members and permissions.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Users', value: users.length, color: 'text-indigo-600 dark:text-indigo-400' },
          { label: 'Active', value: users.filter(u => u.status === 'Active').length, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Inactive', value: users.filter(u => u.status === 'Inactive').length, color: 'text-red-500 dark:text-red-400' },
          { label: 'Pending', value: users.filter(u => u.status === 'Pending').length, color: 'text-amber-500 dark:text-amber-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100"
            />
          </div>
          <div className="flex gap-1">
            {['All', 'Admin', 'Editor', 'Viewer'].map(r => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterRole === r
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-zinc-800/50">
              <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-400 dark:text-gray-500">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((user, idx) => {
                  const { icon, cls } = statusConfig[user.status];
                  return (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                            {user.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${roleColors[user.role]}`}>{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-sm ${cls}`}>
                          <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5" />
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.joined}</td>
                      <td className="px-6 py-4 text-right relative">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-400 transition-colors"
                          >
                            <FontAwesomeIcon icon={faEllipsisVertical} className="w-4 h-4" />
                          </button>
                          {openMenu === user.id && (
                            <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-20 overflow-hidden">
                              <button
                                onClick={() => handleToggleStatus(user)}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                              >
                                <FontAwesomeIcon icon={faPen} className="w-3.5 h-3.5" />
                                Toggle Status
                              </button>
                              <button
                                onClick={() => handleDelete(user)}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                              >
                                <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                                Remove User
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">Showing {filtered.length} of {users.length} users</p>
          <div className="flex gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-8 h-8 text-sm rounded-lg ${p === 1 ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'} transition-colors`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
