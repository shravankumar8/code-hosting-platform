import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Github,
  BarChart,
  Globe,
  Lock,
  Settings,
  ExternalLink,
} from "lucide-react";

// Sample data for live projects
const liveProjects = [
  {
    id: 1,
    name: "My React App",
    url: "https://my-react-app.vercel.app",
    status: "online",
  },
  {
    id: 2,
    name: "Portfolio Site",
    url: "https://portfolio.vercel.app",
    status: "online",
  },
  {
    id: 3,
    name: "E-commerce Demo",
    url: "https://ecommerce-demo.vercel.app",
    status: "building",
  },
];

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");

  const handleHost = () => {
    console.log("Hosting application from:", githubUrl);
    // Here you would typically handle the hosting logic
    setIsOpen(false);
    setGithubUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Host a React Application</CardTitle>
                  <CardDescription>
                    Deploy your React app from GitHub
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Host a React Application</DialogTitle>
                        <DialogDescription>
                          Enter the GitHub URL of your React project to deploy.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Github className="h-4 w-4 justify-self-end" />
                          <Input
                            id="github-url"
                            placeholder="https://github.com/username/repo"
                            className="col-span-3"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button onClick={handleHost} disabled={!githubUrl}>
                        Host Application
                      </Button>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    View your site's performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">1,234</p>
                      <p className="text-sm text-muted-foreground">
                        Total Visits
                      </p>
                    </div>
                    <BarChart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Details
                  </Button>
                </CardContent>
              </Card>

              <div className="relative">
                <Card className="filter blur-[2px]">
                  <CardHeader>
                    <CardTitle>Custom Domains</CardTitle>
                    <CardDescription>Connect your own domain</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">0</p>
                        <p className="text-sm text-muted-foreground">
                          Connected Domains
                        </p>
                      </div>
                      <Globe className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Add Domain
                    </Button>
                  </CardContent>
                </Card>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <Badge variant="secondary" className="text-lg py-2 px-4">
                    Coming Soon
                  </Badge>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your project's security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">Enabled</p>
                      <p className="text-sm text-muted-foreground">SSL/TLS</p>
                    </div>
                    <Lock className="h-8 w-8 text-green-500" />
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Security Settings
                  </Button>
                </CardContent>
              </Card>

              <div className="relative">
                <Card className="filter blur-[2px]">
                  <CardHeader>
                    <CardTitle>Team Collaboration</CardTitle>
                    <CardDescription>
                      Invite team members to your project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">1</p>
                        <p className="text-sm text-muted-foreground">
                          Team Members
                        </p>
                      </div>
                      <Settings className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Manage Team
                    </Button>
                  </CardContent>
                </Card>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <Badge variant="secondary" className="text-lg py-2 px-4">
                    Coming Soon
                  </Badge>
                </div>
              </div>
            </div>

            {/* Live Projects Section */}
          
          </div>
        </div>
      </main>
    </div>
  );
}
