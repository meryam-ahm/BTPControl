import React from 'react';
import { ArrowLeft, User, Lock, Bell, Settings, LogOut, ChevronRight, Phone, Mail } from 'lucide-react';

const Profile = () => {
  const menuItems = [
    { id: 'edit', label: 'Edit Profile', icon: <User className="w-5 h-5 text-gray-700" />, textColor: 'text-gray-900' },
    { id: 'password', label: 'Change Password', icon: <Lock className="w-5 h-5 text-gray-700" />, textColor: 'text-gray-900' },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5 text-gray-700" />, textColor: 'text-gray-900' },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5 text-gray-700" />, textColor: 'text-gray-900' },
    { id: 'logout', label: 'Logout', icon: <LogOut className="w-5 h-5 text-[#EA4335]" />, textColor: 'text-[#EA4335]', isLast: true },
  ];

  return (
     <div className="max-w-[1024px] mx-auto min-h-[768px] bg-[#F8F9FA] border-2 border-blue-600 rounded-2xl overflow-hidden font-sans shadow-2xl p-6 flex flex-col my-4">
      
       <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6 bg-white -mx-6 px-6 -mt-6 pt-6">
        <div className="flex items-center gap-4">
          <ArrowLeft className="w-6 h-6 text-gray-800 cursor-pointer stroke-[2.5]" />
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Profile</h1>
        </div>
      </div>

       <div className="grid grid-cols-3 gap-6 flex-1 items-start">
        
         <div className="col-span-1 bg-white p-6 border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center text-center">
          <div className="relative mb-4">
             <div className="w-28 h-28 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center overflow-hidden">
              <span className="text-2xl text-gray-500 font-extrabold">CY</span>
            </div>
             <span className="absolute bottom-1 right-1 w-5 h-5 bg-[#34A853] border-4 border-white rounded-full"></span>
          </div>

          <h2 className="font-bold text-gray-900 text-xl tracking-tight">Chef Yassine</h2>
          <p className="text-xs text-gray-400 font-semibold mt-0.5 mb-5">Chef de Chantier</p>

           <div className="w-full space-y-3 pt-4 border-t border-gray-50 text-left text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="font-medium">+212 6 12 34 56 78</span>
            </div>
            <div className="flex items-center gap-3 overflow-hidden">
              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="font-medium truncate">yassine@example.com</span>
            </div>
          </div>
        </div>

         <div className="col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col divide-y divide-gray-100">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/80 transition cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <span className={`text-sm font-semibold tracking-wide ${item.textColor}`}>
                    {item.label}
                  </span>
                </div>
                
                 {!item.isLast && (
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition transform group-hover:translate-x-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
