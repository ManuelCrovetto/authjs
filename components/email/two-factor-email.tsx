

type Props = {
    code: string;
    name: string;
}

export const TwoFactorEmail = (
    { code, name }: Props
) => {

    return (
        <div>
            <h1>Welcome, {name}</h1>
            <p>Your 2FA code: {code}</p>
        </div>
    )
}