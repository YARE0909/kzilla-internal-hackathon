import {GetServerSideProps} from "next";
import nookies from 'nookies'

export default function Home() {
    return (
        //   TODO: Add home page
        <div>

        </div>
    )
}

// TODO: Implement getServerSideProps

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx)
    if (!cookies.token) {
        return {
            redirect: {
                destination: '/signIn',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}