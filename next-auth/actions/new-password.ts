"use server";

import { getPasswordResetTokenByEmail, getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string
) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const validateFields = NewPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { password } = validateFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const exisitingUser = await getUserByEmail(existingToken.email);
  if (!exisitingUser) {
    return { error: "Email does not exist" };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: exisitingUser.id },
    data: { password: hashPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "Password updated successfully" };
};
