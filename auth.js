import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { openAPI } from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  plugins: [openAPI()],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // Enable email/password login
  emailAndPassword: {
    enabled: true,
    async sendVerificationEmail(user, verificationUrl) {
      // optional: handle email verification
      console.log(`Send email to ${user.email}: ${verificationUrl}`);
    },
  },

  session: {
    // how long the session lasts (optional)
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },

  secret: process.env.BETTER_AUTH_SECRET,
});
