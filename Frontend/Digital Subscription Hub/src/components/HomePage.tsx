import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wifi, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Globe,
  BarChart3,
  LogIn,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DemoCredentials from "./DemoCredentials";
import heroImage from "@/assets/hero-network.jpg";

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const plans = [
    {
      name: "Fibernet Basic",
      price: "1500/-",
      speed: "50 Mbps",
      data: "500 GB",
      features: ["Fiber Optic Connection", "24/7 Support", "Easy Upgrade"],
      popular: false,
    },
    {
      name: "Fibernet Pro",
      price: "3000/-", 
      speed: "100 Mbps",
      data: "1 TB",
      features: ["Ultra-Fast Fiber", "Priority Support", "Free Installation"],
      popular: true,
    },
    {
      name: "Broadband Copper",
      price: "100/-",
      speed: "25 Mbps", 
      data: "300 GB",
      features: ["Reliable Connection", "Standard Support", "Quick Setup"],
      popular: false,
    },
  ];

  const features = [
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "Blazing Fast Speeds",
      description: "Experience lightning-fast internet with our fiber optic technology."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Reliable", 
      description: "Enterprise-grade security with 99.9% uptime guarantee."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Easy Management",
      description: "Manage your subscription with our intuitive dashboard."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b border-border/10 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-foreground">Lumen Connect</h1>
                <p className="text-xs text-muted-foreground">Subscription Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Welcome, {user?.name}</span>
                    {user?.role === 'admin' && (
                      <Badge variant="secondary" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link to="/dashboard">
                      <Button variant="outline">Dashboard</Button>
                    </Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin">
                        <Button variant="hero">Admin Panel</Button>
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="hero">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Star className="h-3 w-3 mr-1" />
                  Trusted by 10,000+ Users
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Manage Your
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> Internet </span>
                  Subscriptions
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Experience seamless subscription management with our advanced platform. 
                  Upgrade, downgrade, or switch plans with just a few clicks.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="text-lg px-8">
                  Browse Plans
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button variant="soft" size="lg" className="text-lg">
                  View Analytics
                  <BarChart3 className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Users</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src={heroImage} 
                  alt="Network infrastructure with fiber optic cables"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Why Choose Lumen Connect?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the modern world, our platform delivers unparalleled performance and reliability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-border/50 shadow-card hover:shadow-elegant transition-smooth">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary-soft rounded-lg flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground">
              Flexible plans designed to grow with your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-glow' : 'shadow-card'} hover:shadow-elegant transition-smooth`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div>
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-semibold">{plan.speed}</div>
                    <div className="text-muted-foreground">{plan.data} monthly data</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={plan.popular ? "hero" : "outline"} 
                    className="w-full"
                    size="lg"
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied customers and experience the future of connectivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="text-lg px-8">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Credentials Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Try It Out Now!
              </h2>
              <p className="text-xl text-muted-foreground">
                No backend required - use these demo credentials to test the full functionality
              </p>
            </div>
            <DemoCredentials />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border/20 bg-muted/30">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 Lumen Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;