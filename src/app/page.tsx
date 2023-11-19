import LandingPageMenu from "@/components/landing/landingpage-menu"
import { Canvas } from "@/components/landing/canvas"
import { Separator } from "@/components/ui/separator"
import { Github } from "lucide-react"
import Link from "next/link"
import { Button } from "@nextui-org/react"
import Particles from "@/components/landing/particle"

export default async function Home() {
  return (
    <>
      <div className="relative z-[2]">
        <LandingPageMenu />
        <section
          id="hero"
          className="container mx-auto mt-20 mb-10 flex flex-col justify-center items-center sm:my-24 md:my-32 lg:my-28"
        >
          <Particles
            className="absolute inset-0 -z-10 animate-fade-in"
            quantity={500}
          />
          <h1
            className="w-3/4
           font-bold min-[270px]:text-[2.2rem] min-[370px]:text-[2.4rem] min-[420px]:text-[2.7rem] xs:text-[2.7rem] mb-4 bg-clip-text text-center  text-transparent bg-gradient-to-r from-primary via-foreground-500 to-primary md:text-5xl xl:text-8xl"
          >
            Embark on a Journey of Seamless Innovation
          </h1>

          <div className="w-full md:w-1/2 flex flex-col mt-14 justify-center items-center">
            <p className="font-medium text-primary md:text-background text-sm text-center mb-4 md:mt-0 md:text-md xl:text-lg xl:text-white xl:mt-20 2xl:mt-0 2xl:text-background">
              &quot;Step into a world where innovation is your companion and
              simplicity is your guide. Our solutions redefine the way you
              navigate the digital landscape, making every step of your journey
              an experience worth embracing.&quot;
            </p>
            <Link href="/todo">
              <Button color="primary" className="md:w-60 xl:mt-4">
                Get start now
              </Button>
            </Link>
          </div>
        </section>
        <Separator />
        <div className="md:grid md:grid-cols-3">
          <section id="efficiency" className="py-12 px-4 text-primary">
            <h2 className="text-2xl font-bold mb-4">
              Effortless Efficiency at Your Fingertips
            </h2>
            <p>
              &quot;Experience the magic of streamlined efficiency with our
              intuitive features. From task management to seamless
              collaboration, each element is designed to make your workflow
              effortless and enjoyable.&quot;
            </p>
          </section>

          <section id="simply" className="py-12 px-4 text-primary">
            <h2 className="text-2xl font-bold mb-4">
              Precision Crafted, Simply Powerful.
            </h2>
            <p>
              &quot;Discover a suite of tools that marries precision with
              simplicity. Every feature is a masterpiece, enhancing your
              experience with &quot;
            </p>
          </section>

          <section id="redefined" className="py-12 px-4 text-primary">
            <h2 className="text-2xl font-bold mb-4 ">
              Elevate Your Possibilities: Features Redefined.
            </h2>
            <p>
              &quot;Your digital experience reaches new heights with features
              crafted for excellence. Explore a world where every tool is a
              testament to innovation, ensuring your possibilities are not just
              met but exceeded.&quot;
            </p>
          </section>
        </div>
        <Separator />
        <footer className="text-xs bg-accent text-secondary text-center flex justify-between px-8 py-4 border-t border-zinc-600">
          <ul>
            <li>
              <Link href="https://github.com/chaninlaw">
                <Github className="mr-2 h-4 w-4 text-primary outline outline-1 outline-offset-4 outline-zinc-400 rounded-md" />
              </Link>
            </li>
          </ul>
          <p className="text-zinc-400">Todo App. All right reserved. © 2023</p>
        </footer>
      </div>
      <Canvas className="absolute z-[1]" />
    </>
  )
}
