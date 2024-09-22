import { Link, usePage } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";
import { PropsWithChildren } from "react";

export default function UserLayout({ children }: PropsWithChildren) {
    const user = usePage().props.auth.user;

    return (
        <div className="">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="#">
                    <PlusCircle className="h-6 w-6 text-orange-700" />
                    <span className="sr-only">FormCraft</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4 text-orange-900"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4 text-orange-900"
                        href="/auctions"
                    >
                        Auctions
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4 text-orange-900"
                        href={route("user.bids.index")}
                    >
                        My Bids
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4 text-orange-900"
                        href={route("user.winnings")}
                    >
                        Winnings
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4 text-orange-900"
                        href={route("user.participated")}
                    >
                        Participated
                    </Link>
                    {user && (
                        <Link
                            href={route("logout")}
                            className="text-sm font-medium hover:underline underline-offset-4 text-orange-900"
                            method="post"
                        >
                            Logout
                        </Link>
                    )}
                    {!user && (
                        <Link
                            href={route("login")}
                            className="text-sm font-medium hover:underline underline-offset-4 text-orange-900"
                        >
                            Login
                        </Link>
                    )}
                </nav>
            </header>
            <main className="flex-1 px-4 lg:px-6">{children}</main>
        </div>
    );
}
