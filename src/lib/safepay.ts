import { formatPrice } from '@/config/products';

const SAFETY_KEY = process.env.SAFEPAY_SAFETY_KEY || '';
const MERCHANT_ID = process.env.NEXT_PUBLIC_SAFEPAY_MERCHANT_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_SAFEPAY_PUBLIC_KEY || '';

export interface SafePayPaymentRequest {
  amount: number;
  description: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string;
}

export interface SafePayPaymentResponse {
  success: boolean;
  paymentId?: string;
  transactionId?: string;
  message: string;
  redirectUrl?: string;
}

export function generateIntegrityHash(amount: number, orderId: string): string {
  // This creates a hash using safety key for server-side verification
  const data = `${amount}-${orderId}-${SAFETY_KEY}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

export async function initiatePayment(request: SafePayPaymentRequest): Promise<SafePayPaymentResponse> {
  const { amount, description, orderId, customerName, customerEmail, customerPhone } = request;

  // Create payment data
  const paymentData = {
    merchantId: MERCHANT_ID,
    amount: amount,
    orderId: orderId,
    description: description,
    customerName: customerName,
    customerEmail: customerEmail,
    customerPhone: customerPhone,
    customerAddress: customerPhone, // Using phone as fallback
    integrityHash: generateIntegrityHash(amount, orderId),
  };

  try {
    // Make API call to SafePay (this would be server-side in production)
    // For demo, we'll simulate the redirect flow
    const safePayUrl = `https://payments.safepay.pk/api/v1/payment?data=${encodeURIComponent(JSON.stringify(paymentData))}`;
    
    return {
      success: true,
      message: 'Payment initiated successfully',
      redirectUrl: safePayUrl,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Payment initialization failed',
    };
  }
}

export function createOrderMessage(cart: any, customerDetails: any): string {
  let message = `*New Order from Luxe Evoque*\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${customerDetails.name}\n`;
  message += `Phone: ${customerDetails.phone}\n`;
  message += `Address: ${customerDetails.address}\n\n`;
  message += `*Order Items:*\n`;

  cart.items.forEach((item: any, index: number) => {
    message += `${index + 1}. ${item.product.name} x${item.quantity} - ${formatPrice(item.priceAtAdd * item.quantity)}\n`;
  });

  message += `\n*Total: ${formatPrice(cart.total)}*\n`;

  if (customerDetails.notes) {
    message += `\n*Notes:* ${customerDetails.notes}\n`;
  }

  return message;
}