

type Props = {
    name: string;
    link: string;
}
export const EmailTemplate = (
    { name, link }: Props
) => {
    return (
        <div>
            <h1>Welcome, {name}</h1>
            <p>To confirm your email, click here: {link}</p>
        </div>
    )
}