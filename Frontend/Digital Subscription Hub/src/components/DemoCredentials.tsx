import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Users, Crown } from "lucide-react";
import { useState } from "react";

const DemoCredentials = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const demoAccounts = [
    {
      email: 'demo@sunstone.com',
      password: 'password',
      name: 'Demo User',
      role: 'user',
      description: 'Regular user account for testing'
    },
    {
      email: 'admin@sunstone.com',
      password: 'password',
      name: 'Admin User',
      role: 'admin',
      description: 'Admin account with full access'
    },
    {
      email: 'john@example.com',
      password: 'password123',
      name: 'John Doe',
      role: 'user',
      description: 'Sample user account'
    },
    {
      email: 'jane@example.com',
      password: 'password123',
      name: 'Jane Smith',
      role: 'user',
      description: 'Sample user account'
    },
    {
      email: 'manager@sunstone.com',
      password: 'admin123',
      name: 'Manager User',
      role: 'admin',
      description: 'Manager admin account'
    }
  ];

  const copyToClipboard = async (text: string, email: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Demo Login Credentials</span>
        </CardTitle>
        <CardDescription>
          Use any of these credentials to test the login functionality. No backend required!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demoAccounts.map((account, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {account.role === 'admin' ? (
                    <Crown className="h-4 w-4 text-yellow-600" />
                  ) : (
                    <Users className="h-4 w-4 text-blue-600" />
                  )}
                  <span className="font-medium">{account.name}</span>
                </div>
                <Badge variant={account.role === 'admin' ? 'default' : 'secondary'}>
                  {account.role}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">{account.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium w-12">Email:</span>
                  <code className="flex-1 bg-muted px-2 py-1 rounded text-sm">
                    {account.email}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(account.email, account.email)}
                  >
                    {copiedEmail === account.email ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium w-12">Password:</span>
                  <code className="flex-1 bg-muted px-2 py-1 rounded text-sm">
                    {account.password}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(account.password, account.email)}
                  >
                    {copiedEmail === account.email ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Quick Start:</h4>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Click "Sign In" in the navigation</li>
            <li>2. Use any of the credentials above</li>
            <li>3. Explore the user dashboard or admin panel</li>
            <li>4. All data is stored locally in your browser</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoCredentials;
