"use client";

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
import { PlusCircle, Github, BarChart, Badge, Globe, BadgeInfo, ExternalLink } from "lucide-react";

export function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [hostname, setHostName] = useState("");
  const [liveProjects, setLiveProjects] = useState([]);

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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Input
                            id="github-url"
                            placeholder="a name for your host"
                            className="col-span-3"
                            value={hostname}
                            onChange={(e) => setHostName(e.target.value)}
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
                      <p className="text-2x1 font-bold">1,234</p>
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
                        <p className="text-2x1 font-bold">0</p>
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
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-1">
                  {" "}
                  <p className=" bg-slate-300 text-lg py-2 px-4">Coming Soon</p>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Live Projects</h2>
                {liveProjects.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {liveProjects.map((project) => (
                      <Card key={project.id}>
                        <CardHeader>
                          <CardTitle>{project.name}</CardTitle>
                          <CardDescription>{project.url}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <Badge
                              variant={
                                project.status === "online"
                                  ? "success"
                                  : "secondary"
                              }
                            >
                              {project.status === "online"
                                ? "Online"
                                : "Building"}
                            </Badge>
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Visit Site
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-32">
                      <p className="text-muted-foreground">
                        No live projects yet. Host your first application to get
                        started!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
              {/* You can add more cards here for other dashboard features */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
