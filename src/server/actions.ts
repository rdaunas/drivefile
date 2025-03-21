"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { files_table } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utapi = new UTApi();
// use server make endpoint for the front NEEDS to be treated safely

export async function deleteFile(fileId : number) {
    const session = await auth();
    if(!session.userId){
        return {error : "Unauthorized"}
    }

    const [file] = await db.select().from(files_table)
    .where(
        and(
            eq(files_table.ownerId, session.userId),
            eq(files_table.id, fileId)
        )
        
    );

    if(!file) {
        return { error: "File(s) not found"}
    }
    
    //hack to remove beginning of url from uploadthing url to get the file key
    const utapiResult = await utapi.deleteFiles([file.url.replace("https://utfs.io/f/","")]);
    console.log(utapiResult.success,utapiResult.deletedCount)
    const delFile = await db.delete(files_table)
    .where(
        and(
            eq(files_table.ownerId, session.userId),
            eq(files_table.id, fileId)
        )
        
    );
    const c = await cookies();
    c.set("force-refresh",JSON.stringify(Math.random()))
}

