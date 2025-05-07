"use server";
import { createContact } from "@/services/contact";

export async function createContactAction({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    if(!name){
        return {
            success: false,
            message: "Name is required",
        };
    }

    if(!email){
        return {
            success: false,
            message: "Email is required",
        };
    }

    if(!subject){
        return {
            success: false,
            message: "Subject is required",
        };
    }

    if (!message) {
        return {
            success: false,
            message: "Message is required",
        };
    }

    if (name.length > 50) {
        return {
            success: false,
            message: "Name must not exceed 50 characters",
        };
    }

    if (email.length > 100) {
        return {
            success: false,
            message: "Email must not exceed 100 characters",
        };
    }

    if (subject.length > 100) {
        return {
            success: false,
            message: "Subject must not exceed 100 characters",
        };
    }

    if (message.length > 500) {
        return {
            success: false,
            message: "Message must not exceed 500 characters",
        };
    }

    await createContact({
      name,
      email,
      subject,
      message,
    });

    return {
      success: true,
      message: "Your message has been sent successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
