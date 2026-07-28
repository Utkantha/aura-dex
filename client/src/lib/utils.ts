import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showToast(description: string, type?: "success" | "info" | "warning" | "error") {
  if (type === "success") {
    return toast.success(description)
  }
  else if (type === "info") {
    return toast.info(description)
  }
  else if (type === "warning") {
    return toast.warning(description);
  }
  else if (type === "error") {
    return toast.error(description)
  }

  return toast(description)
}
