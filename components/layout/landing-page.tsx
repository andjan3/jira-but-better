/**
 * LandingPage component.
 * -----------------------------------
 *
 * Renders the landing page.
 *
 */

"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <div className="bg-black opacity-30 w-full absolute top-0 h-full z-10" />
      <video
        className="hidden lg:block lg:absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      >
        <source
          src="https://a.storyblok.com/f/330451/x/614b2f31df/4065218-uhd_4096_2160_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support video playback.
      </video>

      <div className="lg:hidden absolute top-0 left-0 w-full h-full z-0">
        <Image
          src="https://a.storyblok.com/f/330451/668x616/a04a04ba7e/bg.png"
          alt="Hero-image with one woman working on her computer"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <section className="relative z-20 h-screen w-full flex flex-col justify-center items-center gap-5 px-4 text-center">
        <h1 className="text-[30px] lg:text-[60px] uppercase text-white drop-shadow-lg">
          Jira but better
        </h1>
        <p className="w-[90%] md:w-[70%] lg:w-[30%] italic text-white drop-shadow-lg z-20">
          A collaborative task management with intuitive drag-and-drop. Perfect
          for teams who want clarity without complexity
        </p>
        <Link
          href={"/auth/login"}
          className="bg-[#1868Db] hover:bg-[#3b79d0] mt-3 text-white px-8 py-3 rounded-lg  font-medium z-20"
        >
          Log in
        </Link>
      </section>
    </main>
  );
}
