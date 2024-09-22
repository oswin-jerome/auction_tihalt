import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import UserLayout from "@/Layouts/UserLayout";
import { Bid } from "@/types";
import { Link } from "@inertiajs/react";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";

const ListBids = ({ bids }: { bids: Bid[] }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-blue-500";
            case "outbid":
                return "bg-yellow-500";
            case "won":
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };
    return (
        <UserLayout>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            <Button variant="ghost">
                                Amount
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>Auction</TableHead>
                        <TableHead>
                            <Button variant="ghost">
                                Date
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bids.map((bid) => (
                        <TableRow key={bid.id}>
                            <TableCell className="font-medium">
                                {bid.amount}
                            </TableCell>
                            <TableCell>
                                <Link
                                    href={route(
                                        "user.auctions.show",
                                        bid.auction_id
                                    )}
                                    className="text-blue-500 hover:underline"
                                >
                                    {bid.auction.product_name}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {moment(bid.created_at).format("D MMM Y")}
                            </TableCell>
                            <TableCell>
                                <Badge className={getStatusColor(bid.status)}>
                                    {bid.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </UserLayout>
    );
};

export default ListBids;
