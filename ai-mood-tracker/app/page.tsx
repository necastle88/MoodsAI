import { auth } from '@clerk/nextjs';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();

  let href = userId ? '/journal' : '/new-user';

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">Track your tone and get suggestions</h1>
        <p className="text-2xl text-white/60 mb-4">
          Write messages. Detect emotion. Ask questions. View mood trends. A
          simple way to reflect on how you feel over time.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-purple-600 px-4 py-2 rounded-lg text-xl">
              get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
