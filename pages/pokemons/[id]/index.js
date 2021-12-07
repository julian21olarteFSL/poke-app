import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Pokemon = ({ data }) => {
    const { query: { id }, isFallback } = useRouter()

    // use with fallback: true
    // is not necessary if fallback is blocking
    // if(isFallback) return <p>Loading...</p>

    return (
        <div>
            <Link href={`/`}>Go Back</Link>
            <br />
            <p>Pokemon {data?.name} #{id}</p>
            <Image alt={data?.name} src={data?.sprites?.front_default} width={200} height={200} />
        </div>
    )
}
export default Pokemon

// this page will be generated using SSR way
// export const getServerSideProps = async ({ params }) => {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params?.id}`);
//     const data = await response.json();

//     return {
//         props: {
//         data
//         }
//     }
// }
export const getStaticProps = async ({ params }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params?.id}`);
    const data = await response.json();

    return {
        props: {
        data
        }
    }
}

export const getStaticPaths = async () => {
    const paths = [
        { params: { id: '1' } }
    ]
    return {
        paths,
        fallback: 'blocking',
    }
}