import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'
import { getServerSession } from "next-auth";

export const signInEmailPassword = async (email: string, password: string) => {

    if (!email || !password) return null;

    const dbUser = await prisma.user.findUnique({ where: { email } });

    if (!dbUser) {
        const dbUserNew = await createUser(email, password);
        return dbUserNew;
    }

    if (!bcrypt.compareSync(password, dbUser.password ?? 'xx')) {
        return null;
    }

    return dbUser;
}


const createUser = async (email: string, password: string) => {

    const user = await prisma.user.create({
        data: {
            email: email,
            password: bcrypt.hashSync(password),
            name: email.split('@')[0],
        }
    })

    return user;
}

export const getUserSession = async () => {
    const session = await getServerSession(authOptions);

    return session?.user;

}