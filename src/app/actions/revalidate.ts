"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePage(path: string) {
  try {
    revalidatePath(path);
    return { success: true };
  } catch (err) {
    console.error(`Failed to revalidate path "${path}":`, err);
    return { success: false, error: String(err) };
  }
}
