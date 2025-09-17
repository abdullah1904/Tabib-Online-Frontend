"use client";
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label";
import { PasswordInput } from "./ui/password-input";


const Profile = () => {
    return (
        <div className="py-2">
            <div className='flex justify-between pb-3'>
                <h2 className='text-2xl'>Profile</h2>
            </div>
            <Card className="mb-4">
                <CardHeader>
                    <h2 className="text-xl font-semibold">Profile Details</h2>
                </CardHeader>
                <CardContent className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                        <Label>Profile Picture</Label>
                        <Input type="file"/>
                    </div>
                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input placeholder="Full Name" />
                    </div>
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input placeholder="Email" disabled={true} />
                    </div>
                    <div className="space-y-2">
                        <Label>Recovery Email</Label>
                        <Input placeholder="Recovery Email" />
                    </div>
                    <div className="space-y-2">
                        <Label>Privilege</Label>
                        <Input placeholder="Privilege" disabled={true} />
                    </div>
                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input placeholder="Phone Number" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
                        <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Password Security</h2>
                </CardHeader>
                <CardContent className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="col-span-1 md:col-span-2">   
                    </div>
                    <div className="space-y-2">
                        <Label>Current Password</Label>
                        <PasswordInput placeholder="Current Password" />
                    </div>
                    <div className="space-y-2">
                        <Label>New Password</Label>
                        <PasswordInput placeholder="New Password" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Change Password</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Profile