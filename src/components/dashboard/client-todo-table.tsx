"use client"

import React from "react"
import {
  Input,
  Button,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  AvatarIcon,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"
import {
  CalendarIcon,
  ChevronDownIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"
import { capitalize } from "lodash"
import CreateTodoModal from "@/components/dashboard/create-todo-modal"
import { INITIAL_VISIBLE_COLUMNS } from "@/components/dashboard/todo-table.config"
import { format, formatDistanceToNow } from "date-fns"
import { TodoWithUser } from "@/lib/interface"
import DeletTodoModal from "./delete-todo-modal"
import EditTodoModal from "./edit-todo-modal"
import { ActionTodo, actionTodo } from "@/lib/actions/todos/optimisticAction"
import { Session } from "next-auth"
import { Todo } from "@prisma/client"

const statusColorMap: Record<string, ChipProps["color"]> = {
  ACTIVE: "warning",
  COMPLETED: "success",
  BLOCK: "danger",
}

export interface CustomTodoColumns {
  key: string
  value: string
  sortable?: boolean
}

export interface StatusTodoOptions<T> {
  key: T
  value: string
}

export interface CustomTodoTable {
  user: Session["user"]
  todoWithUser: TodoWithUser[]
  columns: CustomTodoColumns[]
  statusOptions: StatusTodoOptions<Todo["status"]>[]
}

export default function ClientTodoTable({
  user,
  todoWithUser = [],
  columns = [],
  statusOptions = [],
}: CustomTodoTable) {
  const [filterValue, setFilterValue] = React.useState("")
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all")
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "status",
    direction: "ascending",
  })
  const [optimisticTodos, updateOptimisticTodos] = React.useOptimistic(
    todoWithUser,
    (state, action: ActionTodo) => actionTodo(state, action, sortDescriptor)
  )
  const [page, setPage] = React.useState(1)

  const pages = Math.ceil(optimisticTodos.length / rowsPerPage)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key)
    )
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredTodos = [...optimisticTodos]

    if (hasSearchFilter) {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.title.toLowerCase().includes(filterValue.toLowerCase())
      )
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredTodos = filteredTodos.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      )
    }

    return filteredTodos
  }, [optimisticTodos, filterValue, statusFilter])

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: TodoWithUser, b: TodoWithUser) => {
      const column = sortDescriptor.column as keyof TodoWithUser
      const typeA = typeof a[column]
      const typeB = typeof b[column]

      const normalizeValue = (value: any) => {
        if (
          typeA === "string" &&
          typeB === "string" &&
          ["createdAt", "updatedAt", "dueDate"].includes(column)
        ) {
          return new Date(value)
        }

        if (typeA === "number" && typeB === "number") {
          return Number(value)
        }

        if (typeA === "string" && typeB === "string") {
          return value.toLowerCase()
        }

        return value
      }

      const normalizedA = normalizeValue(a[column])
      const normalizedB = normalizeValue(b[column])

      const cmp =
        normalizedA < normalizedB ? -1 : normalizedA > normalizedB ? 1 : 0

      return sortDescriptor.direction === "descending" ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = React.useCallback(
    (todo: TodoWithUser, columnKey: React.Key) => {
      const cellValue = todo[columnKey as keyof Todo]

      switch (columnKey) {
        case "title":
          return (
            <User
              avatarProps={{
                radius: "full",
                size: "sm",
                src: todo.user?.image ?? undefined,
                fallback: <AvatarIcon />,
              }}
              classNames={{
                description: "text-default-500",
              }}
              description={formatDistanceToNow(todo.createdAt)}
              name={cellValue as string}
            >
              {todo.title}
            </User>
          )
        case "description":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">{cellValue as string}</p>
              <p className="text-bold text-tiny text-default-500"></p>
            </div>
          )
        case "status":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[todo.status]}
              size="sm"
              variant="dot"
            >
              {cellValue as string}
            </Chip>
          )
        case "actions":
          return (
            <div className="relative flex justify-start items-center gap-2">
              <div className="relative flex items-center gap-4">
                <EditTodoModal
                  todo={todo}
                  updateOptimisticTodos={updateOptimisticTodos}
                >
                  {(onOpen) => (
                    <Button
                      size="sm"
                      isIconOnly
                      className="bg-transparent hover:bg-content3"
                      aria-label="Edit Todo"
                      onPress={onOpen}
                    >
                      <PencilIcon size={16} />
                    </Button>
                  )}
                </EditTodoModal>

                <DeletTodoModal
                  todo={todo}
                  updateOptimisticTodos={updateOptimisticTodos}
                >
                  {(onOpen) => (
                    <Button
                      size="sm"
                      isIconOnly
                      className="bg-transparent hover:bg-content3"
                      aria-label="Delete Todo"
                      onPress={onOpen}
                    >
                      <XIcon className="text-white" size={22} />
                    </Button>
                  )}
                </DeletTodoModal>
              </div>
            </div>
          )
        default:
          return cellValue instanceof Date ? (
            <div className="flex items-center">
              <CalendarIcon size={15} className="mr-2" />
              {format(cellValue, "PP")}
            </div>
          ) : (
            cellValue
          )
      }
    },
    []
  )

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value))
      setPage(1)
    },
    []
  )

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue("")
    }
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by title..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.key} className="capitalize">
                    {capitalize(status.value)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {capitalize(column.value)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <CreateTodoModal
              user={user}
              updateOptimisticTodos={updateOptimisticTodos}
            >
              {(onOpen) => (
                <Button
                  className="bg-foreground text-background"
                  endContent={<PlusIcon />}
                  onPress={onOpen}
                  size="sm"
                >
                  Add New
                </Button>
              )}
            </CreateTodoModal>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {optimisticTodos.length} todos
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    optimisticTodos.length,
    hasSearchFilter,
  ])

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-todos-[first=true]:first:before:rounded-none",
        "group-todos-[first=true]:last:before:rounded-none",
        // middle
        "group-todos-[middle=true]:before:rounded-none",
        // last
        "group-todos-[last=true]:first:before:rounded-none",
        "group-todos-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  )

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Todo List Table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.value}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"You doesn't have any todo. Create one 🤩"}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
