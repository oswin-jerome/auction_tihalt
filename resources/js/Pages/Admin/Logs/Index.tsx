import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { AppLog } from "@/types";
import moment from "moment";

const LogsPage = ({ logs }: { logs: AppLog[] }) => {
    return (
        <Authenticated>
            <Card>
                <CardHeader>
                    <CardTitle>Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map((log) => {
                                return (
                                    <TableRow key={log.id}>
                                        <TableCell>{log.event}</TableCell>
                                        <TableCell>{log.message}</TableCell>
                                        <TableCell>
                                            {moment(log.created_at).format(
                                                "D MMM Y"
                                            )}
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

export default LogsPage;
