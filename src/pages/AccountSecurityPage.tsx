import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  Key, 
  Smartphone, 
  LogOut, 
  Eye, 
  EyeOff, 
  Check, 
  X,
  Laptop
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AccountSecurityPage: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    verifyEmail, 
    verifyPhone, 
    logout, 
    goBack, 
    showToast 
  } = useApp();

  const [isEmailOtpOpen, setIsEmailOtpOpen] = useState(false);
  const [isPhoneOtpOpen, setIsPhoneOtpOpen] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const [phoneInput, setPhoneInput] = useState(userProfile.phone || '+91 98765 43210');
  const [emailInput, setEmailInput] = useState(userProfile.email || 'yasmin@gmail.com');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      showToast('Password must be at least 8 characters long', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'warning');
      return;
    }
    showToast('✓ Password changed successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleEmailVerification = (e: React.FormEvent) => {
    e.preventDefault();
    verifyEmail(emailOtp);
    setIsEmailOtpOpen(false);
    setEmailOtp('');
  };

  const handlePhoneVerification = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPhone(phoneOtp);
    setIsPhoneOtpOpen(false);
    setPhoneOtp('');
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-lavender-200/80 shadow-card">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2.5 rounded-2xl bg-slate-50 border border-lavender-200 text-slate-600 hover:text-slate-900 hover:bg-lavender-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Account & Security</span>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage multi-factor verification, password credentials, and active device sessions
            </p>
          </div>
        </div>
      </div>

      {/* 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (6 Cols): Contact Verification Status */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Email Verification Box */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-lavender-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-lavender-100 text-lavender-700 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Email Address</h3>
                  <p className="text-xs text-slate-500">{emailInput}</p>
                </div>
              </div>

              {userProfile.emailVerified ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified
                </span>
              ) : (
                <button
                  onClick={() => setIsEmailOtpOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white font-bold text-xs shadow-xs hover:opacity-95 transition-all cursor-pointer"
                >
                  Verify Email
                </button>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              Your email is used for application confirmations, direct interview invites, and important platform updates.
            </p>
          </div>

          {/* Phone Verification Box */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-lavender-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-mint-100 text-mint-700 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Mobile Number</h3>
                  <p className="text-xs text-slate-500">{phoneInput}</p>
                </div>
              </div>

              {userProfile.phoneVerified ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified
                </span>
              ) : (
                <button
                  onClick={() => setIsPhoneOtpOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white font-bold text-xs shadow-xs hover:opacity-95 transition-all cursor-pointer"
                >
                  Verify Number
                </button>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              SMS alerts are enabled for high-urgency deadlines (less than 24 hours) and fast-tracked recruiter callbacks.
            </p>
          </div>

          {/* Active Sessions & Logout All Devices */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-lavender-200/80 shadow-card space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-slate-700" />
              <span>Active Device Sessions</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Windows PC • Chrome</p>
                    <p className="text-[10px] text-slate-500">Hyderabad, India • Current Active Session</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Online</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">iPhone 15 Pro • Safari</p>
                    <p className="text-[10px] text-slate-500">Hyderabad, India • 2 hours ago</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Inactive</span>
              </div>
            </div>

            <button
              onClick={() => showToast('✓ Logged out from all other devices', 'info')}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout from All Devices</span>
            </button>
          </div>

        </div>

        {/* Right Column (6 Cols): Change Password Form */}
        <div className="lg:col-span-6 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card space-y-6">
          <div className="space-y-1">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-lavender-600" />
              <span>Change Account Password</span>
            </h3>
            <p className="text-xs text-slate-500">
              Ensure your account is using a strong, unique passphrase with at least 8 characters.
            </p>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Current Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">New Password</label>
              <input
                type={showPass ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Confirm New Password</label>
              <input
                type={showPass ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-lavender-500/25 transition-all cursor-pointer"
            >
              Update Password
            </button>
          </form>
        </div>

      </div>

      {/* Email Verification Demo Modal */}
      {isEmailOtpOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-lavender-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Verify Email Address</h3>
              <button onClick={() => setIsEmailOtpOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              We sent a 6-digit verification code to <span className="font-bold text-slate-800">{emailInput}</span>. (Demo code: <strong className="text-lavender-700">482910</strong>)
            </p>
            <form onSubmit={handleEmailVerification} className="space-y-3">
              <input
                type="text"
                maxLength={6}
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full px-3.5 py-2.5 text-center tracking-widest text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-lavender-500"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white font-bold text-xs"
              >
                Confirm Verification
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Phone Verification Demo Modal */}
      {isPhoneOtpOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-lavender-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Verify Mobile Number</h3>
              <button onClick={() => setIsPhoneOtpOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              We sent an SMS OTP to <span className="font-bold text-slate-800">{phoneInput}</span>. (Demo code: <strong className="text-mint-700">772901</strong>)
            </p>
            <form onSubmit={handlePhoneVerification} className="space-y-3">
              <input
                type="text"
                maxLength={6}
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value)}
                placeholder="Enter SMS OTP"
                className="w-full px-3.5 py-2.5 text-center tracking-widest text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-lavender-500"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white font-bold text-xs"
              >
                Confirm Mobile OTP
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
