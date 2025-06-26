// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PaymentGateway from '../components/PaymentGateway';

// const PaymentPage: React.FC = () => {
//   const [paymentCompleted, setPaymentCompleted] = useState(false);
//   const navigate = useNavigate();

//   const handleSuccess = () => {
//     setPaymentCompleted(true);
//     // Additional success handling logic here
//   };

//   const handleCancel = () => {
//     // Navigate back to profile page on cancel
//     navigate('/profile');
//   };

//   if (paymentCompleted) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <h2 className="text-2xl font-semibold">Payment Successful</h2>
//       </div>
//     );
//   }

//   return (
//     <PaymentGateway onSuccess={handleSuccess} onCancel={handleCancel} />
//   );
// };

// export default PaymentPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentGateway from '../components/PaymentGateway';
import { CheckCircle, CreditCard } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setPaymentCompleted(true);
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  if (paymentCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-3 bg-gray-100 p-4">
        <CheckCircle className="text-emerald-600" size={48} />
        <h2 className="text-2xl font-bold text-gray-800">Payment Successful</h2>
        <p className="text-gray-600">Thank you for your purchase! You can now return to your profile page.</p>
        <button
          onClick={() => navigate('/profile')}
          className="bg-emerald-600 text-white rounded-lg px-4 py-2 mt-3 hover:bg-emerald-700"
        >
          Back to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl p-8 shadow-lg space-y-4 max-w-md w-full">
        <div className="flex items-center justify-center space-x-2">
          <CreditCard className="text-emerald-600" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Secure Payment</h1>
        </div>
        <PaymentGateway onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default PaymentPage;