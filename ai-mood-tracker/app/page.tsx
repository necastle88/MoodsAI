import { auth } from "@clerk/nextjs";
import Link from "next/link";


export default async function Home() {
  const { userId } = await auth();

  let href = userId ? '/journal' : '/new-user'


  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">The Best Journal app, ever</h1>
        <p className="text-2xl text-white/60 mb-4">This is the bet app for tracking you mood</p>
        <div>
          <Link href={ href }>
          <button className="bg-purple-600 px-4 py-2 rounded-lg text-xl">
            get Started
          </button>
          </Link>
        </div>
      </div>
    </div>
  )
}