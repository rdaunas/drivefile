import { mockFiles, mockFolders } from "~/lib/mock-data"
import { db } from "~/server/db"
import { files_table, folders_table } from "~/server/db/schema";


export default function SandboxPage() {
    return(
        <div className="flex flex-col gap'">
            Seed function
            <form action={ async () => {
                "use server";
                await db.insert(folders_table).values(mockFolders.map( (folder,index) => ({
                    id: index +1,
                    name: folder.name,
                    parent: index !== 0 ? 1 : null,
                })));
                await db.insert(files_table).values(mockFiles.map( (file, index) => ({
                    id: index +1,
                    name: file.name,
                    parent: (index % 3) +1,
                    url: file.url,
                    size: 5000,
                })));
            }}>
            <button type="submit">Seed</button>
            </form>

        </div>
    )
}