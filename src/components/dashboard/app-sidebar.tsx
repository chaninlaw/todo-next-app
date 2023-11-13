import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChartBig,
  Blocks,
  ChevronsLeft,
  ChevronsRight,
  ClipboardList,
  LayoutGrid,
  PieChart,
  Receipt,
  Users2,
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import UserAvatar from "@/components/global/user-avatar"
import { getCurrentUser } from "@/lib/session"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function AppSideBar({ className }: SidebarProps) {
  const user = await getCurrentUser()
  return (
    <Collapsible
      className={cn(
        {
          "pb-12 hidden sm:block": true,
          "sm:col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-2": true,
          "sm:col-span-1": !true,
        },
        className
      )}
      open={true}
    >
      <CollapsibleContent className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="px-4 text-lg font-semibold tracking-tight">
              Hi, {user?.name}
            </h2>
            <CollapsibleTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ChevronsLeft className="mr-2 h-4 w-4 cursor-pointer rounded-sm hover:bg-secondary/80" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Collapse</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CollapsibleTrigger>
          </div>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Todo
            </Button>
            <Button variant="ghost" className="w-full justify-start" disabled>
              <PieChart className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start" disabled>
              <ClipboardList className="mr-2 h-4 w-4" />
              Tasks
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Setting
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" disabled>
              <Users2 className="mr-2 h-4 w-4" />
              Team
            </Button>
            <Button variant="ghost" className="w-full justify-start" disabled>
              <BarChartBig className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <Button variant="ghost" className="w-full justify-start" disabled>
              <Receipt className="mr-2 h-4 w-4" />
              Billing
            </Button>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Integrations
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              <Button variant="ghost" className="w-full justify-start" disabled>
                <Blocks className="mr-2 h-4 w-4" />
                Other App
              </Button>
            </div>
          </ScrollArea>
        </div>
      </CollapsibleContent>
      <div className={cn({ hidden: true })}>
        <div className="px-3 py-2">
          <div className="mb-4 grid grid-cols-12">
            <h2
              className={cn(
                "px-4 text-lg font-semibold tracking-tight grid place-items-center col-span-11",
                {
                  "px-2": !true,
                }
              )}
            >
              <UserAvatar />
            </h2>
            <CollapsibleTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ChevronsRight className="mr-2 h-4 w-4 col-span-1 cursor-pointer rounded-sm hover:bg-secondary/80" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Collapse</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CollapsibleTrigger>
          </div>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-center">
              <LayoutGrid className="mr-2 h-4 w-4 xl:h-5 xl:w-5" />
              <span className="sr-only">Todo</span>
            </Button>
            <Button variant="ghost" className="w-full justify-center">
              <PieChart className="mr-2 h-4 w-4 xl:h-5 xl:w-5" />
              <span className="sr-only">Dashboard</span>
            </Button>
            <Button variant="ghost" className="w-full justify-center">
              <ClipboardList className="mr-2 h-4 w-4 xl:h-5 xl:w-5" />
              <span className="sr-only">Tasks</span>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="sr-only mb-2 px-4 text-lg font-semibold tracking-tight">
            Setting
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-center">
              <Users2 className="mr-2 h-4 w-4 xl:h-5 xl:w-5" />
              <span className="sr-only">Team</span>
            </Button>
            <Button variant="ghost" className="w-full justify-center">
              <BarChartBig className="mr-2 h-4 w-4 xl:h-5 xl:w-5" />
              <span className="sr-only">Reports</span>
            </Button>
            <Button variant="ghost" className="w-full justify-center" disabled>
              <Receipt className="mr-2 h-4 w-4 xl:h-5 xl:w-5" />
              <span className="sr-only">Billing</span>
            </Button>
          </div>
        </div>
        <div className="py-2">
          <h2 className="sr-only relative px-7 text-lg font-semibold tracking-tight">
            Integrations
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              <Button
                variant="ghost"
                className="w-full justify-center"
                disabled
              >
                <Blocks className="mr-2 h-4 w-4 xl:h-5 xl:w-5" />
                <span className="sr-only">Other App</span>
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </Collapsible>
  )
}
