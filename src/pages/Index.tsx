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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Subscription Management System
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
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