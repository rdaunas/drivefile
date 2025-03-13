import "server-only";
import { db } from ".";
import { files_table , folders_table, DB_FileType} from "~/server/db/schema";
import { eq } from "drizzle-orm";


export const QUERIES = {
getFiles :async function (folderId : number) {
    return await db.select().from(files_table).where(eq(files_table.parent, folderId));

},
getFolders: async function (folderId : number) {
    return  await db.select().from(folders_table).where(eq(folders_table.parent, folderId));

},
getAllParents: async function ( folderId: number){
    const parents= [];
    let currentId : number | null = folderId;
    while(currentId !== null) {
        const folder = await db.selectDistinct().from(folders_table).where(eq(folders_table.id, currentId));

        if(!folder[0]){
            throw new Error("Parent folder not found")
        }

        parents.unshift(folder[0]);
        currentId = folder[0]?.parent;
    }
    return parents;
},
}

export const MUTATIONS = {
    createFile : async function (input : {
        file : {
            name: string,
            url: string,
            parent: number,
            size: number
        },
        userId: string;
    }) {

        if(!input.userId) {
            throw new Error("Unauthorized")
        }
        return await db.insert(files_table).values({...input.file, parent: 1});
    }
}







