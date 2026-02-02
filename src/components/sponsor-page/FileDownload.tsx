interface FileDownloadProps {
    filePath: string;
    fileName: string;
    content?: string;
}

export default function FileDownload({
    filePath,
    fileName,
    content = "",
}: FileDownloadProps) {
    return (
        <a
            href={filePath}
            download={fileName}
            className="md:w-1/2 bg-white text-black py-3 px-6 rounded-xl border border-black text-sm lg:text-base hover:bg-neutral-100 duration-300"
        >
            {content}
        </a>
    );
}
