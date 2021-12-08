import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'

const Pokemon = ({ pokemon }) => {
    const id = pokemon?.url?.split('/')?.filter(x => x).pop();
    return (
        <li data-testid={id}><Link href={`/pokemons/${id}`}>{`${pokemon?.name} - ${id}`}</Link></li>
    )
}

export default function Pokemons() {
    const [loading, setLoading] = useState(true)
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        const getPokemons = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
            const data = await response.json();
            setPokemons(data.results)
            setLoading(false)
        }
        getPokemons()
    }, [])

    return (
        <div className={styles.container}>
            <p data-testid='title'>Pokemons App</p>
            <Image alt="pokeapp" src={"/pokeapp.png"} width={200} height={200} />

            { loading ? <p data-testid="loading">Loading...</p> : (
                <ul>
                    {pokemons?.map(poke => (<Pokemon key={poke?.name} pokemon={poke} />))}
                </ul>
            )}
        </div>
    )
}