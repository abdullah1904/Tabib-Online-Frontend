"use client";

import { useState } from "react";
import {
  Ban,
  EllipsisVertical,
  Eye,
  Info,
  OctagonPause,
  ShieldCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  activateUser,
  banUser,
  listUsers,
  suspendUser,
} from "@/services/users.service";
import { getAccountStatusText, getAvatarFallbackText } from "@/utils";
import { Spinner } from "../ui/spinner";
import { Badge } from "../ui/badge";
import { AccountStatus } from "@/utils/constants";
import { useDebounce } from "use-debounce";

const UsersTable = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [value] = useDebounce(searchTerm, 1000);

  const {
    data: usersData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", value],
    queryFn: () => listUsers(value),
  });

  const { mutate: activateMutate, isPending: isActivating } = useMutation({
    mutationFn: activateUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User activated successfully");
    },
    onError(error) {
      toast.error(error.message || "Failed to activate user");
    },
    onSettled() {
      setSelectedUserId(null);
    },
  });

  const { mutate: suspendMutate, isPending: isSuspending } = useMutation({
    mutationFn: suspendUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User suspended successfully");
    },
    onError(error) {
      toast.error(error.message || "Failed to suspend user");
    },
    onSettled() {
      setSelectedUserId(null);
    },
  });

  const { mutate: banMutate, isPending: isBanning } = useMutation({
    mutationFn: banUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User banned successfully");
    },
    onError(error) {
      toast.error(error.message || "Failed to ban user");
    },
    onSettled() {
      setSelectedUserId(null);
    },
  });

  const handleView = (userId: number): void => {
    router.push(`/users/${userId}`);
  };

  const handleActivate = (userId: number): void => {
    setSelectedUserId(userId);
    activateMutate(userId);
  };

  const handleSuspend = (userId: number): void => {
    setSelectedUserId(userId);
    suspendMutate(userId);
  };

  const handleBan = (userId: number): void => {
    setSelectedUserId(userId);
    banMutate(userId);
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="flex justify-between pb-3">
        <h2 className="text-2xl font-semibold">Users</h2>
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-3xs sm:w-2xs md:w-xs lg:w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Phone</TableHead>
            <TableHead className="hidden lg:table-cell">Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-gray-500 py-6"
              >
                <div className="flex items-center justify-center gap-2">
                  <Spinner className="size-6" /> Loading users...
                </div>
              </TableCell>
            </TableRow>
          ) : usersData.length > 0 ? (
            usersData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.imageURL ?? ""} alt={user.fullName} />
                      <AvatarFallback className="rounded-lg">
                        {getAvatarFallbackText(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    {user.fullName}
                    <Tooltip>
                      <TooltipTrigger className="sm:hidden">
                        <Info className="size-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phoneNumber}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  {user.email}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {user.phoneNumber}
                </TableCell>

                <TableCell className="hidden lg:table-cell">
                  <Badge
                    variant={
                      user.status === AccountStatus.BANNED
                        ? "destructive"
                        : "default"
                    }
                  >
                    {getAccountStatusText(user.status)}
                  </Badge>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleView(user.id)}
                        className="cursor-pointer"
                      >
                        <Eye /> View
                      </DropdownMenuItem>

                      {user.status === AccountStatus.SUSPENDED && (
                        <DropdownMenuItem
                          onClick={() => handleActivate(user.id)}
                          className="cursor-pointer"
                          disabled={isActivating && selectedUserId === user.id}
                        >
                          <ShieldCheck /> Activate
                        </DropdownMenuItem>
                      )}

                      {user.status === AccountStatus.ACTIVE && (
                        <>
                          <DropdownMenuItem
                            onClick={() => handleSuspend(user.id)}
                            className="cursor-pointer"
                            disabled={isSuspending && selectedUserId === user.id}
                          >
                            <OctagonPause /> Suspend
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleBan(user.id)}
                            className="cursor-pointer"
                            disabled={isBanning && selectedUserId === user.id}
                          >
                            <Ban /> Ban
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-gray-500 py-6"
              >
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;