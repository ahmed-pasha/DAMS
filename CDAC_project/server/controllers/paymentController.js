import asyncHandler from 'express-async-handler';

// Mock payment sessions storage (in-memory)
const paymentSessions = new Map();

// @desc    Initiate payment session
// @route   POST /api/payment/initiate
// @access  Private
const initiatePayment = asyncHandler(async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    res.status(400);
    throw new Error('User ID and amount are required');
  }

  // Create a mock payment session ID
  const sessionId = `sess_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

  // Store session with status pending
  paymentSessions.set(sessionId, { userId, amount, status: 'pending' });

  // Return session ID and mock payment URL (in real case, redirect to payment gateway)
  res.json({
    sessionId,
    paymentUrl: `https://mockpaymentgateway.com/pay/${sessionId}`,
  });
});

// @desc    Verify payment session
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    res.status(400);
    throw new Error('Session ID is required');
  }

  const session = paymentSessions.get(sessionId);

  if (!session) {
    res.status(404);
    throw new Error('Payment session not found');
  }

  // For mock, mark payment as successful
  session.status = 'paid';
  paymentSessions.set(sessionId, session);

  res.json({ message: 'Payment verified successfully', session });
});

export { initiatePayment, verifyPayment };
