import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  Store, 
  Mail, 
  CreditCard, 
  Truck, 
  Shield, 
  Palette, 
  Bell,
  Globe,
  Database,
  Key,
  Trash2,
  Download,
  Upload
} from 'lucide-react';

import AdminHeader from '@/components/admin-header';

export default function AdminSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock settings data (in production, fetch from API)
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'ZARA Fashion Store',
    storeDescription: 'Premium fashion and customizable clothing',
    storeEmail: 'contact@zara-store.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Fashion Ave, New York, NY 10001',
    currency: 'USD',
    timezone: 'America/New_York',
    enableGuestCheckout: true,
    requirePhoneNumber: false,
    enableReviews: true,
    enableWishlist: true,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    stripePublishableKey: 'pk_test_...',
    stripeSecretKey: 'sk_test_...',
    paypalEnabled: false,
    paypalClientId: '',
    taxRate: '8.25',
    freeShippingThreshold: '100',
  });

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingEnabled: true,
    freeShippingThreshold: '100',
    standardShippingRate: '9.99',
    expressShippingRate: '19.99',
    internationalShippingEnabled: false,
    internationalShippingRate: '29.99',
    estimatedDeliveryDays: '5-7',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newOrderNotifications: true,
    lowStockNotifications: true,
    customerSignupNotifications: false,
    reviewNotifications: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '24',
    loginAttempts: '5',
    passwordMinLength: '8',
    requireStrongPassword: true,
    enableCaptcha: false,
  });

  const saveSettings = useMutation({
    mutationFn: async (settings: any) => {
      // Mock API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      toast({ title: 'Settings saved successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to save settings', variant: 'destructive' });
    },
  });

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Configure your store settings and preferences</p>
          </div>
          <Button 
            onClick={() => saveSettings.mutate({})} 
            disabled={saveSettings.isPending}
            data-testid="button-save-settings"
          >
            <Save className="w-4 h-4 mr-2" />
            {saveSettings.isPending ? 'Saving...' : 'Save All Settings'}
          </Button>
        </div>

        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="store" data-testid="tab-store-settings">
              <Store className="w-4 h-4 mr-2" />
              Store
            </TabsTrigger>
            <TabsTrigger value="payment" data-testid="tab-payment-settings">
              <CreditCard className="w-4 h-4 mr-2" />
              Payment
            </TabsTrigger>
            <TabsTrigger value="shipping" data-testid="tab-shipping-settings">
              <Truck className="w-4 h-4 mr-2" />
              Shipping
            </TabsTrigger>
            <TabsTrigger value="notifications" data-testid="tab-notification-settings">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" data-testid="tab-security-settings">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="advanced" data-testid="tab-advanced-settings">
              <Database className="w-4 h-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Store Settings */}
          <TabsContent value="store">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Configure your store's basic details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      value={storeSettings.storeName}
                      onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
                      data-testid="input-store-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeDescription">Store Description</Label>
                    <Textarea
                      id="storeDescription"
                      value={storeSettings.storeDescription}
                      onChange={(e) => setStoreSettings({...storeSettings, storeDescription: e.target.value})}
                      data-testid="textarea-store-description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Contact Email</Label>
                    <Input
                      id="storeEmail"
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
                      data-testid="input-store-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Phone Number</Label>
                    <Input
                      id="storePhone"
                      value={storeSettings.storePhone}
                      onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
                      data-testid="input-store-phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Address</Label>
                    <Textarea
                      id="storeAddress"
                      value={storeSettings.storeAddress}
                      onChange={(e) => setStoreSettings({...storeSettings, storeAddress: e.target.value})}
                      data-testid="textarea-store-address"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Settings</CardTitle>
                  <CardDescription>Configure regional preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select value={storeSettings.currency} onValueChange={(value) => setStoreSettings({...storeSettings, currency: value})}>
                      <SelectTrigger data-testid="select-currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={storeSettings.timezone} onValueChange={(value) => setStoreSettings({...storeSettings, timezone: value})}>
                      <SelectTrigger data-testid="select-timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="Europe/London">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Customer Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enableGuestCheckout">Allow Guest Checkout</Label>
                        <Switch
                          id="enableGuestCheckout"
                          checked={storeSettings.enableGuestCheckout}
                          onCheckedChange={(checked) => setStoreSettings({...storeSettings, enableGuestCheckout: checked})}
                          data-testid="switch-guest-checkout"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="requirePhoneNumber">Require Phone Number</Label>
                        <Switch
                          id="requirePhoneNumber"
                          checked={storeSettings.requirePhoneNumber}
                          onCheckedChange={(checked) => setStoreSettings({...storeSettings, requirePhoneNumber: checked})}
                          data-testid="switch-require-phone"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enableReviews">Enable Product Reviews</Label>
                        <Switch
                          id="enableReviews"
                          checked={storeSettings.enableReviews}
                          onCheckedChange={(checked) => setStoreSettings({...storeSettings, enableReviews: checked})}
                          data-testid="switch-enable-reviews"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enableWishlist">Enable Wishlist</Label>
                        <Switch
                          id="enableWishlist"
                          checked={storeSettings.enableWishlist}
                          onCheckedChange={(checked) => setStoreSettings({...storeSettings, enableWishlist: checked})}
                          data-testid="switch-enable-wishlist"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stripe Configuration</CardTitle>
                  <CardDescription>Configure Stripe payment processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="stripeEnabled">Enable Stripe</Label>
                    <Switch
                      id="stripeEnabled"
                      checked={paymentSettings.stripeEnabled}
                      onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, stripeEnabled: checked})}
                      data-testid="switch-stripe-enabled"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripePublishableKey">Publishable Key</Label>
                    <Input
                      id="stripePublishableKey"
                      value={paymentSettings.stripePublishableKey}
                      onChange={(e) => setPaymentSettings({...paymentSettings, stripePublishableKey: e.target.value})}
                      placeholder="pk_test_..."
                      data-testid="input-stripe-publishable-key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripeSecretKey">Secret Key</Label>
                    <Input
                      id="stripeSecretKey"
                      type="password"
                      value={paymentSettings.stripeSecretKey}
                      onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecretKey: e.target.value})}
                      placeholder="sk_test_..."
                      data-testid="input-stripe-secret-key"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax & Pricing</CardTitle>
                  <CardDescription>Configure tax rates and pricing settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      step="0.01"
                      value={paymentSettings.taxRate}
                      onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: e.target.value})}
                      data-testid="input-tax-rate"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                    <Input
                      id="freeShippingThreshold"
                      type="number"
                      value={paymentSettings.freeShippingThreshold}
                      onChange={(e) => setPaymentSettings({...paymentSettings, freeShippingThreshold: e.target.value})}
                      data-testid="input-free-shipping-threshold"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">PayPal (Optional)</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="paypalEnabled">Enable PayPal</Label>
                      <Switch
                        id="paypalEnabled"
                        checked={paymentSettings.paypalEnabled}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, paypalEnabled: checked})}
                        data-testid="switch-paypal-enabled"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                      <Input
                        id="paypalClientId"
                        value={paymentSettings.paypalClientId}
                        onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientId: e.target.value})}
                        placeholder="Enter PayPal Client ID"
                        data-testid="input-paypal-client-id"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Rates</CardTitle>
                  <CardDescription>Configure shipping options and rates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="freeShippingEnabled">Enable Free Shipping</Label>
                    <Switch
                      id="freeShippingEnabled"
                      checked={shippingSettings.freeShippingEnabled}
                      onCheckedChange={(checked) => setShippingSettings({...shippingSettings, freeShippingEnabled: checked})}
                      data-testid="switch-free-shipping-enabled"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="standardShippingRate">Standard Shipping Rate ($)</Label>
                    <Input
                      id="standardShippingRate"
                      type="number"
                      step="0.01"
                      value={shippingSettings.standardShippingRate}
                      onChange={(e) => setShippingSettings({...shippingSettings, standardShippingRate: e.target.value})}
                      data-testid="input-standard-shipping-rate"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expressShippingRate">Express Shipping Rate ($)</Label>
                    <Input
                      id="expressShippingRate"
                      type="number"
                      step="0.01"
                      value={shippingSettings.expressShippingRate}
                      onChange={(e) => setShippingSettings({...shippingSettings, expressShippingRate: e.target.value})}
                      data-testid="input-express-shipping-rate"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedDeliveryDays">Estimated Delivery Time</Label>
                    <Input
                      id="estimatedDeliveryDays"
                      value={shippingSettings.estimatedDeliveryDays}
                      onChange={(e) => setShippingSettings({...shippingSettings, estimatedDeliveryDays: e.target.value})}
                      placeholder="5-7 business days"
                      data-testid="input-estimated-delivery"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>International Shipping</CardTitle>
                  <CardDescription>Configure international shipping options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="internationalShippingEnabled">Enable International Shipping</Label>
                    <Switch
                      id="internationalShippingEnabled"
                      checked={shippingSettings.internationalShippingEnabled}
                      onCheckedChange={(checked) => setShippingSettings({...shippingSettings, internationalShippingEnabled: checked})}
                      data-testid="switch-international-shipping"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="internationalShippingRate">International Shipping Rate ($)</Label>
                    <Input
                      id="internationalShippingRate"
                      type="number"
                      step="0.01"
                      value={shippingSettings.internationalShippingRate}
                      onChange={(e) => setShippingSettings({...shippingSettings, internationalShippingRate: e.target.value})}
                      disabled={!shippingSettings.internationalShippingEnabled}
                      data-testid="input-international-shipping-rate"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <Switch
                          id="emailNotifications"
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                          data-testid="switch-email-notifications"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                        <Switch
                          id="smsNotifications"
                          checked={notificationSettings.smsNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                          data-testid="switch-sms-notifications"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="newOrderNotifications">New Orders</Label>
                        <Switch
                          id="newOrderNotifications"
                          checked={notificationSettings.newOrderNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newOrderNotifications: checked})}
                          data-testid="switch-new-order-notifications"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="lowStockNotifications">Low Stock Alerts</Label>
                        <Switch
                          id="lowStockNotifications"
                          checked={notificationSettings.lowStockNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, lowStockNotifications: checked})}
                          data-testid="switch-low-stock-notifications"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="customerSignupNotifications">New Customer Signups</Label>
                        <Switch
                          id="customerSignupNotifications"
                          checked={notificationSettings.customerSignupNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, customerSignupNotifications: checked})}
                          data-testid="switch-customer-signup-notifications"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="reviewNotifications">Product Reviews</Label>
                        <Switch
                          id="reviewNotifications"
                          checked={notificationSettings.reviewNotifications}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, reviewNotifications: checked})}
                          data-testid="switch-review-notifications"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication Security</CardTitle>
                  <CardDescription>Configure security and authentication settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactorEnabled">Enable Two-Factor Authentication</Label>
                    <Switch
                      id="twoFactorEnabled"
                      checked={securitySettings.twoFactorEnabled}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorEnabled: checked})}
                      data-testid="switch-two-factor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                    <Select value={securitySettings.sessionTimeout} onValueChange={(value) => setSecuritySettings({...securitySettings, sessionTimeout: value})}>
                      <SelectTrigger data-testid="select-session-timeout">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="72">3 days</SelectItem>
                        <SelectItem value="168">1 week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Select value={securitySettings.loginAttempts} onValueChange={(value) => setSecuritySettings({...securitySettings, loginAttempts: value})}>
                      <SelectTrigger data-testid="select-login-attempts">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password Requirements</CardTitle>
                  <CardDescription>Configure password security requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                    <Select value={securitySettings.passwordMinLength} onValueChange={(value) => setSecuritySettings({...securitySettings, passwordMinLength: value})}>
                      <SelectTrigger data-testid="select-password-min-length">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 characters</SelectItem>
                        <SelectItem value="8">8 characters</SelectItem>
                        <SelectItem value="12">12 characters</SelectItem>
                        <SelectItem value="16">16 characters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireStrongPassword">Require Strong Passwords</Label>
                    <Switch
                      id="requireStrongPassword"
                      checked={securitySettings.requireStrongPassword}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireStrongPassword: checked})}
                      data-testid="switch-strong-password"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableCaptcha">Enable CAPTCHA</Label>
                    <Switch
                      id="enableCaptcha"
                      checked={securitySettings.enableCaptcha}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enableCaptcha: checked})}
                      data-testid="switch-captcha"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Backup, export, and manage your store data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="flex items-center justify-center" data-testid="button-export-data">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center" data-testid="button-backup-data">
                      <Database className="w-4 h-4 mr-2" />
                      Create Backup
                    </Button>
                    <Button variant="destructive" className="flex items-center justify-center" data-testid="button-clear-cache">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Cache
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                  <CardDescription>Manage API keys and integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="apiKey"
                        value="sk_live_••••••••••••••••••••••••••••"
                        readOnly
                        data-testid="input-api-key"
                      />
                      <Button variant="outline" size="sm">
                        <Key className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      placeholder="https://your-store.com/webhooks"
                      data-testid="input-webhook-url"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>Irreversible and destructive actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950 dark:border-red-800">
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Reset All Settings</h4>
                      <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                        This will reset all your store settings to default values. This action cannot be undone.
                      </p>
                      <Button variant="destructive" size="sm" data-testid="button-reset-settings">
                        Reset All Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );
}