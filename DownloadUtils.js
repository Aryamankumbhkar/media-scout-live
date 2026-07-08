import { Link } from "react-router-dom";

export const handleDownloadingFile = async (fileUrl, fileName) =>{
   const response =  await fetch (fileUrl)

   const blob = await response.blob()
   const blobUrl = URL.createObjectURL(blob);
   
   const Link = document.createElement('a');
   Link.href = blobUrl;
    Link.download = `${fileName ? fileName.slice(0, 15) : 'download'}.jpg`;

    Link.click();
    URL.revokeObjectURL(blobUrl)


}