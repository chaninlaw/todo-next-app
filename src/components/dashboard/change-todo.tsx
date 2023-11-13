"use client"

import { ChangeTodoSchema } from "@/lib/actions/todos/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@nextui-org/react"
import { Todo } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormField, Form } from "@/components/ui/form"
import { checkTodo } from "@/lib/actions/todos"
import { useState } from "react"
import { debounce } from "lodash"

export function TodoTitle({ todo }: { todo: Todo }) {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    resolver: zodResolver(ChangeTodoSchema),
    defaultValues: {
      todoId: todo.id,
      status: todo.status,
    },
  })

  const onSubmit = async (formData: z.infer<typeof ChangeTodoSchema>) => {
    setLoading(true)
    try {
      await checkTodo(formData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const debounceOnSubmit = debounce(onSubmit, 500)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(debounceOnSubmit)}>
        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <Checkbox
              lineThrough
              isSelected={todo.status === "COMPLETED"}
              onValueChange={(value) => {
                const newStatus = value ? "COMPLETED" : "ACTIVE"
                form.setValue("status", newStatus)
                form.handleSubmit(debounceOnSubmit)()
              }}
              isDisabled={loading}
              {...field}
            >
              <h3>{todo.title}</h3>
              <p>{field.value}</p>
            </Checkbox>
          )}
        />
      </form>
    </Form>
  )
}
