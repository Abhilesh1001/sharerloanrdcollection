
interface DumInProps {
    indum : string | null | number |boolean
}


const DumyInput = (props:DumInProps) => {
    return (
        <div className="bg-base-200 rounded-md w-26 overflow-auto px-2 py-1 text-sm h-8 border-opacity-50 border shadow-xl">
            <div className="flex justify-center  items-center">
                <div
                    className="outline-none w-full text-sm"
                > 
                {props.indum}
                </div>
            </div>
        </div>
    )
}

export default DumyInput