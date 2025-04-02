
import { auth } from "@clerk/nextjs/server";
import DriveContent from "./drive-content";
import { QUERIES } from "~/server/db/queries";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import Link from "next/link";


export default async function GoogleDriveClone( props: {params: Promise<{folderId: string}>}){

  const params = await props.params;
  const session = await auth();


  const parsedFolderId = parseInt(params.folderId);
  console.log(parsedFolderId)

  if(isNaN(parsedFolderId)){
    return(
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-neutral-800 p-4 text-white">
      Invalid folder Id
    </div>)
  }
  
  const [files, folders, parents, isOwner] = await Promise.all([
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getAllParents(parsedFolderId),
    QUERIES.getOwnership(session.userId)
  ]);
  if(!isOwner){
    return (      
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-neutral-800 p-4 text-white">
      Unauthorized
      <Link href={"/"}>Home</Link>
    </div>)
      
  }
  return(
    <DriveContent files={files} folders={folders} parents={parents} currentFolderId={parsedFolderId}/>
  )
}