
import { Folder as FolderIcon, FileIcon, Upload, ChevronRight } from "lucide-react"
import Link from "next/link"
import  { DB_FileType, DB_FolderType} from "~/server/db/schema"


export function FileRow (props: {file: DB_FileType}) {

    const {file}= props;
    return(
        <li key={file.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-6 flex items-center">            
              <Link href={file.url} className="flex items-center text-gray-100 hover:text-blue-400" target="_blank">
                <FileIcon className="mr-3" size={20} />
                {file.name}
              </Link>            
          </div>
          <div className="col-span-3 text-gray-400">{"file"}</div>
          <div className="col-span-3 text-gray-400">{file.size}</div>
        </div>
      </li>
    )
}

export function FolderRow (props: {folder: DB_FolderType}) {

    const {folder} = props;
    return(
        <li key={folder.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-6 flex items-center">
            
              <Link
                href={`/f/${folder.id}`}
                className="flex items-center text-gray-100 hover:text-blue-400"
              >
                <FolderIcon className="mr-3" size={20} />
                {folder.name}
              </Link>
          </div>
          <div className="col-span-3 text-gray-400"></div>
          <div className="col-span-3 text-gray-400"></div>
        </div>
      </li>
    )
}