
export const TailwindCard = ({children}: React.PropsWithChildren) => {
    return (
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    {children}
                </div>
    )
}