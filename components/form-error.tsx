import {ExclamationTriangleIcon} from "@radix-ui/react-icons";


type Props = {
    message?: string;
}

export const FormError = ({message}: Props) => {
    if (!message) return null;
    return (
        <div className="bg-rose-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-rose-600">
            <ExclamationTriangleIcon className="size-4"/>
            <p>{message}</p>

        </div>
    )
}