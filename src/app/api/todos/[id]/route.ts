import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Segments {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params }: Segments) {

    const { id } = params;

    const todo = await prisma.todo.findFirst({
        where: { id: id }
    })

    if (!todo) {
        return NextResponse.json({
            mesasage: `No existe un todo con ese id: ${id}`
        }, { status: 400 })
    }

    return NextResponse.json(todo)
}

const postSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional() // TODO por ver
})

export async function PUT(request: Request, { params }: Segments) {

    try {

        const { complete, description } = await postSchema.validate(await request.json());

        const { id } = params;

        const todo = await prisma.todo.findFirst({
            where: { id: id }
        })

        if (!todo) {
            return NextResponse.json({
                mesasage: `No existe un todo con ese id: ${id}`
            }, { status: 400 })
        }

        const updateTodo = await prisma.todo.update({
            where: { id },
            data: { complete, description }
        })

        return NextResponse.json(updateTodo)
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }

}
