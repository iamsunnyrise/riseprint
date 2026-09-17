import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  Download,
  Share2,
  CheckCircle2,
  Calendar,
  Phone,
  User,
  MapPin,
  IndianRupee,
  Clock,
  Sparkles,
  RefreshCw,
  Trash2,
  Search,
  Check,
  Scissors,
  X,
  History,
  AlertCircle
} from 'lucide-react';

const ORDER_STATUS_STEPS = [
  { id: 'received', label: '1. ऑर्डर प्राप्त', color: 'bg-amber-100 text-amber-900 border-amber-300' },
  { id: 'proof_sent', label: '2. कच्चा प्रूफ भेजा', color: 'bg-blue-100 text-blue-900 border-blue-300' },
  { id: 'proof_approved', label: '3. प्रूफ स्वीकृत', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  { id: 'butter_printed', label: '4. बटर प्रिंटेड', color: 'bg-purple-100 text-purple-900 border-purple-300' },
  { id: 'screen_printing', label: '5. छपाई जारी', color: 'bg-orange-100 text-orange-900 border-orange-300' },
  { id: 'ready_delivered', label: '6. डिलीवर ✅', color: 'bg-green-700 text-white border-green-800' }
];

export default function JobSlipModal({
  isOpen,
  onClose,
  data,
  onChange
}) {
  const [showHistory, setShowHistory] = useState(false);
  const [savedOrders, setSavedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');

  // Load saved orders from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('rise_print_orders_history');
      if (stored) {
        setSavedOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Initialize form fields with defaults if not present
  const customerName = data.clientProofName || data.groomName || 'श्रीमान';
  const customerPhone = data.clientProofPhone || '';
  const pressName = data.pressShopName || 'राइज प्रिंटर्स एंड ग्राफिक्स';
  const jobToken = data.jobCardId || 'JOB-1082';
  const orderDate = data.jobCardOrderDate || new Date().toISOString().split('T')[0];
  const deliveryDate = data.jobCardDeliveryDate || '2026-04-22';
  const deliveryTime = data.jobCardDeliveryTime || 'शाम 05:00 बजे';
  const modelCode = data.jobCardModelCode || 'शाही मॉडल #502 (महरून)';
  const qtyCards = Number(data.jobCardQuantity) || 250;
  const qtyEnvelopes = Number(data.jobCardEnvelopeQuantity) || 250;
  const ratePerUnit = Number(data.jobCardRatePerUnit) || 18;
  const screenCharge = Number(data.jobCardScreenMakingCharge) || 200;
  const extraCharge = Number(data.jobCardExtraCharge) || 0;
  const advancePaid = Number(data.jobCardAdvancePaid) || 1500;
  const paymentMode = data.jobCardPaymentMode || 'UPI';
  const currentStatus = data.jobCardStatus || 'received';
  const instructions = data.jobCardSpecialInstructions || '';

  // Calculate bill totals
  const subtotalCards = qtyCards * ratePerUnit;
  const grandTotal = subtotalCards + screenCharge + extraCharge;
  const balanceDue = Math.max(0, grandTotal - advancePaid);

  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleRegenerateToken = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    updateField('jobCardId', `JOB-${randomNum}`);
  };

  // Save current order to localStorage history
  const handleSaveOrder = () => {
    const orderRecord = {
      id: jobToken,
      customerName,
      customerPhone,
      modelCode,
      qtyCards,
      qtyEnvelopes,
      ratePerUnit,
      grandTotal,
      advancePaid,
      balanceDue,
      orderDate,
      deliveryDate,
      deliveryTime,
      paymentMode,
      status: currentStatus,
      instructions,
      updatedAt: new Date().toISOString()
    };

    const existingIndex = savedOrders.findIndex(o => o.id === jobToken);
    let updated;
    if (existingIndex >= 0) {
      updated = [...savedOrders];
      updated[existingIndex] = orderRecord;
    } else {
      updated = [orderRecord, ...savedOrders];
    }

    setSavedOrders(updated);
    try {
      localStorage.setItem('rise_print_orders_history', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setNotification('ऑर्डर सफलतापूर्वक सुरक्षित (Saved) कर दिया गया!');
    setTimeout(() => setNotification(''), 3000);
  };

  // Load a past order into active form
  const handleLoadOrder = (order) => {
    onChange({
      ...data,
      jobCardId: order.id,
      clientProofName: order.customerName,
      clientProofPhone: order.customerPhone,
      jobCardModelCode: order.modelCode,
      jobCardQuantity: order.qtyCards,
      jobCardEnvelopeQuantity: order.qtyEnvelopes,
      jobCardRatePerUnit: order.ratePerUnit,
      jobCardAdvancePaid: order.advancePaid,
      jobCardOrderDate: order.orderDate,
      jobCardDeliveryDate: order.deliveryDate,
      jobCardDeliveryTime: order.deliveryTime,
      jobCardPaymentMode: order.paymentMode,
      jobCardStatus: order.status,
      jobCardSpecialInstructions: order.instructions
    });
    setShowHistory(false);
    setNotification(`ऑर्डर #${order.id} लोड हो गया!`);
    setTimeout(() => setNotification(''), 3000);
  };

  // Delete past order
  const handleDeleteOrder = (orderId, e) => {
    e.stopPropagation();
    if (window.confirm(`क्या आप ऑर्डर #${orderId} को हटाना चाहते हैं?`)) {
      const updated = savedOrders.filter(o => o.id !== orderId);
      setSavedOrders(updated);
      try {
        localStorage.setItem('rise_print_orders_history', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // WhatsApp Message Generator
  const handleSendWhatsAppReceipt = () => {
    const cleanPhone = customerPhone.replace(/\D/g, '');
    const statusText = ORDER_STATUS_STEPS.find(s => s.id === currentStatus)?.label || 'ऑर्डर दर्ज';

    const msg = `🙏 *सादर प्रणाम ${customerName} जी!*

आपके शादी कार्ड का ऑर्डर *${pressName}* में दर्ज कर लिया गया है।

📋 *जॉब टोकन:* #${jobToken}
🎴 *कार्ड मॉडल:* ${modelCode}
📦 *कुल मात्रा:* ${qtyCards} कार्ड + ${qtyEnvelopes} लिफाफे
💰 *कुल राशि:* ₹${grandTotal.toLocaleString('en-IN')}
💵 *एडवांस जमा:* ₹${advancePaid.toLocaleString('en-IN')} (${paymentMode})
🔴 *शेष बकाया राशि:* ₹${balanceDue.toLocaleString('en-IN')}
📅 *डिलीवरी दिनांक:* ${deliveryDate} (${deliveryTime})
📊 *वर्तमान स्थिति:* ${statusText}

_छपाई से पूर्व कच्चा प्रूफ आपको इसी नंबर पर भेजा जाएगा। किसी भी जानकारी हेतु संपर्क करें।_
धन्यवाद!
*${pressName}*`;

    const encoded = encodeURIComponent(msg);
    const url = cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}&text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank');
  };

  // 2-Copy Print Slip (Customer Copy + Workshop Copy)
  const handlePrintTwoCopySlip = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('कृपया ब्राउज़र का पॉप-अप ब्लॉक खोलें ताकि जॉब स्लिप प्रिंट हो सके।');
      return;
    }

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>जॉब स्लिप #${jobToken} - ${pressName}</title>
  <style>
    @page { size: A4 portrait; margin: 8mm; }
    body { font-family: 'Noto Serif Devanagari', Arial, sans-serif; font-size: 11.5px; color: #111; margin: 0; padding: 0; }
    .slip-box { border: 1.5px solid #222; border-radius: 4px; padding: 10px 14px; margin-bottom: 12px; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #444; padding-bottom: 6px; margin-bottom: 8px; }
    .press-title { font-size: 16px; font-weight: bold; color: #7f1d1d; }
    .token-badge { font-size: 13px; font-weight: bold; background: #fef3c7; border: 1px solid #d97706; padding: 3px 8px; border-radius: 4px; }
    .row { display: flex; justify-content: space-between; margin-bottom: 4px; }
    .col { flex: 1; }
    .label { font-weight: bold; color: #444; font-size: 10px; }
    .val { font-weight: 600; font-size: 11.5px; }
    table { width: 100%; border-collapse: collapse; margin: 8px 0; font-size: 11px; }
    th, td { border: 1px solid #666; padding: 4px 6px; text-align: left; }
    th { background: #f3f4f6; }
    .total-row { font-weight: bold; background: #fef2f2; }
    .cut-divider { border-top: 1.5px dashed #666; margin: 18px 0; text-align: center; position: relative; }
    .cut-text { position: absolute; top: -9px; left: 42%; background: #fff; padding: 0 8px; font-size: 10px; color: #555; }
    .copy-tag { font-size: 10px; font-weight: bold; padding: 1px 6px; border-radius: 3px; }
    .customer-tag { background: #dcfce7; color: #166534; }
    .workshop-tag { background: #fef3c7; color: #92400e; }
  </style>
</head>
<body>

  <!-- 1. CUSTOMER RECEIPT COPY -->
  <div class="slip-box">
    <div class="header">
      <div>
        <div class="press-title">卐 ${pressName}</div>
        <div style="font-size: 10px; color: #555;">मुद्रण जॉब पावती / ग्राहक प्रति</div>
      </div>
      <div style="text-align: right;">
        <span class="copy-tag customer-tag">ग्राहक प्रति (Customer Copy)</span>
        <div class="token-badge" style="margin-top: 4px;">टोकन: #${jobToken}</div>
      </div>
    </div>

    <div class="row">
      <div class="col"><span class="label">ग्राहक का नाम:</span> <span class="val">${customerName}</span></div>
      <div class="col"><span class="label">मोबाइल/WhatsApp:</span> <span class="val">${customerPhone || '-'}</span></div>
      <div class="col"><span class="label">ऑर्डर दिनांक:</span> <span class="val">${orderDate}</span></div>
    </div>

    <div class="row" style="margin-top: 4px;">
      <div class="col"><span class="label">कार्ड मॉडल:</span> <span class="val">${modelCode}</span></div>
      <div class="col"><span class="label">कुल कार्ड:</span> <span class="val">${qtyCards} नग</span></div>
      <div class="col"><span class="label">डिलीवरी तिथि:</span> <span class="val" style="color: #991b1b;">${deliveryDate} (${deliveryTime})</span></div>
    </div>

    <table>
      <thead>
        <tr>
          <th>विवरण</th>
          <th>मात्रा</th>
          <th>दर</th>
          <th>राशि (₹)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>शादी कार्ड छपाई (इनर + लिफाफा)</td>
          <td>${qtyCards}</td>
          <td>₹${ratePerUnit}</td>
          <td>₹${subtotalCards}</td>
        </tr>
        <tr>
          <td>स्क्रीन मेकिंग व बटर पेपर शुल्क</td>
          <td>1</td>
          <td>₹${screenCharge}</td>
          <td>₹${screenCharge}</td>
        </tr>
        ${extraCharge > 0 ? `<tr><td>अतिरिक्त शुल्क / VIP छपाई</td><td>-</td><td>-</td><td>₹${extraCharge}</td></tr>` : ''}
        <tr class="total-row">
          <td colspan="3" style="text-align: right;">कुल योग (Total):</td>
          <td>₹${grandTotal}</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align: right;">एडवांस जमा (Advance):</td>
          <td style="color: #166534; font-weight: bold;">- ₹${advancePaid} (${paymentMode})</td>
        </tr>
        <tr style="background: #fee2e2; font-size: 12px; font-weight: bold;">
          <td colspan="3" style="text-align: right; color: #991b1b;">शेष बकाया राशि (Balance Due):</td>
          <td style="color: #991b1b;">₹${balanceDue}</td>
        </tr>
      </tbody>
    </table>

    <div style="font-size: 9.5px; color: #666; margin-top: 4px; display: flex; justify-content: space-between;">
      <span>• छपाई से पूर्व व्हाट्सएप पर भेजा गया प्रूफ भली-भाँति जांच लें।</span>
      <span style="border-top: 1px solid #888; padding-top: 2px;">दुकानदार हस्ताक्षर</span>
    </div>
  </div>

  <!-- CUT DIVIDER -->
  <div class="cut-divider">
    <span class="cut-text">✂️ यहाँ से काटें (Cut Along Line) ✂️</span>
  </div>

  <!-- 2. WORKSHOP / PRESS PRODUCTION COPY -->
  <div class="slip-box" style="border: 2px dashed #333;">
    <div class="header">
      <div>
        <div class="press-title" style="color: #000;">🖨️ प्रेस वर्कशॉप / कारीगर जॉब स्लिप</div>
        <div style="font-size: 10px; color: #555;">स्क्रीन प्रिंटिंग उत्पादन विवरण</div>
      </div>
      <div style="text-align: right;">
        <span class="copy-tag workshop-tag">कारीगर प्रति (Workshop Copy)</span>
        <div class="token-badge" style="margin-top: 4px;">जॉब #${jobToken}</div>
      </div>
    </div>

    <div class="row">
      <div class="col"><span class="label">पार्टी/ग्राहक:</span> <span class="val">${customerName}</span></div>
      <div class="col"><span class="label">फोन:</span> <span class="val">${customerPhone || '-'}</span></div>
      <div class="col"><span class="label">डिलीवरी डेडलाइन:</span> <span class="val" style="color: #b91c1c; font-weight: bold;">${deliveryDate} (${deliveryTime})</span></div>
    </div>

    <div class="row" style="margin-top: 6px; background: #f3f4f6; padding: 6px; border-radius: 4px;">
      <div class="col"><span class="label">कार्ड मॉडल:</span> <div class="val" style="font-size: 13px;">${modelCode}</div></div>
      <div class="col"><span class="label">छापने योग्य कार्ड संख्या:</span> <div class="val" style="font-size: 14px; color: #991b1b;">${qtyCards} कार्ड्स</div></div>
      <div class="col"><span class="label">लिफाफा संख्या:</span> <div class="val" style="font-size: 14px; color: #991b1b;">${qtyEnvelopes} लिफाफे</div></div>
    </div>

    <div style="margin-top: 6px;">
      <span class="label">कारीगर हेतु विशेष निर्देश:</span>
      <div style="font-weight: 600; padding: 4px 6px; border: 1px solid #ccc; border-radius: 4px; min-height: 24px; background: #fffdf7;">
        ${instructions || 'बटर पेपर 600 DPI डार्क टोनर पर निकालें। अलाइनमेंट सावधानी से चेक करें।'}
      </div>
    </div>

    <div class="row" style="margin-top: 8px; font-size: 10px; color: #444;">
      <div>बकाया वसूली: <strong>₹${balanceDue}</strong> (कार्ड देते समय लेना अनिवार्य है)</div>
      <div>प्रिंटिंग पूर्ण तिथि: _________________</div>
      <div>कारीगर हस्ताक्षर: _________________</div>
    </div>
  </div>

  <script>
    window.onload = function() { window.print(); }
  </script>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  const filteredOrders = savedOrders.filter(o =>
    (o.customerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.customerPhone || '').includes(searchQuery) ||
    (o.id || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs select-none no-print">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="bg-[#450a0a] text-amber-100 px-4 py-3 border-b border-amber-600/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-base">
              📋
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>डिजिटल जॉब स्लिप, टोकन व बिलिंग सिस्टम</span>
                <span className="bg-amber-400 text-stone-950 text-[10px] px-2 py-0.2 rounded font-mono font-bold">
                  #{jobToken}
                </span>
              </h2>
              <p className="text-[10.5px] text-amber-200/80">
                {pressName} • भारतीय प्रिंटिंग प्रेस व स्क्रीन प्रिंटर जॉब मैनेजर
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Order History Button */}
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border font-semibold transition ${
                showHistory
                  ? 'bg-amber-400 text-stone-950 border-amber-300'
                  : 'bg-black/30 hover:bg-black/50 text-amber-200 border-amber-500/40'
              }`}
              title="पुराने ऑर्डर्स का खाता देखें"
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ऑर्डर खाता ({savedOrders.length})</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-white/10 text-stone-300 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="bg-emerald-600 text-white text-xs py-1.5 px-4 text-center font-bold shadow-inner flex items-center justify-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>{notification}</span>
          </div>
        )}

        {/* Status Lifecycle Header */}
        <div className="bg-stone-100 border-b border-stone-200 px-4 py-2 overflow-x-auto scrollbar-none flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-stone-600 flex-shrink-0 mr-1">
            ऑर्डर स्थिति:
          </span>
          {ORDER_STATUS_STEPS.map((step) => {
            const isActive = currentStatus === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => updateField('jobCardStatus', step.id)}
                className={`px-2.5 py-1 rounded-md text-[10.5px] font-bold transition border flex-shrink-0 ${
                  isActive
                    ? 'ring-2 ring-red-700 shadow-xs ' + step.color
                    : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
                }`}
              >
                {step.label}
              </button>
            );
          })}
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-4 relative">
          {/* VIEW A: ORDER HISTORY DRAWER */}
          {showHistory ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                  <History className="w-4 h-4 text-red-700" />
                  <span>दुकान का डिजिटल खाता (Saved Orders History)</span>
                </h3>
                <div className="relative w-64">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="नाम, फोन या टोकन से खोजें..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-stone-500 bg-stone-50 rounded-xl border border-stone-200">
                  <p className="text-sm font-semibold">कोई सुरक्षित ऑर्डर नहीं मिला।</p>
                  <p className="text-xs mt-1">वर्तमान फॉर्म को सुरक्षित करने हेतु "ऑर्डर सेव करें" बटन दबाएं।</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {filteredOrders.map((order) => {
                    const statusMeta = ORDER_STATUS_STEPS.find(s => s.id === order.status) || ORDER_STATUS_STEPS[0];
                    return (
                      <div
                        key={order.id}
                        onClick={() => handleLoadOrder(order)}
                        className="p-3 bg-white border border-stone-200 hover:border-red-600 rounded-xl shadow-xs transition cursor-pointer hover:bg-red-50/20 group relative"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono font-bold bg-stone-100 text-stone-800 px-1.5 py-0.5 rounded border border-stone-300">
                              #{order.id}
                            </span>
                            <h4 className="font-bold text-stone-900 text-xs mt-1">
                              {order.customerName}
                            </h4>
                            <p className="text-[11px] text-stone-500">{order.customerPhone || 'फोन नहीं दिया'}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${statusMeta.color}`}>
                              {statusMeta.label}
                            </span>
                            <div className="font-bold text-red-950 text-xs mt-1">
                              कुल: ₹{order.grandTotal}
                            </div>
                            <div className="text-[10.5px] text-red-700 font-semibold">
                              बकाया: ₹{order.balanceDue}
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                          <span>📦 {order.qtyCards} कार्ड • {order.modelCode?.split(' ')[0]}</span>
                          <span>डिलीवरी: {order.deliveryDate}</span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleDeleteOrder(order.id, e)}
                          className="absolute bottom-2 right-2 p-1 text-stone-400 hover:text-red-700 hover:bg-red-100 rounded transition"
                          title="हटाएं"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* VIEW B: JOB SLIP & BILLING FORM */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Left Column: Order Specifications (7 Cols) */}
              <div className="lg:col-span-7 space-y-3">
                {/* 1. Customer & Delivery Box */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-2.5">
                  <div className="flex items-center justify-between font-bold text-xs text-stone-800 border-b border-stone-200 pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-red-700" />
                      <span>ग्राहक एवं डिलीवरी विवरण:</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleRegenerateToken}
                      className="text-[10px] text-red-700 hover:underline flex items-center gap-1 font-mono"
                      title="नया टोकन नंबर बनाएं"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>नया टोकन</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10.5px] font-semibold text-stone-600">ग्राहक का नाम:</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => updateField('clientProofName', e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded px-2.5 py-1 text-xs font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600 mt-0.5"
                        placeholder="ग्राहक का नाम"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-semibold text-stone-600">WhatsApp मोबाइल नंबर:</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => updateField('clientProofPhone', e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded px-2.5 py-1 text-xs font-mono font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600 mt-0.5"
                        placeholder="9876543210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10.5px] font-semibold text-stone-600">संभावित डिलीवरी दिनांक:</label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => updateField('jobCardDeliveryDate', e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600 mt-0.5 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-semibold text-stone-600">डिलीवरी समय:</label>
                      <input
                        type="text"
                        value={deliveryTime}
                        onChange={(e) => updateField('jobCardDeliveryTime', e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded px-2.5 py-1 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600 mt-0.5"
                        placeholder="शाम 05:00 बजे"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Printing & Production Specs */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-2.5">
                  <div className="font-bold text-xs text-stone-800 border-b border-stone-200 pb-1.5 flex items-center gap-1.5">
                    <Printer className="w-3.5 h-3.5 text-red-700" />
                    <span>छपाई व कार्ड का तकनीकी विवरण (Workshop Specs):</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="text-[10.5px] font-semibold text-stone-600">कार्ड मॉडल / कोड:</label>
                      <input
                        type="text"
                        value={modelCode}
                        onChange={(e) => updateField('jobCardModelCode', e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-xs font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600 mt-0.5"
                        placeholder="मॉडल 502"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-semibold text-stone-600">कुल कार्ड मात्रा:</label>
                      <input
                        type="number"
                        min="25"
                        max="5000"
                        step="25"
                        value={qtyCards}
                        onChange={(e) => updateField('jobCardQuantity', Number(e.target.value))}
                        className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-xs font-bold font-mono text-red-950 focus:outline-none focus:ring-1 focus:ring-red-600 mt-0.5"
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-semibold text-stone-600">लिफाफों की संख्या:</label>
                      <input
                        type="number"
                        min="25"
                        max="5000"
                        step="25"
                        value={qtyEnvelopes}
                        onChange={(e) => updateField('jobCardEnvelopeQuantity', Number(e.target.value))}
                        className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-xs font-bold font-mono text-red-950 focus:outline-none focus:ring-1 focus:ring-red-600 mt-0.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10.5px] font-semibold text-stone-600">कारीगर हेतु विशेष निर्देश (Special Instructions):</label>
                    <textarea
                      rows={2}
                      value={instructions}
                      onChange={(e) => updateField('jobCardSpecialInstructions', e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded px-2.5 py-1.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600 mt-0.5"
                      placeholder="उदा. 25 लिफाफे पर VIP नाम, बटर पेपर 600 DPI पर डार्क टोनर आदि..."
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Financials & Billing Calculator (5 Cols) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="bg-gradient-to-b from-stone-50 to-amber-50/50 border border-stone-300 rounded-xl p-3.5 space-y-2.5 shadow-xs">
                  <div className="font-bold text-xs text-red-950 border-b border-stone-200 pb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-3.5 h-3.5 text-red-700" />
                      <span>बिलिंग व लेखा-जोखा (Billing & Ledger):</span>
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono">₹ INR</span>
                  </div>

                  {/* Rate per card */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-700 font-medium">कार्ड दर प्रति नग:</span>
                    <div className="flex items-center gap-1 w-24">
                      <span className="text-stone-400">₹</span>
                      <input
                        type="number"
                        step="0.5"
                        value={ratePerUnit}
                        onChange={(e) => updateField('jobCardRatePerUnit', Number(e.target.value))}
                        className="w-full bg-white border border-stone-300 rounded px-1.5 py-0.5 text-right font-bold text-stone-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  {/* Subtotal Cards */}
                  <div className="flex items-center justify-between text-xs text-stone-600 pl-2">
                    <span>कार्ड राशि ({qtyCards} × ₹{ratePerUnit}):</span>
                    <span className="font-mono font-bold text-stone-800">₹{subtotalCards.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Screen Making Charge */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-700 font-medium">स्क्रीन/बटर मेकिंग खर्च:</span>
                    <div className="flex items-center gap-1 w-24">
                      <span className="text-stone-400">₹</span>
                      <input
                        type="number"
                        step="10"
                        value={screenCharge}
                        onChange={(e) => updateField('jobCardScreenMakingCharge', Number(e.target.value))}
                        className="w-full bg-white border border-stone-300 rounded px-1.5 py-0.5 text-right font-bold text-stone-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  {/* Extra Charge */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-700 font-medium">अतिरिक्त / अन्य खर्च:</span>
                    <div className="flex items-center gap-1 w-24">
                      <span className="text-stone-400">₹</span>
                      <input
                        type="number"
                        step="10"
                        value={extraCharge}
                        onChange={(e) => updateField('jobCardExtraCharge', Number(e.target.value))}
                        className="w-full bg-white border border-stone-300 rounded px-1.5 py-0.5 text-right font-bold text-stone-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  {/* Grand Total Bar */}
                  <div className="pt-2 border-t-2 border-stone-300 flex items-center justify-between text-sm font-bold bg-amber-100/60 p-2 rounded-lg border border-amber-300/80">
                    <span className="text-red-950">कुल बिल (Grand Total):</span>
                    <span className="text-red-900 font-mono text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Advance Paid */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-stone-700 font-medium">एडवांस जमा (Advance):</span>
                    <div className="flex items-center gap-1 w-28">
                      <span className="text-stone-400">₹</span>
                      <input
                        type="number"
                        step="50"
                        value={advancePaid}
                        onChange={(e) => updateField('jobCardAdvancePaid', Number(e.target.value))}
                        className="w-full bg-emerald-50 border border-emerald-400 rounded px-1.5 py-0.5 text-right font-bold text-emerald-950 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  {/* Payment Mode */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-700 font-medium">भुगतान माध्यम:</span>
                    <select
                      value={paymentMode}
                      onChange={(e) => updateField('jobCardPaymentMode', e.target.value)}
                      className="bg-white border border-stone-300 rounded px-2 py-0.5 text-xs font-semibold focus:outline-none"
                    >
                      <option value="UPI">UPI / GPay / PhonePe</option>
                      <option value="Cash">नकद (Cash)</option>
                      <option value="Bank">बैंक ट्रांसफर (NEFT)</option>
                      <option value="Due">उधार (Due)</option>
                    </select>
                  </div>

                  {/* Balance Due Display Banner */}
                  <div className="p-2.5 rounded-lg border border-red-300 bg-red-50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-red-800 uppercase tracking-wider block">
                        शेष बकाया राशि
                      </span>
                      <span className="text-xs text-red-600">कार्ड डिलीवरी पर देय</span>
                    </div>
                    <span className="font-mono font-black text-lg text-red-700">
                      ₹{balanceDue.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="bg-stone-100 border-t border-stone-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveOrder}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-amber-300 border border-amber-400/60 shadow-xs transition"
              title="ब्राउज़र के लोकल खाते में ऑर्डर सुरक्षित करें"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ऑर्डर सुरक्षित करें</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp Receipt */}
            <button
              type="button"
              onClick={handleSendWhatsAppReceipt}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white shadow-xs transition"
              title="ग्राहक के WhatsApp पर डिजिटल रसीद भेजें"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>📲 WhatsApp रसीद</span>
            </button>

            {/* 2-Copy Print Slip */}
            <button
              type="button"
              onClick={handlePrintTwoCopySlip}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-red-800 hover:bg-red-700 text-white shadow-xs transition"
              title="ग्राहक प्रति + कारीगर प्रति दोनों एक साथ प्रिंट करें"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>🖨️ 2-कॉपी जॉब स्लिप प्रिंट</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
