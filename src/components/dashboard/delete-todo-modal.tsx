"use client"

import React, { useEffect, useRef } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react"
import { AnimationProps } from "framer-motion"
import { deleteTodo } from "@/lib/actions/todos"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { TodoWithUser } from "@/lib/interface"
import { AlertTriangleIcon } from "lucide-react"
import { ActionTodo } from "@/lib/actions/todos/optimisticAction"

interface Props {
  todo: TodoWithUser
  updateOptimisticTodos: (action: ActionTodo) => void
  children: (onOpen: () => void) => React.ReactNode
}

export default function DeletTodoModal({
  todo,
  updateOptimisticTodos,
  children,
}: Props) {
  const { toast } = useToast()
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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

  useEffect(() => {
    if (isOpen && btnRef.current) {
      btnRef.current.focus()
    }
  }, [isOpen])

  return (
    <>
      <div onClick={onOpen}>{children(onOpen)}</div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{ variants }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h5 className="text-lg text-danger font-bold flex">
                  <AlertTriangleIcon className="mr-3" />
                  Delete Todo
                </h5>
              </ModalHeader>
              <ModalBody>
                <div className="text-md">
                  Do yo want to <span className="text-danger">delete</span> this
                  todo? <br />
                  This action can&apos;t revert.
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  ref={btnRef}
                  autoFocus
                  color="danger"
                  variant="flat"
                  aria-label="Confirm"
                  onPress={async () => {
                    try {
                      updateOptimisticTodos({
                        type: "DELETE",
                        todo,
                      })
                      onClose()
                      await deleteTodo({ todoId: todo.id })
                    } catch (error) {
                      if (error instanceof Error) {
                        toast({
                          variant: "destructive",
                          title: "Failed to delete a todo.",
                          description: error.message,
                          action: (
                            <ToastAction onClick={onOpen} altText="Try again">
                              Try again
                            </ToastAction>
                          ),
                        })
                      }
                    }
                  }}
                >
                  Delete
                </Button>

                <Button aria-label="Cancel" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
