import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CheckCircle, Code, Globe, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="ml-10 flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6" />
          <span className="sr-only">BetaHost</span>
        </a>
        <nav className="ml-auto justify-center items-center flex gap-4 sm:gap-6">
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#how-it-works"
          >
            How It Works
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </a>

          
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="signup"
          >
          <Button>login/signup</Button>
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Deploy Your React Apps in Seconds
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  ReactHost is the fastest way to deploy your React
                  applications. Push your code and we'll handle the rest.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Globe className="w-8 h-8 mb-2" />
                  <CardTitle>Global CDN</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Deploy your apps to a global edge network for blazing-fast
                    performance.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Code className="w-8 h-8 mb-2" />
                  <CardTitle>Git Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Automatically deploy your apps with every push to your Git
                    repository.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 mb-2" />
                  <CardTitle>Instant Rollbacks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Quickly revert to any previous deployment with a single
                    click.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 list-none">
              <li className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Connect Your Repo</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Link your GitHub, GitLab, or Bitbucket repository to
                  ReactHost.
                </p>
              </li>
              <li className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Push Your Code</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Commit and push your React application code to your
                  repository.
                </p>
              </li>
              <li className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">We Deploy</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  ReactHost automatically builds and deploys your app to our
                  global CDN.
                </p>
              </li>
            </ol>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Simple Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Hobby</CardTitle>
                  <CardDescription>For personal projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$0</p>
                  <p className="text-gray-500 dark:text-gray-400">per month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" /> 1
                      concurrent build
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />{" "}
                      100 GB bandwidth
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />{" "}
                      Community support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$19</p>
                  <p className="text-gray-500 dark:text-gray-400">per month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" /> 5
                      concurrent builds
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" /> 1
                      TB bandwidth
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />{" "}
                      Priority support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">Custom</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Contact us for pricing
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />{" "}
                      Unlimited concurrent builds
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />{" "}
                      Custom bandwidth limits
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />{" "}
                      24/7 dedicated support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Deploy?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Get started with ReactHost today and take your React
                  applications to the next level.
                </p>
              </div>
              <Button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 ReactHost. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}
