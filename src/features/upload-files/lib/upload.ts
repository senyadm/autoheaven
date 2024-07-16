import { MAX_FILES } from "../constants/max-files";

export function getFiles(event: React.ChangeEvent<HTMLInputElement>) {
  const files = event.target.files;
  let errorMessage = "";

  if (files && files.length > MAX_FILES) {
    errorMessage = `You can only upload up to ${MAX_FILES} images.`;
  } else if (files) {
    for (const file of files) {
      if (!["image/png", "image/jpeg", "image/gif"].includes(file.type)) {
        errorMessage = `The file type of ${file.name} is not allowed.`;
        break;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        errorMessage = `The file ${file.name} is too large.`;
        break;
      }
    }
  }
  return { files, errorMessage };
}
