import { Card, Skeleton } from "@nextui-org/react"

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent"

export function CardSkeleton() {
  return (
    <Card className="space-y-5 p-4" radius="lg">
      <Skeleton className="before:!duration-2000 rounded-lg">
        <div className="h-6 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="before:!duration-2000 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="before:!duration-2000 w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="before:!duration-2000 w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  )
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  )
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md  bg-white p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  )
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  )
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4 lg:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardSkeleton() {
  return (
    <>
      <div className="grid gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </>
  )
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-content last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full before:!duration-2000"></Skeleton>
          <Skeleton className="h-6 w-24 rounded before:!duration-2000"></Skeleton>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-6 w-32 rounded before:!duration-2000"></Skeleton>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-6 w-16 rounded before:!duration-2000"></Skeleton>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-6 w-16 rounded before:!duration-2000"></Skeleton>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-6 w-16 rounded before:!duration-2000"></Skeleton>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <Skeleton className="h-[38px] w-[38px] rounded before:!duration-2000"></Skeleton>
          <Skeleton className="h-[38px] w-[38px] rounded before:!duration-2000"></Skeleton>
        </div>
      </td>
    </tr>
  )
}

export function TodoMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-primary-foreground p-4">
      <div className="flex items-center justify-between border-b border-content pb-8">
        <div className="flex items-center">
          <Skeleton className="mr-2 h-8 w-8 rounded-full before:!duration-2000"></Skeleton>
          <Skeleton className="h-6 w-16 rounded before:!duration-2000"></Skeleton>
        </div>
        <Skeleton className="h-6 w-16 rounded before:!duration-2000"></Skeleton>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <Skeleton className="h-6 w-16 rounded before:!duration-2000"></Skeleton>
          <Skeleton className="mt-2 h-6 w-24 rounded before:!duration-2000"></Skeleton>
        </div>
        <div className="flex justify-end gap-2">
          <Skeleton className="h-10 w-10 rounded before:!duration-2000"></Skeleton>
          <Skeleton className="h-10 w-10 rounded before:!duration-2000"></Skeleton>
        </div>
      </div>
    </div>
  )
}

export function TodosTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-content p-2 md:pt-0">
          <div className="md:hidden">
            <TodoMobileSkeleton />
            <TodoMobileSkeleton />
            <TodoMobileSkeleton />
            <TodoMobileSkeleton />
            <TodoMobileSkeleton />
            <TodoMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-primary md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  TITLE
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  DESCRIPTION
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  TAGS
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  UPDATE AT
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  STATUS
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">ACTIONS</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-content1">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
