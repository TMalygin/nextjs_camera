
export default function Title(
    {
        className
    }: {
        className?: string
    }
) {

    return (
        <p
            className={`${className} uppercase lg:text-6xl md:text-4xl text-2xl drop-shadow-neon backdrop-filter`}
        >
            Camera Testing
        </p>
    )
}