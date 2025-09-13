import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  LogOut, 
  Shield, 
  Zap, 
  Users,
  ArrowLeft,
  Settings,
  Bell,
  CreditCard,
  Wifi,
  BarChart3,
  Calendar,
  Download,
  Upload,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Mock data for demonstration
  const stats = [
    {
      icon: <Wifi className="h-5 w-5" />,
      title: "Data Usage",
      value: "847 GB",
      description: "Used this month (1.2 TB limit)",
      progress: 70,
      color: "text-blue-600"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Current Speed",
      value: "95 Mbps",
      description: "Download speed",
      progress: 95,
      color: "text-green-600"
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Next Billing",
      value: "Dec 15",
      description: "₹3,000 due",
      progress: 0,
      color: "text-orange-600"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Account Status",
      value: "Active",
      description: "All services running",
      progress: 100,
      color: "text-green-600"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "payment",
      description: "Payment received for December",
      amount: "₹3,000",
      status: "completed",
      date: "2024-12-01",
      icon: <CheckCircle className="h-4 w-4 text-green-600" />
    },
    {
      id: 2,
      type: "usage",
      description: "High data usage alert",
      amount: "847 GB",
      status: "warning",
      date: "2024-11-28",
      icon: <AlertCircle className="h-4 w-4 text-yellow-600" />
    },
    {
      id: 3,
      type: "speed",
      description: "Speed test completed",
      amount: "95 Mbps",
      status: "completed",
      date: "2024-11-25",
      icon: <Activity className="h-4 w-4 text-blue-600" />
    },
    {
      id: 4,
      type: "plan",
      description: "Plan upgrade requested",
      amount: "Premium",
      status: "pending",
      date: "2024-11-20",
      icon: <Clock className="h-4 w-4 text-orange-600" />
    }
  ];

  const quickActions = [
    {
      title: "Speed Test",
      description: "Test your internet speed",
      icon: <Activity className="h-5 w-5" />,
      action: () => toast({ title: "Speed test started", description: "Testing your connection..." })
    },
    {
      title: "Upgrade Plan",
      description: "Get faster speeds",
      icon: <TrendingUp className="h-5 w-5" />,
      action: () => toast({ title: "Plan upgrade", description: "Redirecting to plan selection..." })
    },
    {
      title: "Download Invoice",
      description: "Get your latest bill",
      icon: <Download className="h-5 w-5" />,
      action: () => toast({ title: "Invoice download", description: "Preparing your invoice..." })
    },
    {
      title: "Contact Support",
      description: "Get help from our team",
      icon: <Users className="h-5 w-5" />,
      action: () => toast({ title: "Support", description: "Opening support chat..." })
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-smooth">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{user?.name}</span>
            </Badge>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-elegant border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mb-2">
                  {stat.description}
                </p>
                {stat.progress > 0 && (
                  <Progress value={stat.progress} className="h-2" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                  <CardDescription>
                    Your latest account activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                      {activity.icon}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                      <Badge variant={activity.status === 'completed' ? 'default' : activity.status === 'warning' ? 'destructive' : 'secondary'}>
                        {activity.amount}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription>
                    Common tasks and account management
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button 
                      key={index}
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={action.action}
                    >
                      {action.icon}
                      <div className="ml-3 text-left">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Data Usage</span>
                  </CardTitle>
                  <CardDescription>
                    Your monthly data consumption
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Used this month</span>
                      <span className="font-medium">847 GB / 1.2 TB</span>
                    </div>
                    <Progress value={70} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 GB</span>
                      <span>1.2 TB</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">95</div>
                      <div className="text-xs text-blue-600">Mbps Avg</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">99.9%</div>
                      <div className="text-xs text-green-600">Uptime</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Speed History</span>
                  </CardTitle>
                  <CardDescription>
                    Your connection performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">Last Speed Test</div>
                        <div className="text-sm text-muted-foreground">Nov 25, 2024</div>
                      </div>
                      <Badge variant="default">95 Mbps</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">Peak Speed</div>
                        <div className="text-sm text-muted-foreground">This month</div>
                      </div>
                      <Badge variant="secondary">98 Mbps</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">Average Speed</div>
                        <div className="text-sm text-muted-foreground">Last 30 days</div>
                      </div>
                      <Badge variant="outline">92 Mbps</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Current Plan</span>
                  </CardTitle>
                  <CardDescription>
                    Your active subscription details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">Fibernet Pro</h3>
                        <p className="text-sm text-muted-foreground">Premium Plan</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Speed:</span>
                        <span className="font-medium">100 Mbps</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Limit:</span>
                        <span className="font-medium">1 TB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Cost:</span>
                        <span className="font-medium">₹3,000</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Billing History</span>
                  </CardTitle>
                  <CardDescription>
                    Your recent payments and invoices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">December 2024</div>
                      <div className="text-sm text-muted-foreground">Paid on Dec 1</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹3,000</div>
                      <Badge variant="default" className="text-xs">Paid</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">November 2024</div>
                      <div className="text-sm text-muted-foreground">Paid on Nov 1</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹3,000</div>
                      <Badge variant="default" className="text-xs">Paid</Badge>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download All Invoices
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Account Information</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Email</span>
                      <span className="text-sm text-muted-foreground">{user?.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Name</span>
                      <span className="text-sm text-muted-foreground">{user?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Member Since</span>
                      <span className="text-sm text-muted-foreground">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Status</span>
                      <Badge variant={user?.isActive ? 'default' : 'destructive'}>
                        {user?.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security & Privacy</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      Notification Settings
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Privacy Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
