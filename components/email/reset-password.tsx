

type Props = {
    name: string;
    link: string;
}
export const ResetPassword = (
    { name, link }: Props
) => {
    return (
        <div>
            <h1>Welcome, {name}</h1>
            <p>To reset your password, click here: {link}</p>
        </div>
    )
}