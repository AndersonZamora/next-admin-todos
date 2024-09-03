import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const take = +(searchParams.get('take') ?? '10');
    const skip = +(searchParams.get('skip') ?? '0');

    if (isNaN(take)) {
        return NextResponse.json({
            mesasage: 'Take tiene que ser un número'
        }, { status: 400 })
    }

    if (isNaN(skip)) {
        return NextResponse.json({
            mesasage: 'Skip tiene que ser un número'
        }, { status: 400 })
    }

    const todos = await prisma.todo.findMany({
        take, skip,
    });

    return NextResponse.json(todos);
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional()
})

export async function POST(request: Request) {

    try {
        const { complete, description } = await postSchema.validate(await request.json());

        const todo = await prisma.todo.create({ data: { complete, description } })

        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json({
            mesasage: `Error al crear todo`
        }, { status: 400 })
    }
}

export async function DELETE(request: Request) {

    try {

        await prisma.todo.deleteMany({
            where: { complete: true }
        })

        return NextResponse.json({ message: 'ok' })
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }

}
