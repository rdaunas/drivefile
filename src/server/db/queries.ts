import "server-only";
import { db } from ".";
import { files_table , folders_table, DB_FileType} from "~/server/db/schema";
import { eq, isNull, and } from "drizzle-orm";


export const QUERIES = {
getFiles :async function (folderId : number) {
    return await db.select().from(files_table).where(eq(files_table.parent, folderId)).orderBy(files_table.id);

},
getFolders: async function (folderId : number) {
    return  await db.select().from(folders_table).where(eq(folders_table.parent, folderId)).orderBy(folders_table.id);
},
getFoldersById: async function (folderId: number) {
    const folder = await db.select().from(folders_table).where(eq(folders_table.id,folderId));
    return folder[0]
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
getRootFolderForUser : async function (userId: string) {
    const folder = await db.select()
        .from(folders_table)
        .where(
            and(
                eq(folders_table.ownerId, userId),
                isNull(folders_table.parent)
            )
        );
    return folder[0];
}
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
        return await db.insert(files_table).values({...input.file, ownerId: input.userId});
    },

    onboardUser: async function(userId: string) {
        const rootFolder = await db.insert(folders_table).values({
           ownerId: userId,
           name: "Root",
           parent : null,            
        }).$returningId();

        const rootFolderId = rootFolder[0]!.id;

        await db.insert(folders_table).values([
        {
            name: "Image",
            parent: rootFolderId,
            ownerId: userId,
        },
        {
            name: "Work",
            parent: rootFolderId,
            ownerId: userId,
        },
        {
            name: "Documents",
            parent: rootFolderId,
            ownerId: userId,
        },
        ]);

        return rootFolderId;
    }
}







