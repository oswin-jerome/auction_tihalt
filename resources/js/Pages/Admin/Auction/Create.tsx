import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const CreatePage = () => {
    const { data, setData, post, processing, errors } = useForm<{
        product_name: string;
        product_description: string;
        starting_price: number;
        joining_fee: number;
        start_time: string;
        end_time: string;
    }>({
        product_name: "",
        product_description: "",
        starting_price: 0,
        joining_fee: 0,
        start_time: "",
        end_time: "",
    });

    function handle(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        post(route("admin.auction.store"), {
            onSuccess: () => {
                alert("Success");
            },
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <form onSubmit={handle}>
                <Card>
                    <CardHeader>
                        <CardTitle>Event Registration Form</CardTitle>
                        <CardDescription>
                            Please fill out the form to register for the
                            upcoming event.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="productName">
                                    Product Name
                                </Label>
                                <Input
                                    id="productName"
                                    placeholder="Enter the product name"
                                    onChange={(e) =>
                                        setData("product_name", e.target.value)
                                    }
                                />
                                <InputError message={errors.product_name} />
                            </div>
                            <div className="space-y-2">
                                <Label>Product Description</Label>
                                <Textarea
                                    onChange={(e) =>
                                        setData(
                                            "product_description",
                                            e.target.value
                                        )
                                    }
                                ></Textarea>
                                <InputError
                                    message={errors.product_description}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startingPrice">
                                    Product Price
                                </Label>
                                <Input
                                    id="startingPrice"
                                    type="number"
                                    onChange={(e) =>
                                        setData(
                                            "starting_price",
                                            e.target.valueAsNumber
                                        )
                                    }
                                />
                                <InputError message={errors.starting_price} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="joiningFee">Joining Fee</Label>
                                <Input
                                    id="joiningFee"
                                    type="number"
                                    onChange={(e) =>
                                        setData(
                                            "joining_fee",
                                            e.target.valueAsNumber
                                        )
                                    }
                                />
                                <InputError message={errors.joining_fee} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startTime">Starting Time</Label>
                                <Input
                                    id="startTime"
                                    type="date"
                                    onChange={(e) =>
                                        setData("start_time", e.target.value)
                                    }
                                />
                                <InputError message={errors.start_time} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endTime">End Time</Label>
                                <Input
                                    id="endTime"
                                    type="date"
                                    onChange={(e) =>
                                        setData("end_time", e.target.value)
                                    }
                                />
                                <InputError message={errors.end_time} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button disabled={processing}>Save</Button>
                    </CardFooter>
                </Card>
            </form>
        </AuthenticatedLayout>
    );
};

export default CreatePage;
