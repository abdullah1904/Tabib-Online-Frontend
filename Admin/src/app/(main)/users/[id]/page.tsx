import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import UserInfo from "@/components/users/UserInfo"
import React from 'react'

type Props = {
    params: Promise<{ id: string }>
}

const UserPage = async ({ params }: Props) => {
    const { id } = await params;
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/">
                            Admin
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/users">
                            Users
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{id}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <UserInfo id={id} />
        </div>
    )
}

export default UserPage