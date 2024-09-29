"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PlusCircle,
  Github,
  BarChart,
  Badge,
  Globe,
  BadgeInfo,
  ExternalLink,
} from "lucide-react";

import { AlertCircle, LogIn, UserPlus } from "lucide-react";
import axios from "axios";

export function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [hostname, setHostName] = useState("");
  const [liveProjects, setLiveProjects] = useState<any>([]);
  const [token, setToken] = useState<any>([]);
  const [isUserLoggedin, setIsUserLoggedin] = useState<any>([]);
  
async function fetchUser(token1:any) {
  try {
    const response = await fetch("http://localhost:9000/userme", {
      headers: { Authorization: `Bearer ${token1}` },
    });

    if (response.status === 200) {
      // If the request was successful, set token to true
      setIsUserLoggedin(true);
    } else {
      // If the request fails, set token to false
      setIsUserLoggedin(false);
    }
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.log("Token error occurred:", error);
  }
}
const handleHost = async () => {
  try {
    console.log("Hosting application from:", githubUrl);

    const response = await fetch("http://localhost:9000/project", {
      method: "POST", // Use POST method to send data
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Specify content type
      },
      body: JSON.stringify({
        gitUrl: githubUrl,
        projectslug:hostname, // Include the githubUrl in the body
      }),
    });

    // Check for a successful response
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Response data:", data);
  } catch (error:any) {
    console.error("Failed to host application:", error.message);
  }
};

    useEffect(() => {
      const token1 = localStorage.getItem("token");
      fetchUser(token1);
      setToken(token1)
      
    }, []);
 
  if (!isUserLoggedin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              User Not Logged In
            </CardTitle>
            <CardDescription className="text-center">
              Please log in to access this content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600 dark:text-gray-400">
              You need to be logged in to view this page. If you don't have an
              account, you can sign up for free.
            </p>
            <div className="flex flex-col space-y-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign in
                </Button>
              </Link>

              <Link to="/signup">
                <Button variant="outline" className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Button>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              to="/"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Return to Home Page
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  } else {
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
                            Enter the GitHub URL of your React project to
                            deploy.
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
                    <p className=" bg-slate-300 text-lg py-2 px-4">
                      Coming Soon
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-4">Live Projects</h2>
                  {liveProjects.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {liveProjects.map((project: any) => (
                        <Card key={project.id}>
                          <CardHeader>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>{project.url}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <Badge
                                className={
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
                          No live projects yet. Host your first application to
                          get started!
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
}
