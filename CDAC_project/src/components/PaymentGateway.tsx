// import React, { useState } from 'react';
// import axios from 'axios';

// interface PaymentGatewayProps {
//   onSuccess: () => void;
//   onCancel: () => void;
// }

// const PaymentGateway: React.FC<PaymentGatewayProps> = ({ onSuccess, onCancel }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiry, setExpiry] = useState('');
//   const [cvv, setCvv] = useState('');

//   const handlePayment = async () => {
//     setLoading(true);
//     setError(null);

//     // Basic validation
//     if (!cardNumber || !expiry || !cvv) {
//       setError('Please fill in all card details');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Simulate payment processing delay
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       // Here you would integrate with a real payment API

//       onSuccess();
//     } catch (err: any) {
//       setError('Payment failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
//         <h2 className="text-xl font-semibold mb-4">Subscription Payment</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Card Number</label>
//             <input
//               type="text"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//               placeholder="1234 5678 9012 3456"
//               maxLength={19}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
//             <input
//               type="text"
//               value={expiry}
//               onChange={(e) => setExpiry(e.target.value)}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//               placeholder="MM/YY"
//               maxLength={5}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">CVV</label>
//             <input
//               type="password"
//               value={cvv}
//               onChange={(e) => setCvv(e.target.value)}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//               placeholder="123"
//               maxLength={4}
//             />
//           </div>
//         </div>
//         <div className="flex justify-end space-x-4 mt-6">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//             disabled={loading}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handlePayment}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             disabled={loading}
//           >
//             {loading ? 'Processing...' : 'Pay Now'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentGateway;


import React, { useState } from 'react';

interface PaymentGatewayProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    if (!cardNumber || !expiry || !cvv) {
      setError("Please fill in all card details.");
      setLoading(false);
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSuccess();
    } catch {
      setError("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Subscription Payment</h2>
        {error && <p className="text-red-600 font-medium">{error}</p>}
        {[
            { label: "Card Number", value: cardNumber, setter: setCardNumber, placeholder: "1234 5678 9012 3456", maxLength: 19 },
            { label: "Expiry Date", value: expiry, setter: setExpiry, placeholder: "MM/YY", maxLength: 5 },
            { label: "CVV", value: cvv, setter: setCvv, placeholder: "123", maxLength: 4 },
        ].map((field) => (
            <div key={field.label}>
              <label className="block text-sm font-medium text-gray-600">{field.label}</label>
              <input
                className="mt-1 w-full rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
              />
            </div>
        ))}
        <div className="flex justify-end space-x-3 mt-4">
          <button onClick={onCancel} disabled={loading} className="bg-gray-300 rounded-lg px-4 py-2 hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handlePayment} disabled={loading} className="bg-emerald-600 text-white rounded-lg px-4 py-2 hover:bg-emerald-700">
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
