import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import UserLayout from "@/Layouts/UserLayout";
import { Auction, PageProps } from "@/types";
import { Search } from "lucide-react";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    auctions,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    auctions: Auction[];
}>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <UserLayout>
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-primary-foreground">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center text-white">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Discover Unique Items, Bid with Excitement
                            </h1>
                            <p className="mx-auto max-w-[700px] text-lg sm:text-xl">
                                Join our thriving auction community and find
                                rare treasures or sell your valuable items to
                                enthusiastic bidders.
                            </p>
                        </div>
                        <div className="w-full max-w-sm space-y-2">
                            <form className="flex space-x-2">
                                <Input
                                    className="flex-1 bg-white text-black"
                                    placeholder="Search for items..."
                                    type="text"
                                />
                                <Button
                                    type="submit"
                                    className="bg-white text-primary hover:bg-gray-100"
                                >
                                    <Search className="h-4 w-4 mr-2" />
                                    Search
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-12">
                <h1 className="text-2xl font-bold text-center">Winners</h1>
                <div className="mt-8 p-4 grid grid-cols-3 gap-4">
                    {auctions.map((auction) => {
                        return (
                            <Card key={auction.id}>
                                <CardHeader>
                                    <CardTitle>
                                        {auction.product_name}
                                    </CardTitle>
                                    <CardDescription>
                                        {auction.product_description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <h3 className="font-bold text-xl">
                                        Winner
                                    </h3>
                                    <p>{auction.winner.name}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>
        </UserLayout>
    );
}
