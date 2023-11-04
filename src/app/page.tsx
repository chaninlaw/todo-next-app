import LandingPageMenu from "@/components/LandingPageMenu"
import { Button } from "@/components/ui/button"
import { Canvas } from "@/components/ui/canvas"
import { Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  return (
    <>
      <div>
        <LandingPageMenu />
        <section
          id="hero"
          className="w-full p-2 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-1 md:p-8"
        >
          <h1 className="font-bold text-[2.7rem] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-black md:text-5xl xl:text-8xl">
            Ultimate Task Management Solution!
          </h1>
          <Image
            className="hidden h-full md:block md:row-span-2 object-cover object-left"
            src="/hero/hero-page-rm-bg.png"
            alt="hero"
            height={2000}
            width={1333}
          />
          <div className="w-full">
            <p className="font-medium text-sm mb-4 md:text-md xl:text-lg">
              Do you often find yourself juggling multiple tasks, Todo app is
              way to transform the way you manage your tasks, boost your
              productivity, and bring a sense of organization and clarity to
              your life.
            </p>
            <Link href="/todos">
              <Button className="md:w-60 xl:mt-4">Get start</Button>
            </Link>
          </div>
        </section>
        <div className="md:grid md:grid-cols-3">
          <section
            id="streamline"
            className="py-12 px-4 text-center flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl font-bold mb-4">Streamline Your Tasks</h2>
            <p>Effortlessly organize, prioritize, and categorize tasks.</p>
          </section>

          <section
            id="stay-organized"
            className="py-12 px-4 bg-zinc-100 text-center flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              Stay Organized Anytime, Anywhere
            </h2>
            <p>Access your tasks on the go, synced across all devices.</p>
          </section>

          <section
            id="smart-features"
            className="py-12 px-4 text-center flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              Smart Features for Ultimate Productivity
            </h2>
            <p>
              Set reminders, due dates, recurring tasks, and collaboration
              options.
            </p>
          </section>

          <section
            id="privacy-security"
            className="py-12 px-4 bg-zinc-100 text-center flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl font-bold mb-4 ">
              Your Privacy and Security Matter
            </h2>
            <p>Cutting-edge security to safeguard your task data.</p>
          </section>

          <section
            id="join-today"
            className="py-12 px-4 text-center flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl font-bold mb-4">Join Today</h2>
            <p>Transform the way you manage tasks effortlessly.</p>
          </section>

          <section
            id="get-started"
            className="bg-zinc-900 text-white text-center py-8 flex flex-col justify-center items-center"
          >
            <h3 className="text-2xl font-bold">Get Started for Free</h3>
            <p>Start your journey to a more organized life!</p>
            <Link href="/register">
              <Button variant="secondary">Sign Up Now</Button>
            </Link>
          </section>
        </div>
        <footer className="text-xs bg-zinc-900 text-white text-center flex justify-between px-8 py-4 border-t border-zinc-600">
          <ul>
            <li>
              <Link href="https://github.com/chaninlaw">
                <Github className="mr-2 h-4 w-4 outline outline-1 outline-offset-4 outline-zinc-400 rounded-md" />
              </Link>
            </li>
          </ul>
          <p className="text-zinc-400">Todo App. All right reserved. © 2023</p>
        </footer>
      </div>
      <Canvas />
    </>
  )
}
