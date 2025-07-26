import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
    {'href': '/', 'label': 'Home' },
    {'href': '/journal', 'label': 'Journal' },
    {'href': '/history', 'label': 'History' },
]

const DashboardLayout = ({ children }: any) => {
    return <div className="h-screen w-screen relative">
        <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
            <h2 className="font-bold text-lg p-4">Tones</h2>
            <ul>
                {links.map((link) => (
                    <Link key={link.label} href={link.href} className="p-4 hover:bg-gray-100 cursor-pointer flex flex-col">
                        {link.label}
                    </Link>
                ))}
            </ul>
        </aside>
        <div className="ml-[200px] h-full">
            <header className="h-[60px] border-b border-black/10">
                <div className="h-full w-full px-6 flex items-center justify-end">
                    <UserButton />
                </div>
            </header>
            <div>{ children }</div>
        </div>

    </div>
}

export default DashboardLayout;