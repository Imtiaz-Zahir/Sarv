"use server";
import { cookies } from 'next/headers'

import { comparePassword, hashPassword } from "@/services/hash";
import { generateToken } from "@/services/jwt";
import { createUser, getUsersByEmail } from "@/services/user";

export async function createUserAction({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const cookieStore = await cookies();
    const existingUser = await getUsersByEmail(email);

    if (existingUser)
      return {
        success: false,
        message: "User already exists",
      };

    const hashedPassword = await hashPassword(password);

    const user = await createUser({ name, email, password: hashedPassword });

    const token = generateToken({ email: user.email, name: user.name });

    cookieStore.set("token", token);

    return {
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function loginUserAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const cookieStore = await cookies();
    const user = await getUsersByEmail(email);

    if (!user)
      return {
        success: false,
        message: "User not found",
      };

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch)
      return {
        success: false,
        message: "Invalid password",
      };

    const token = generateToken({ email: user.email, name: user.name });

    cookieStore.set("token", token);

    return {
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
