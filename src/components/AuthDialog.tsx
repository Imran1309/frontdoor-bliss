import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthenticated: () => void;
}

interface User {
  email: string;
  phone: string;
  password: string;
}

const AuthDialog = ({ open, onOpenChange, onAuthenticated }: AuthDialogProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();

  // Simple local storage for demo purposes
  const getUsers = (): User[] => {
    const users = localStorage.getItem("memoryUsers");
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem("memoryUsers", JSON.stringify(users));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !phone || !password) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    const users = getUsers();

    if (isLogin) {
      // Login logic
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        onAuthenticated();
        onOpenChange(false);
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } else {
      // Signup logic
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        toast({
          title: "User already exists",
          description: "An account with this email already exists",
          variant: "destructive",
        });
      } else {
        const newUser: User = { email, phone, password };
        users.push(newUser);
        saveUsers(users);
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        toast({
          title: "Account created",
          description: "You can now add memories!",
        });
        onAuthenticated();
        onOpenChange(false);
      }
    }

  
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    onOpenChange(false);
  };

  const currentUser = localStorage.getItem("currentUser");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentUser ? "Account" : isLogin ? "Login to Add Memories" : "Create Account"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {currentUser ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                You are logged in as: {JSON.parse(currentUser).email}
              </p>
              <Button onClick={handleLogout} variant="outline" className="w-full">
                Logout
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Create Account"}
              </Button>
              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
