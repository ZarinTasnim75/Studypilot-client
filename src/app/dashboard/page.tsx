'use client';

import React, { useState, FormEvent } from 'react';
import { authClient } from '../../../lib/auth-client';
import { User, Mail, Lock, Edit3, Save, Loader2, Building, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface UserData {
  name?: string;
  email?: string;
  institute?: string;
}

export default function ProfileDashboardPage() {
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const user = session?.user;

  if (isSessionLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1F4B43]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <h2 className="text-xl font-bold text-[#2D2A26]">Access Denied</h2>
        <p className="mt-2 text-sm text-[#6F665B]">Please log in to view your dashboard profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] px-4 py-10 sm:px-8 mt-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D8A34D]">
            Account Overview
          </span>
          <h1 className="text-3xl font-extrabold text-[#2D2A26]">My Dashboard</h1>
        </div>

        {/* Key prop ensures fresh initial state when user loads without useEffect */}
        <ProfileForm key={user.id} user={user} />
      </div>
    </div>
  );
}

function ProfileForm({ user }: { user: UserData }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Initialize state directly from user prop (No useEffect required!)
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    institute: user.institute || 'StudyPilot Student',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      // 1. Update institute and profile details in MongoDB via Express
      const res = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          institute: formData.institute,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || 'Failed to update profile.');
        return;
      }

      // 2. Refresh Better Auth session token on client so reloads keep the new name
      await authClient.updateUser({
        name: formData.name,
      });

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Could not connect to server.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-[#EEE8DE] bg-white shadow-sm">
      {/* Banner */}
      <div className="bg-[#F8F4EC] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 border-b border-[#EEE8DE]">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1F4B43] text-2xl font-black text-white shadow-md">
            {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2D2A26]">{formData.name}</h2>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#6F665B]">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Verified Account</span>
            </div>
          </div>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#1F4B43] px-5 py-2 text-xs font-bold text-white hover:bg-[#173B35]"
          >
            <Edit3 size={14} /> Edit Profile
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B] mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 h-4 w-4 text-[#6F665B]" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="w-full rounded-xl border border-[#EEE8DE] bg-[#FFFDF9] pl-10 pr-4 py-2.5 text-sm text-[#2D2A26] focus:border-[#1F4B43] focus:outline-none disabled:bg-[#F8F4EC]/60 disabled:text-[#6F665B]"
            />
          </div>
        </div>

        {/* Email (Locked) */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B]">
              Email Address
            </label>
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <Lock size={10} /> Locked / Unchangeable
            </span>
          </div>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#6F665B]" />
            <input
              type="email"
              value={formData.email}
              disabled
              readOnly
              className="w-full rounded-xl border border-[#EEE8DE] bg-[#F3EFE6] pl-10 pr-10 py-2.5 text-sm font-medium text-[#6F665B] cursor-not-allowed select-none"
            />
            <Lock className="absolute right-3.5 top-3 h-4 w-4 text-[#A0988C]" />
          </div>
        </div>

        {/* Institute */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B] mb-2">
            School / College / Institute
          </label>
          <div className="relative">
            <Building className="absolute left-3.5 top-3 h-4 w-4 text-[#6F665B]" />
            <input
              type="text"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your institute name"
              className="w-full rounded-xl border border-[#EEE8DE] bg-[#FFFDF9] pl-10 pr-4 py-2.5 text-sm text-[#2D2A26] focus:border-[#1F4B43] focus:outline-none disabled:bg-[#F8F4EC]/60 disabled:text-[#6F665B]"
            />
          </div>
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex gap-3 pt-4 border-t border-[#EEE8DE]">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
              className="flex-1 rounded-full border border-[#EEE8DE] bg-[#F8F4EC] py-2.5 text-xs font-bold text-[#6F665B] hover:bg-[#EEE8DE]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#1F4B43] py-2.5 text-xs font-bold text-white hover:bg-[#173B35] disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save size={14} /> Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}