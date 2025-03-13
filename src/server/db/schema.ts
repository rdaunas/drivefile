import "server-only"
import { int, text, singlestoreTable, index, bigint } from "drizzle-orm/singlestore-core";

export const files_table = singlestoreTable("file_table", {
  id: bigint("id", {mode: "number", unsigned: true}).primaryKey().autoincrement(),
  name: text("name").notNull(),
  url: text('url').notNull(),
  parent: bigint("parent",{mode: "number", unsigned: true}).notNull(),
  size: int("size").notNull()
},
(t) => {
  return [index("parent_index").on(t.parent)]
});

export const folders_table = singlestoreTable("folder_table", {
  id: bigint("id", {mode: "number", unsigned: true}).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent",{mode: "number", unsigned: true}),
},
(t) => {
  return [index("parent_index").on(t.parent)]
});

export type DB_FileType = typeof files_table.$inferSelect;
export type DB_FolderType = typeof folders_table.$inferSelect;
