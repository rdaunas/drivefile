import { int, text, singlestoreTable } from "drizzle-orm/singlestore-core";

export const users = singlestoreTable("file_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name"),
  type: text("type"),
  url: text('url'),
  parent: int("parentId"),
  size: text("size")
});
