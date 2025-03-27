"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { DB_FileType, DB_FolderType, files_table, folders_table } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";
import { number } from "zod";

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

export async function deleteFolder(folderId : number) {
    const session = await auth();
    if(!session.userId){
        return {error : "Unauthorized"}
    }

    const [folder] = await db.select().from(folders_table)
    .where(
        and(
            eq(folders_table.ownerId, session.userId),
            eq(folders_table.id, folderId)
        )
        
    );

    if(!folder) {
        return { error: "Folder(s) not found"}
    }

    //check if folder has folder children then recursively delete them
    const folderChild : DB_FolderType[]= await db.select().from(folders_table).where(
        eq(folders_table.parent,folderId)
    )
    if(folderChild.length > 0){

    folderChild.forEach((folder) => {
        deleteFolder(folder.id)
    })
    }
    //check if folder has file children
    const fileChild : DB_FileType[]= await db.select().from(files_table).where(
        eq(files_table.parent,folderId)
    )
    if(fileChild.length > 0){

    // removing children file in folder
    fileChild.forEach( async (file) => {

        const utapiResult = await utapi.deleteFiles([file.url.replace("https://utfs.io/f/","")]);        //hack to remove beginning of url from uploadthing url to get the file key
        console.log(utapiResult.success,utapiResult.deletedCount)
        const delFile = await db.delete(files_table)
        .where(
            and(
                eq(files_table.ownerId, session.userId),
                eq(files_table.id, file.id)
            )            
        );
    }) 
        
    }   
    //delete folder itself
    const delFolder = await db.delete(folders_table)
        .where(
            and(
                eq(folders_table.ownerId, session.userId),
                eq(folders_table.id, folderId)
            )            
        );
    
    const c = await cookies();
    c.set("force-refresh",JSON.stringify(Math.random()))
}
