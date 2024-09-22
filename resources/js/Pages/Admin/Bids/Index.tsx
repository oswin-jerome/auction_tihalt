import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Bid } from "@/types";
import { Link } from "@inertiajs/react";
import moment from "moment";

const IndexPage = ({ bids }: { bids: Bid[] }) => {
    return (
        <Authenticated>
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <div>
                            <CardTitle>Bids</CardTitle>
                            <CardDescription>
                                List of all bids made
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Auction</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bids?.map((bid) => {
                                return (
                                    <TableRow key={bid.id}>
                                        <TableCell>{bid.id}</TableCell>
                                        <TableCell>
                                            {bid.auction.product_name}
                                        </TableCell>

                                        <TableCell>{bid.amount}</TableCell>
                                        <TableCell>
                                            {moment(bid.created_at).format(
                                                "D MMM Y"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={route(
                                                    "admin.auction.show",
                                                    bid.id
                                                )}
                                            >
                                                View
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Authenticated>
    );
};

export default IndexPage;
