'use server';

import { getUserSession } from "@/app/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

    const userId = await getUserSession();


    const todo = await prisma.todo.findFirst({
        where: { id: id, userId: userId!.id }
    })

    if (!todo) {
        throw `Todo con id ${id} no encontrado`
    }

    const updatedTodo = await prisma.todo.update({
        where: { id: id },
        data: { complete: complete }
    });

    revalidatePath('/dashboard/server-todos');

    return updatedTodo;
}

export const addTodo = async (description: string) => {
    try {

        const userId = await getUserSession();

        const todo = await prisma.todo.create({ data: { description, userId: userId!.id } })

        revalidatePath('/dashboard/server-todos');

        return todo;

    } catch (error) {
        return {
            message: 'Error al crea todo'
        }
    }
}

export const deleteCompleted = async (): Promise<void> => {

    const userId = await getUserSession();

    await prisma.todo.deleteMany({ where: { complete: true, userId: userId!.id } })

    revalidatePath('/dashboard/server-todos');

}