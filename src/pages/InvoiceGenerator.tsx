import { useState } from "react";
import { FileText, Download, Plus, Trash2, Calculator, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

const InvoiceGenerator = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    gst: ""
  });

  const [clientInfo, setClientInfo] = useState({
    name: "",
    address: "",
    email: "",
    phone: ""
  });

  const [invoiceDetails, setInvoiceDetails] = useState({
    number: `INV-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: "",
    notes: ""
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "", quantity: 1, rate: 0, amount: 0 }
  ]);

  const [gstRate, setGstRate] = useState(18);
  const { toast } = useToast();

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const gstAmount = (subtotal * gstRate) / 100;
    const total = subtotal + gstAmount;
    
    return { subtotal, gstAmount, total };
  };

  const generateInvoice = () => {
    if (!companyInfo.name || !clientInfo.name || items.some(item => !item.description)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const { subtotal, gstAmount, total } = calculateTotals();

    const invoiceHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice ${invoiceDetails.number}</title>
    <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; color: #333; }
        .invoice { max-width: 800px; margin: 0 auto; background: white; }
        .header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
        .company-info h1 { color: #2563eb; margin: 0 0 10px 0; font-size: 28px; }
        .invoice-details { text-align: right; }
        .invoice-details h2 { color: #2563eb; margin: 0 0 10px 0; font-size: 24px; }
        .parties { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .party { width: 48%; }
        .party h3 { color: #374151; margin-bottom: 10px; font-size: 16px; }
        .party-info { background: #f8fafc; padding: 15px; border-radius: 8px; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .items-table th { background: #2563eb; color: white; padding: 12px; text-align: left; }
        .items-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
        .items-table tr:nth-child(even) { background: #f8fafc; }
        .totals { margin-left: auto; width: 300px; }
        .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
        .total-row.final { border-top: 2px solid #2563eb; font-weight: bold; font-size: 18px; color: #2563eb; }
        .notes { margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px; }
        .footer { margin-top: 40px; text-align: center; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="invoice">
        <div class="header">
            <div class="company-info">
                <h1>${companyInfo.name}</h1>
                <div>${companyInfo.address.replace(/\n/g, '<br>')}</div>
                ${companyInfo.email ? `<div>Email: ${companyInfo.email}</div>` : ''}
                ${companyInfo.phone ? `<div>Phone: ${companyInfo.phone}</div>` : ''}
                ${companyInfo.gst ? `<div>GST: ${companyInfo.gst}</div>` : ''}
            </div>
            <div class="invoice-details">
                <h2>INVOICE</h2>
                <div><strong>Invoice #:</strong> ${invoiceDetails.number}</div>
                <div><strong>Date:</strong> ${new Date(invoiceDetails.date).toLocaleDateString()}</div>
                ${invoiceDetails.dueDate ? `<div><strong>Due Date:</strong> ${new Date(invoiceDetails.dueDate).toLocaleDateString()}</div>` : ''}
            </div>
        </div>

        <div class="parties">
            <div class="party">
                <h3>Bill To:</h3>
                <div class="party-info">
                    <div><strong>${clientInfo.name}</strong></div>
                    <div>${clientInfo.address.replace(/\n/g, '<br>')}</div>
                    ${clientInfo.email ? `<div>${clientInfo.email}</div>` : ''}
                    ${clientInfo.phone ? `<div>${clientInfo.phone}</div>` : ''}
                </div>
            </div>
        </div>

        <table class="items-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(item => `
                <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.rate.toFixed(2)}</td>
                    <td>₹${item.amount.toFixed(2)}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>

        <div class="totals">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>₹${subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
                <span>GST (${gstRate}%):</span>
                <span>₹${gstAmount.toFixed(2)}</span>
            </div>
            <div class="total-row final">
                <span>Total:</span>
                <span>₹${total.toFixed(2)}</span>
            </div>
        </div>

        ${invoiceDetails.notes ? `
        <div class="notes">
            <h3>Notes:</h3>
            <p>${invoiceDetails.notes.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}

        <div class="footer">
            <p>Thank you for your business!</p>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
    </div>
</body>
</html>`;

    const element = document.createElement("a");
    const file = new Blob([invoiceHTML], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = `invoice_${invoiceDetails.number}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Invoice downloaded. Open in browser to print as PDF."
    });
  };

  const { subtotal, gstAmount, total } = calculateTotals();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating Back Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 left-6 z-40 bg-white/80 hover:bg-white/90 text-gray-800 shadow rounded-full"
        aria-label="Back to Home"
        onClick={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.location.href = "/";
          }
        }}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <Header searchTerm="" setSearchTerm={() => {}} />
      <div className="container mx-auto px-4 pt-6 pb-8 max-w-6xl">
        {/* Icon + Title + Subtitle Centered */}
        <div className="flex flex-col items-center justify-center mb-10 mt-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full shadow mb-4">
            <FileText className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Invoice Generator</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Create professional invoices with GST calculation and download as PDF
          </p>
        </div>

        <div className="space-y-8">
          {/* Company and Client Info */}
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Company Name *"
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
                />
                <Textarea
                  placeholder="Company Address"
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Email"
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <Input
                    placeholder="Phone"
                    value={companyInfo.phone}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <Input
                  placeholder="GST Number"
                  value={companyInfo.gst}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, gst: e.target.value }))}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Client Name *"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo(prev => ({ ...prev, name: e.target.value }))}
                />
                <Textarea
                  placeholder="Client Address"
                  value={clientInfo.address}
                  onChange={(e) => setClientInfo(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Email"
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <Input
                    placeholder="Phone"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Input
                  placeholder="Invoice Number"
                  value={invoiceDetails.number}
                  onChange={(e) => setInvoiceDetails(prev => ({ ...prev, number: e.target.value }))}
                />
                <div>
                  <label className="text-sm font-medium">Invoice Date</label>
                  <Input
                    type="date"
                    value={invoiceDetails.date}
                    onChange={(e) => setInvoiceDetails(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <Input
                    type="date"
                    value={invoiceDetails.dueDate}
                    onChange={(e) => setInvoiceDetails(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">GST Rate (%)</label>
                  <Input
                    type="number"
                    value={gstRate}
                    onChange={(e) => setGstRate(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Invoice Items</CardTitle>
                <Button onClick={addItem} variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="grid gap-4 md:grid-cols-6 items-end p-4 border rounded-lg">
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Qty</label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Rate (₹)</label>
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Amount</label>
                      <div className="p-2 bg-muted rounded text-sm font-medium">
                        ₹{item.amount.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      {items.length > 1 && (
                        <Button
                          onClick={() => removeItem(item.id)}
                          variant="outline"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Totals and Notes */}
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Additional notes or terms..."
                  value={invoiceDetails.notes}
                  onChange={(e) => setInvoiceDetails(prev => ({ ...prev, notes: e.target.value }))}
                  rows={6}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST ({gstRate}%):</span>
                    <span>₹{gstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-4">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  
                  <Button onClick={generateInvoice} className="w-full" size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Generate Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InvoiceGenerator;