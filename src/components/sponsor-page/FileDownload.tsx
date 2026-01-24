interface FileDownloadProps {
    filePath: string;
    fileName: string;
    content?: string;
}

export default function FileDownload({ filePath, fileName, content = "" }: FileDownloadProps) {
    return (
        <div className="relative w-1/2 h-full">
            <div className="absolute left-1/2 right-1/2 -translate-x-1/2 bottom-1/2 w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5 overflow-hidden">
                <a href={filePath} download={fileName} className="z-5 relative block w-3/4 h-[20vmin] md:h-[18vmin] lg:h-[17vmin] xl:h-[13vmax] mx-auto bg-neutral-100/90 border-black border-t-[1.5px] border-x-[1.5px] rounded-t-xl duration-150 translate-y-1/2 hover:translate-y-1/6 active:translate-y-1/6 hover:rotate-2 active:rotate-2 p-2 md:p-3 lg:p-4" />

                <p className="z-10 relative w-full bg-[#505354] rounded-md text-sm md:text-base text-center p-2">{content}</p>
            </div>
        </div>
    );
}