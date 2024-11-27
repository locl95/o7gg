interface NotFoundProps {
    error: string;
}

const NotFound: React.FC<NotFoundProps> = ({error}) => {

    return (
        <>{error}</>
    )
}

export default NotFound;