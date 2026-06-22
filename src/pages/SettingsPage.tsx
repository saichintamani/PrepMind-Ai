import React, { useState } from 'react';
import { Save, Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { useAuthStore } from '../store/authStore';
import { usePreferencesStore } from '../store/preferencesStore';
import { useToastStore } from '../store/toastStore';
import { mockAuthService } from '../services/mockAuth';
import { isSupabaseConfigured } from '../lib/supabaseConfig';
import { authService } from '../services/supabase';
import PreferencesPanel from '../components/settings/PreferencesPanel';
import CustomerCareCard from '../components/support/CustomerCareCard';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuthStore();
  const { studyReminders, emailNotifications, marketingEmails, setPreferences } = usePreferencesStore();
  const toast = useToastStore();

  const [showPassword, setShowPassword] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await updateProfile({ name: formData.name, phone: formData.phone, bio: formData.bio });
      toast.show('Profile updated successfully!', 'success');
    } catch {
      toast.show('Failed to update profile', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (formData.newPassword.length < 8) {
      toast.show('Password must be at least 8 characters', 'warning');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.show('Passwords do not match', 'error');
      return;
    }

    if (!isSupabaseConfigured()) {
      if (!user?.email) return;
      const { error } = await mockAuthService.resetPassword(user.email);
      if (error) {
        toast.show('Could not update password in demo mode. Sign up again or use Supabase.', 'warning');
        return;
      }
      toast.show('Demo mode: use your new password on next signup flow, or re-register', 'info');
      setFormData((p) => ({ ...p, currentPassword: '', newPassword: '', confirmPassword: '' }));
      return;
    }

    try {
      const { error } = await authService.updatePassword(formData.newPassword);
      if (error) throw error;
      toast.show('Password updated successfully', 'success');
      setFormData((p) => ({ ...p, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch {
      toast.show('Failed to update password. Sign in again and retry.', 'error');
    }
  };

  const handleDeleteAccount = async () => {
    await logout();
    localStorage.removeItem('prepmind_mock_users');
    localStorage.removeItem('prepmind_mock_session');
    toast.show('Account deleted (demo)', 'info');
    navigate('/signup');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-3xl">
        <div>
          <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100">Settings</h1>
          <p className="text-earth-500 dark:text-earth-400 mt-2">Manage your account and preferences</p>
        </div>

        <PreferencesPanel />

        <CustomerCareCard variant="compact" />

        <Card>
          <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100 mb-6">Profile Information</h2>
          <div className="space-y-4">
            <Input label="Full Name" name="name" value={formData.name} onChange={handleProfileChange} placeholder="Your full name" />
            <Input label="Email Address" type="email" name="email" value={formData.email} disabled placeholder="your@email.com" />
            <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleProfileChange} placeholder="+91" />
            <div>
              <label className="block text-sm font-semibold text-navy-800 dark:text-earth-100 mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleProfileChange}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 rounded-lg border-2 border-earth-200 dark:border-navy-600 dark:bg-navy-900 dark:text-earth-100 placeholder-earth-500 focus:border-brand-500 focus:outline-none resize-none"
                rows={4}
              />
            </div>
            <Button isLoading={isLoading} onClick={handleSaveProfile} className="btn-primary flex items-center gap-2 w-full">
              <Save size={18} />
              Save Changes
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100 mb-6 flex items-center gap-2">
            <Lock size={24} />
            Security
          </h2>
          <div className="space-y-4">
            <Input
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleProfileChange}
              placeholder="Enter current password"
              icon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-earth-500">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />
            <Input
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleProfileChange}
              placeholder="Enter new password"
            />
            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleProfileChange}
              placeholder="Confirm new password"
            />
            <Button className="btn-primary w-full" onClick={handleUpdatePassword}>
              Update Password
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100 mb-6 flex items-center gap-2">
            <Bell size={24} />
            Notifications
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 border border-earth-200 dark:border-navy-600 rounded-lg cursor-pointer hover:bg-brand-50 dark:hover:bg-navy-800">
              <input
                type="checkbox"
                checked={studyReminders}
                onChange={(e) => {
                  setPreferences({ studyReminders: e.target.checked });
                  toast.show(e.target.checked ? 'Study reminders on' : 'Study reminders off', 'success');
                }}
                className="w-4 h-4 accent-brand-500"
              />
              <div>
                <p className="font-semibold text-navy-800 dark:text-earth-100">Study Reminders</p>
                <p className="text-sm text-earth-500">Synced with Personalization above</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border border-earth-200 dark:border-navy-600 rounded-lg cursor-pointer hover:bg-brand-50 dark:hover:bg-navy-800">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => {
                  setPreferences({ emailNotifications: e.target.checked });
                  toast.show(e.target.checked ? 'Email notifications on' : 'Email notifications off', 'success');
                }}
                className="w-4 h-4 accent-brand-500"
              />
              <div>
                <p className="font-semibold text-navy-800 dark:text-earth-100">Email Notifications</p>
                <p className="text-sm text-earth-500">Quiz results, interview feedback, billing receipts</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border border-earth-200 dark:border-navy-600 rounded-lg cursor-pointer hover:bg-brand-50 dark:hover:bg-navy-800">
              <input
                type="checkbox"
                checked={marketingEmails}
                onChange={(e) => {
                  setPreferences({ marketingEmails: e.target.checked });
                  toast.show(e.target.checked ? 'Marketing emails on' : 'Marketing emails off', 'success');
                }}
                className="w-4 h-4 accent-brand-500"
              />
              <div>
                <p className="font-semibold text-navy-800 dark:text-earth-100">Marketing Emails</p>
                <p className="text-sm text-earth-500">Tips and new features</p>
              </div>
            </label>
          </div>
        </Card>

        <Card className="border-2 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
          <p className="text-earth-500 dark:text-earth-400 mb-6">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button
            variant="ghost"
            className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900 border-2 border-red-300 dark:border-red-700"
            onClick={() => setDeleteOpen(true)}
          >
            Delete Account
          </Button>
        </Card>

        <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete account?" size="md">
          <p className="text-earth-600 dark:text-earth-400 mb-6">
            This removes your local demo account and signs you out. This cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1 bg-red-600 text-white" onClick={handleDeleteAccount}>
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
