import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faBell, faShield, faPalette, faChevronRight, faKey,
  faSave, faCamera, faCheck, faXmark
} from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../context/AppContext';

const tabs = [
  { id: 'profile', label: 'Profile', icon: faUser },
  { id: 'notifications', label: 'Notifications', icon: faBell },
  { id: 'security', label: 'Security', icon: faShield },
  { id: 'appearance', label: 'Appearance', icon: faPalette },
];

const ToggleSwitch = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
      enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-zinc-700'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const SettingsPage = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  const [profile, setProfile] = useState({
    firstName: 'Alex', lastName: 'Johnson',
    email: 'alex@example.com', phone: '+1 (555) 000-0000',
    bio: 'Administrator at Dashboard Inc. Managing team operations and analytics.',
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true, emailMarketing: false,
    pushOrders: true, pushAlerts: true, smsOrders: false,
  });

  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [accentColor, setAccentColor] = useState(0);
  const [themeMode, setThemeMode] = useState('light');
  const [language, setLanguage] = useState('English (US)');
  const [timezone, setTimezone] = useState('WIB (UTC+7)');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast('Profile updated successfully!', 'success');
  };

  const handleSaveNotifications = () => {
    showToast('Notification preferences saved!', 'success');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwords.current) { showToast('Please enter your current password.', 'error'); return; }
    if (passwords.new.length < 8) { showToast('New password must be at least 8 characters.', 'error'); return; }
    if (passwords.new !== passwords.confirm) { showToast('Passwords do not match.', 'error'); return; }
    showToast('Password changed successfully!', 'success');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleEnable2FA = () => {
    showToast('2FA setup email sent to your inbox!', 'info');
  };

  const handleRevokeSession = (device) => {
    showToast(`Session from "${device}" revoked.`, 'warning');
  };

  const handleSaveAppearance = () => {
    showToast('Appearance settings saved!', 'success');
  };

  const toggleNotif = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  const accentColors = [
    { color: 'bg-indigo-600', ring: 'ring-indigo-600' },
    { color: 'bg-violet-600', ring: 'ring-violet-600' },
    { color: 'bg-pink-600', ring: 'ring-pink-600' },
    { color: 'bg-emerald-600', ring: 'ring-emerald-600' },
    { color: 'bg-amber-500', ring: 'ring-amber-500' },
    { color: 'bg-blue-600', ring: 'ring-blue-600' },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account preferences and settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors border-r-2 ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-gray-100 border-transparent'
                }`}
              >
                <span className="flex items-center gap-3">
                  <FontAwesomeIcon icon={tab.icon} className="w-4 h-4" />
                  {tab.label}
                </span>
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 opacity-40" />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>
              <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-200 dark:border-zinc-800">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-2xl font-bold">
                    AJ
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors">
                    <FontAwesomeIcon icon={faCamera} className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{profile.firstName} {profile.lastName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Administrator</p>
                  <button
                    onClick={() => showToast('Photo upload coming soon!', 'info')}
                    className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Change photo
                  </button>
                </div>
              </div>
              <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'First Name', key: 'firstName', type: 'text' },
                  { label: 'Last Name', key: 'lastName', type: 'text' },
                  { label: 'Email Address', key: 'email', type: 'email' },
                  { label: 'Phone', key: 'phone', type: 'tel' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      value={profile[f.key]}
                      onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Bio</label>
                  <textarea
                    rows={3}
                    value={profile.bio}
                    onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
                <div className="sm:col-span-2 flex gap-3">
                  <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                    <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button type="button" className="px-4 py-2 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg text-sm font-medium transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
              <div className="space-y-1">
                {[
                  { key: 'emailOrders', icon: '📧', label: 'Order Updates', desc: 'Get notified when an order status changes', category: 'Email' },
                  { key: 'emailMarketing', icon: '📢', label: 'Marketing & Promotions', desc: 'Receive news about product updates and features', category: 'Email' },
                  { key: 'pushOrders', icon: '🔔', label: 'Order Notifications', desc: 'Push notifications for new and updated orders', category: 'Push' },
                  { key: 'pushAlerts', icon: '⚠️', label: 'System Alerts', desc: 'Important alerts about your account security', category: 'Push' },
                  { key: 'smsOrders', icon: '💬', label: 'SMS Order Updates', desc: 'Receive SMS when high-value orders are placed', category: 'SMS' },
                ].map((item, idx, arr) => {
                  const prevCat = idx > 0 ? arr[idx - 1].category : null;
                  return (
                    <React.Fragment key={item.key}>
                      {item.category !== prevCat && (
                        <p className={`text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500 ${idx > 0 ? 'pt-5' : ''} pb-2`}>
                          {item.category} Notifications
                        </p>
                      )}
                      <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-zinc-800 last:border-0">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mt-0.5 text-base">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                        <ToggleSwitch enabled={notifications[item.key]} onToggle={() => toggleNotif(item.key)} />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="mt-6">
                <button
                  onClick={handleSaveNotifications}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              {/* Change Password */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faKey} className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">Change Password</h2>
                </div>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  {[
                    { label: 'Current Password', key: 'current' },
                    { label: 'New Password', key: 'new' },
                    { label: 'Confirm New Password', key: 'confirm' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">{f.label}</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={passwords[f.key]}
                        onChange={e => setPasswords(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                  <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                    <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                    Update Password
                  </button>
                </form>
              </div>

              {/* 2FA */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faShield} className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Add an extra layer of security</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-md">
                    Not Enabled
                  </span>
                </div>
                <button
                  onClick={handleEnable2FA}
                  className="mt-4 px-4 py-2 border border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg text-sm font-medium transition-colors"
                >
                  Enable 2FA
                </button>
              </div>

              {/* Active Sessions */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Active Sessions</h2>
                <div className="space-y-3">
                  {[
                    { device: 'Chrome on Windows 11', location: 'Jakarta, Indonesia', time: 'Current Session', current: true },
                    { device: 'Safari on iPhone 15', location: 'Bandung, Indonesia', time: '2 hours ago', current: false },
                    { device: 'Firefox on macOS', location: 'Surabaya, Indonesia', time: '3 days ago', current: false },
                  ].map(s => (
                    <div key={s.device} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-zinc-800 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{s.device}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.location} · {s.time}</p>
                      </div>
                      {s.current ? (
                        <span className="px-2 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-md flex items-center gap-1">
                          <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRevokeSession(s.device)}
                          className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 font-medium flex items-center gap-1"
                        >
                          <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* APPEARANCE */}
          {activeTab === 'appearance' && (
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Appearance</h2>

              {/* Theme */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Light', id: 'light', preview: 'bg-white border border-gray-200' },
                    { label: 'Dark', id: 'dark', preview: 'bg-zinc-800' },
                    { label: 'System', id: 'system', preview: 'bg-gradient-to-br from-white to-zinc-800' },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setThemeMode(t.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-sm font-medium ${
                        themeMode === t.id
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
                          : 'border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg mx-auto mb-2 ${t.preview}`} />
                      {t.label}
                      {themeMode === t.id && (
                        <div className="mt-1 flex justify-center">
                          <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color */}
              <div className="mb-8 pb-8 border-b border-gray-200 dark:border-zinc-800">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Accent Color</label>
                <div className="flex gap-3">
                  {accentColors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setAccentColor(i)}
                      className={`w-8 h-8 rounded-full ${c.color} transition-transform hover:scale-110 ${
                        accentColor === i ? `ring-2 ring-offset-2 ${c.ring} dark:ring-offset-zinc-900` : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Language & Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Language & Region</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5">Language</label>
                    <select
                      value={language}
                      onChange={e => setLanguage(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option>English (US)</option>
                      <option>Indonesian</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5">Timezone</label>
                    <select
                      value={timezone}
                      onChange={e => setTimezone(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option>WIB (UTC+7)</option>
                      <option>WITA (UTC+8)</option>
                      <option>WIT (UTC+9)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleSaveAppearance}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                  Save Appearance
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
