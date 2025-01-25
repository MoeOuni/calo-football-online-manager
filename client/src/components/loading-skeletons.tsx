import { User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function TeamDetailsSkeleton() {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <div>
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-4 w-40 mb-4" />

        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(4)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export function PlayerCardSkeleton() {
  return (
    <div className="bg-muted/45 border rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-4 flex flex-col items-center">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="bg-gray-200 rounded-full p-6 mb-4">
          <User size={48} className="text-gray-400" />
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
}

export function LogListSkeleton({ itemCount = 3 }: { itemCount?: number }) {
  return (
    <ul role="list" className="mt-6 space-y-6 pb-2">
      {[...Array(itemCount)].map((_, index) => (
        <li key={index} className="relative flex gap-x-3">
          <div
            className={cn(
              index === itemCount - 1 ? "h-6" : "-bottom-6",
              "absolute left-0 top-0 flex w-6 justify-center"
            )}
          >
            <span className="w-px bg-border" aria-hidden={true} />
          </div>
          <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-background">
            <div className="h-3 w-3 rounded-full border border-muted-foreground bg-background ring-4 ring-background" />
          </div>
          <div className="flex items-start space-x-2">
            <div className="mt-0.5 space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
