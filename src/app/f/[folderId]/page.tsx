import DriveContent from "../../drive-content";
import { QUERIES } from "~/server/db/queries";


export default async function GoogleDriveClone( props: {params: Promise<{folderId: string}>}){

  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);

  if(isNaN(parsedFolderId)){
    return <div>Invalid folder Id</div>
  }

  const [files, folders, parents] = await Promise.all([
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getAllParents(parsedFolderId)
  ]);

  return(
    <DriveContent files={files} folders={folders} parents={parents}/>
  )
}