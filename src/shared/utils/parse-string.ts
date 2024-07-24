// "['68b1e50f-99cb-4a1f-ad1c-a7cc86bd5fd9.jpg', '34665187-49bd-40e0-b954-18f97b25395d.jpg', '9ebe62a5-140f-440f-8274-42c1f435ec09.jpg', 'b8b4f12b-cdb0-4902-87fd-8c372a67b36c.jpg', 'dbf61a61-c275-4620-95e2-bc657165d28f.jpg', '0430affd-86a0-45c2-a85a-8941c440648a.jpg', 'bb4b335d-8b1e-4619-bebb-2151fa7fe72c.jpg']"
const regex = /[\[\]']/g;

export function parseArrayFromString(str: string): string[] {
  return str.split(',').map((item) => item.trim().replaceAll(regex, ''));
}