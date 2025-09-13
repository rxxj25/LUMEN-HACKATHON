import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlanManagement } from "@/components/subscription/PlanManagement";
import { Analytics } from "@/components/subscription/Analytics";

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string;
  validityDays: number;
  description?: string;
  createdAt: Date;
}

const Index = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  useEffect(() => {
    const savedPlans = localStorage.getItem('subscription-plans');
    if (savedPlans) {
      const parsedPlans = JSON.parse(savedPlans).map((plan: any) => ({
        ...plan,
        createdAt: new Date(plan.createdAt)
      }));
      setPlans(parsedPlans);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('subscription-plans', JSON.stringify(plans));
  }, [plans]);

  const addPlan = (plan: Omit<SubscriptionPlan, 'id' | 'createdAt'>) => {
    const newPlan: SubscriptionPlan = {
      ...plan,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    setPlans(prev => [...prev, newPlan]);
  };

  const updatePlan = (id: string, updates: Partial<SubscriptionPlan>) => {
    setPlans(prev => prev.map(plan => 
      plan.id === id ? { ...plan, ...updates } : plan
    ));
  };

  const deletePlan = (id: string) => {
    setPlans(prev => prev.filter(plan => plan.id !== id));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Curved background pattern inspired by the design */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-20">
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="white" />
              </linearGradient>
            </defs>
            {[...Array(25)].map((_, i) => (
              <path
                key={i}
                d={`M ${200 + i * 20} 0 Q ${400 + i * 15} ${150 + i * 25} ${800 + i * 10} ${300 + i * 20}`}
                stroke="url(#curveGradient)"
                strokeWidth="2"
                fill="none"
              />
            ))}
            {[...Array(25)].map((_, i) => (
              <path
                key={`dots-${i}`}
                d={`M ${250 + i * 25} ${100 + i * 30} Q ${450 + i * 20} ${200 + i * 35} ${750 + i * 15} ${350 + i * 25}`}
                stroke="url(#curveGradient)"
                strokeWidth="1"
                strokeDasharray="3,5"
                fill="none"
              />
            ))}
          </svg>
        </div>
      </div>
      <div className="container mx-auto p-6 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Subscription Management System
          </h1>
          <p className="text-white/90 mt-2 text-lg drop-shadow">
            Professional dashboard for managing subscription plans and tracking business analytics
          </p>
        </div>

        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="plans" className="text-sm font-medium">
              Manage Plans
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm font-medium">
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans" className="space-y-6">
            <PlanManagement
              plans={plans}
              onAddPlan={addPlan}
              onUpdatePlan={updatePlan}
              onDeletePlan={deletePlan}
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Analytics plans={plans} />
          </TabsContent>
        </Tabs>
    </div>
    </div>
  );
};

export default Index;