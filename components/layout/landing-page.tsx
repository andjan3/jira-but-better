"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full overflow-hidden">
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
          src="https://res.cloudinary.com/dohf6gfqy/video/upload/v1747304826/4065218-uhd_4096_2160_25fps_qpo7xa.mp4"
          type="video/mp4"
        />
        Din webbläsare stödjer inte videouppspelning.
      </video>

      <div className="lg:hidden absolute top-0 left-0 w-full h-full z-0">
        <Image
          src="https://res.cloudinary.com/dohf6gfqy/image/upload/v1747310377/bg_nhdihd.png"
          alt="Hero-image with one woman working on her computer"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-20 h-screen w-full flex flex-col justify-center items-center gap-5 px-4 text-center">
        <h1 className="text-[30px] lg:text-[60px] uppercase text-white drop-shadow-lg">
          Jira but better
        </h1>
        <div className="w-[90%] lg:w-[30%] italic text-white drop-shadow-lg">
          A collaborative task management with intuitive drag-and-drop. Perfect
          for teams who want clarity without complexity
        </div>
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-[#1868Db] hover:bg-[#3b79d0] mt-3 text-white px-8 py-3 rounded-lg  font-medium"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
