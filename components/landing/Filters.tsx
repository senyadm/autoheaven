"use client";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '@/app/GlobalRedux/slice';
import { RootState } from '@/app/GlobalRedux/store';
import { AppDispatch } from '@/app/GlobalRedux/store';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
function FilterComponent() {
    const carMakes = useSelector((state: RootState) => state.carMakes.carMakes);
    const status = useSelector((state: RootState) => state.carMakes.status);

    const dispatch: AppDispatch = useDispatch();

    const handleFetch = () => {
        dispatch(fetchData());
    }

    return (
        <div className="min-w-[1140px] w-full">
            <Card>
                <CardHeader>
                    <CardContent>
                        <Tabs defaultValue="cars" >
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="cars">Passenger Car</TabsTrigger>
                                <TabsTrigger value="moto">Motorcycles</TabsTrigger>
                                <TabsTrigger value="trucks">Trucks</TabsTrigger>
                                <TabsTrigger value="busses">Busses</TabsTrigger>
                            </TabsList>
                            <TabsContent value="cars" >
                                <Card className="border-0 ">
                                    <CardHeader>
                                        <CardTitle>Category</CardTitle>
                                        <CardDescription>
                                            Make changes to your account here. Click save when you're done.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" defaultValue="Pedro Duarte" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="username">Username</Label>
                                            <Input id="username" defaultValue="@peduarte" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save changes</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="moto">
                                <Card className="border-0 ">
                                    <CardHeader>
                                        <CardTitle>Motorcycles</CardTitle>
                                        <CardDescription>
                                            Change your password here. After saving, you'll be logged out.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="current">Current password</Label>
                                            <Input id="current" type="password" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="new">New password</Label>
                                            <Input id="new" type="password" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save password</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="trucks">
                                <Card className="border-0 ">
                                    <CardHeader>
                                        <CardTitle>Trucks</CardTitle>
                                        <CardDescription>
                                            Change your password here. After saving, you'll be logged out.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="current">Current password</Label>
                                            <Input id="current" type="password" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="new">New password</Label>
                                            <Input id="new" type="password" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save password</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="busses">
                                <Card className="border-0 ">
                                    <CardHeader>
                                        <CardTitle>Busses</CardTitle>
                                        <CardDescription>
                                            Change your password here. After saving, you'll be logged out.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="current">Current password</Label>
                                            <Input id="current" type="password" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="new">New password</Label>
                                            <Input id="new" type="password" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save password</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}

export default FilterComponent;


