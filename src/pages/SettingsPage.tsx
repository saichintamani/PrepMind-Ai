import React, { useState } from 'react';
import { Save, Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuthStore } from '../store/authStore';

const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
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
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        bio: formData.bio,
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-3xl">
        <div>
          <h1 className="text-4xl font-bold text-navy-800">Settings</h1>
          <p className="text-earth-500 mt-2">Manage your account and preferences</p>
        </div>

        <Card>
          <h2 className="text-2xl font-bold text-navy-800 mb-6">Profile Information</h2>
          <div className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleProfileChange}
              placeholder="Your full name"
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              disabled
              placeholder="your@email.com"
            />
            <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleProfileChange} placeholder="+91" />

            <div>
              <label className="block text-sm font-semibold text-navy-800 mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleProfileChange}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 rounded-lg border-2 border-earth-200 text-navy-800 placeholder-earth-500 focus:border-brand-500 focus:outline-none transition-colors resize-none"
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
          <h2 className="text-2xl font-bold text-navy-800 mb-6 flex items-center gap-2">
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
                <button onClick={() => setShowPassword(!showPassword)} className="text-earth-500">
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
            <Button className="btn-primary w-full">Update Password</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-navy-800 mb-6 flex items-center gap-2">
            <Bell size={24} />
            Notifications
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 border border-earth-200 rounded-lg cursor-pointer hover:bg-brand-50">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-semibold text-navy-800">Study Reminders</p>
                <p className="text-sm text-earth-500">Get daily reminders to study</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border border-earth-200 rounded-lg cursor-pointer hover:bg-brand-50">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-semibold text-navy-800">Email Notifications</p>
                <p className="text-sm text-earth-500">Receive important updates via email</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border border-earth-200 rounded-lg cursor-pointer hover:bg-brand-50">
              <input type="checkbox" className="w-4 h-4" />
              <div>
                <p className="font-semibold text-navy-800">Marketing Emails</p>
                <p className="text-sm text-earth-500">Receive tips and new features</p>
              </div>
            </label>
          </div>
        </Card>

        <Card className="border-2 border-red-200 bg-red-50">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Danger Zone</h2>
          <p className="text-earth-500 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
          <Button variant="ghost" className="text-red-600 hover:bg-red-100 border-2 border-red-300">
            Delete Account
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
