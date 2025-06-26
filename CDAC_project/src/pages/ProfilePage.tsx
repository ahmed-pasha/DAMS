// import { useState, useEffect } from 'react';
// import { User, Copy, RefreshCw } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const ProfilePage = () => {
//   const { user, regenerateSharingCode } = useAuth();
//   const [copied, setCopied] = useState(false);
//   const [regenerating, setRegenerating] = useState(false);
//   const navigate = useNavigate();

//   const copyToClipboard = () => {
//     if (user?.sharingCode) {
//       navigator.clipboard.writeText(user.sharingCode);
//       setCopied(true);
//       toast.success('Sharing code copied to clipboard!');
      
//       setTimeout(() => {
//         setCopied(false);
//       }, 2000);
//     }
//   };

//   const handleRegenerateCode = async () => {
//     setRegenerating(true);
//     try {
//       await regenerateSharingCode();
//       toast.success('Sharing code regenerated successfully!');
//     } catch (error) {
//       toast.error('Failed to regenerate sharing code');
//     } finally {
//       setRegenerating(false);
//     }
//   };

//   const handlePremiumSubscription = () => {
//     navigate('/payment');
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         {/* Header */}
//         <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
//                 <User size={32} className="text-blue-600" />
//               </div>
//             </div>
//             <div className="ml-4">
//               <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
//               <p className="text-sm text-gray-500">{user?.email}</p>
//             </div>
//           </div>
//         </div>
        
//         {/* User information */}
//         <div className="px-6 py-5">
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
//               <div className="mt-4 border-t border-gray-200 pt-4">
//                 <dl className="divide-y divide-gray-200">
//                   <div className="py-3 flex justify-between">
//                     <dt className="text-sm font-medium text-gray-500">Name</dt>
//                     <dd className="text-sm font-medium text-gray-900">{user?.name}</dd>
//                   </div>
//                   <div className="py-3 flex justify-between">
//                     <dt className="text-sm font-medium text-gray-500">Email</dt>
//                     <dd className="text-sm font-medium text-gray-900">{user?.email}</dd>
//                   </div>
//                   <div className="py-3 flex justify-between">
//                     <dt className="text-sm font-medium text-gray-500">Account Created</dt>
//                     <dd className="text-sm font-medium text-gray-900">
//                       {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                     </dd>
//                   </div>
//                 </dl>
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-medium text-gray-900">Sharing Code</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 This is your unique 6-digit code that other users can use to share files with you.
//               </p>
//               <div className="mt-4 flex items-center">
//                 <div className="bg-gray-100 rounded-md px-4 py-2 text-lg font-mono font-semibold text-gray-900 tracking-widest">
//                   {user?.sharingCode}
//                 </div>
//                 <button
//                   onClick={copyToClipboard}
//                   className="ml-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
//                   aria-label="Copy to clipboard"
//                 >
//                   <Copy size={18} className={copied ? 'text-green-500' : 'text-gray-500'} />
//                 </button>
//                 <button
//                   onClick={handleRegenerateCode}
//                   disabled={regenerating}
//                   className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   {regenerating ? (
//                     <>
//                       <RefreshCw size={16} className="mr-1 animate-spin" />
//                       Regenerating...
//                     </>
//                   ) : (
//                     <>
//                       <RefreshCw size={16} className="mr-1" />
//                       Regenerate
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6">
//             <button
//               onClick={handlePremiumSubscription}
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Go to Payment Page
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;



import { useState } from 'react';
import { User, Copy, RefreshCw, Mail, Calendar, Key, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, regenerateSharingCode } = useAuth();
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const navigate = useNavigate();

  const copyToClipboard = () => {
    if (user?.sharingCode) {
      navigator.clipboard.writeText(user.sharingCode);
      setCopied(true);
      toast.success("Sharing code copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerateCode = async () => {
    setRegenerating(true);
    try {
      await regenerateSharingCode();
      toast.success("Code regenerated!");
    } catch {
      toast.error("Failed to regenerate code.");
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="bg-gradient-to-r from-blue-100 to-white rounded-xl p-6 flex items-center space-x-4">
        <div className="bg-blue-500 rounded-full p-3 text-white">
          <User size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-gray-600 flex items-center space-x-1"><Mail size={16}/><span>{user?.email}</span></p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center space-x-2 text-gray-700"><Key size={18} /> <span>Account Information</span></h3>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-gray-600"><span>Name</span> <span>{user?.name}</span></div>
            <div className="flex justify-between text-gray-600"><span>Email</span> <span>{user?.email}</span></div>
            <div className="flex justify-between text-gray-600"><span>Created At</span> <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span></div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold flex items-center space-x-2 text-gray-700"><Key size={18} /> <span>Sharing Code</span></h3>
          <div className="mt-3 flex items-center space-x-3">
            <span className="bg-gray-100 rounded font-mono p-3 text-lg font-bold text-gray-800">{user?.sharingCode}</span>
            <button onClick={copyToClipboard} className="p-2 rounded-full hover:bg-gray-200" title="Copy">
              <Copy className={copied ? "text-green-600" : "text-gray-600"} />
            </button>
            <button onClick={handleRegenerateCode} disabled={regenerating} className="inline-flex items-center space-x-1 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200">
              {regenerating ? <RefreshCw className="animate-spin text-gray-500" /> : <RefreshCw className="text-gray-600" />}
              <span>{regenerating ? 'Regenerating...' : 'Regenerate'}</span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => navigate('/payment')} className="w-full flex items-center justify-center space-x-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-3">
          <CreditCard /> <span>Go to Payment Page</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
