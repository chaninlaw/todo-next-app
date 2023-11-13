"use client"

import React from "react"
import { z } from "zod"
import { cn } from "@/lib/utils"
import {
  Modal,
  Button,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
  ModalFooter,
  Input,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
} from "@nextui-org/react"
import { User } from "@prisma/client"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { AnimationProps } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ActionTodo, TodoSchema } from "@/lib/actions/todos/validations"
import { createTodo } from "@/lib/actions/todos"
import { uniqueId } from "lodash"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface Props {
  user: User | null
  updateOptimisticTodos: (action: ActionTodo) => void
  children: (onOpen: () => void) => React.ReactNode
}

export default function CreateTodoModal({
  user,
  updateOptimisticTodos,
  children,
}: Props) {
  const { toast } = useToast()
  if (!user) return <></>

  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      userId: user.id,
      title: "",
      description: "",
      dueDate: undefined,
      status: "ACTIVE",
    },
  })
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const onSubmit = async (formData: z.infer<typeof TodoSchema>) => {
    try {
      updateOptimisticTodos({
        type: "ADD",
        todo: {
          ...formData,
          description:
            formData.description === undefined ? null : formData.description,
          dueDate: formData.dueDate === undefined ? null : formData.dueDate,
          updatedAt: new Date(),
          createdAt: new Date(),
          id: uniqueId(),
          tags: [""],
          user,
        },
      })
      onClose()
      await createTodo(formData)
      form.reset()
    } catch (error) {
      if (error instanceof Error) {
        // form.setError({ ...error.message })
        toast({
          variant: "destructive",
          title: "Failed to create a todo.",
          description: error.message,
          action: (
            <ToastAction onClick={onOpen} altText="Try again">
              Try again
            </ToastAction>
          ),
        })
      }
    }
  }

  const variants: AnimationProps["variants"] = {
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  return (
    <>
      <div onClick={onOpen}>{children(onOpen)}</div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          onClose()
          form.reset()
        }}
        isDismissable={false}
        motionProps={{ variants }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Create Todo
                  </ModalHeader>
                  <ModalBody>
                    <FormField
                      name="title"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Title</FormLabel>
                          <FormControl>
                            <Input
                              autoFocus
                              isRequired
                              id="title"
                              label="Title"
                              type="text"
                              variant="underlined"
                              autoCorrect="off"
                              aria-describedby="title-error"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage id="title-error" aria-live="polite" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="description"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Description</FormLabel>
                          <FormControl>
                            <Textarea
                              id="description"
                              label="Description"
                              variant="underlined"
                              aria-describedby="description-error"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage
                            id="description-error"
                            aria-live="polite"
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="dueDate"
                      control={form.control}
                      render={({ field }) => (
                        <div className="max-w-md bg-content1 hover:bg-content2 flex justify-evenly items-center cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent">
                          <FormItem>
                            <FormLabel className={cn("!text-medium mr-8")}>
                              Due Date:
                            </FormLabel>
                            <FormControl>
                              <Popover placement="bottom">
                                <PopoverTrigger>
                                  <Button
                                    className={cn(
                                      "w-[240px] !m-0 justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    radius="sm"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage
                              id="description-error"
                              aria-live="polite"
                            />
                          </FormItem>
                        </div>
                      )}
                    />

                    <FormField
                      name="status"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex py-2 px-1 justify-between">
                          <Select
                            label="Todo Status"
                            color={
                              field.value === "ACTIVE"
                                ? "primary"
                                : field.value === "COMPLETED"
                                ? "success"
                                : "warning"
                            }
                            variant="bordered"
                            className="max-w-full"
                            selectedKeys={[field.value]}
                            onChange={(e) => field.onChange(e.target.value)}
                            disabledKeys={["OTHER"]}
                            renderValue={(items) => (
                              <span>
                                {items.map((item) => (
                                  <span
                                    key={item.key}
                                    className={
                                      item.textValue === "Active"
                                        ? "text-primary"
                                        : item.textValue === "Completed"
                                        ? "text-green-500"
                                        : "text-warning-500"
                                    }
                                  >
                                    {item.textValue}
                                  </span>
                                ))}
                              </span>
                            )}
                          >
                            {["ACTIVE", "COMPLETED", "BLOCK", "OTHER"].map(
                              (status) => (
                                <SelectItem
                                  color="secondary"
                                  key={status}
                                  value={status}
                                >
                                  {status.charAt(0).toUpperCase() +
                                    status.slice(1).toLowerCase()}
                                </SelectItem>
                              )
                            )}
                          </Select>
                        </div>
                      )}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="secondary"
                      variant="shadow"
                      onPress={() => {
                        onClose()
                        form.reset()
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      onPress={async () => {
                        await onSubmit(form.getValues())
                      }}
                    >
                      Create
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        </Form>
      </Modal>
    </>
  )
}
