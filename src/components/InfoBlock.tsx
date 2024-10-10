import { ReactNode } from "react"

export default function InfoBlock(
    {
        className = "",
        title,
        children
    }: {
        className?: String,
        title: String,
        children: ReactNode
    }
) {

    return (
        <div className={`${className} flex flex-col gap-0`}>
            <div className="w-full h-fit relative flex flex-row text-info_title gap-0">
                <div className="relative flex flex-row">
                    <div className="absolute bg-info-title-start w-full h-full" />
                    <div className="text-info_title relative px-6 text-center">{title}</div>
                </div>
                <div className="relative flex w-full h-full gap-0">
                    <div className="absolute bg-info-title-end w-full h-full" />
                    <div className="text-main px-2"></div>

                </div>
            </div>
            <div className="w-full h-full relative">
                <div className="bg-info-bottom absolute w-full h-full" />
                <div className="flex flex-col gap-2 relative px-3 pb-3">
                    {children}
                </div>
            </div>
        </div>
    )
}