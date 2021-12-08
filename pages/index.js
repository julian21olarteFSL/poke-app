import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/Home.module.css'

const Pokemon = ({ pokemon }) => {
  const id = pokemon?.url?.split('/')?.filter(x => x).pop();
  return (
    <li><Link href={`/pokemons/${id}`}>{`${pokemon?.name} - ${id}`}</Link></li>
  )
}

export default function Pokemons({ pokemons }) {
  return (
    <div className={styles.container}>
      <p data-testid='title'>Pokemons App</p>
      <Image alt="pokeapp" src={"/pokeapp.png"} width={200} height={200} />

      <ul>
        {pokemons?.map(poke => (<Pokemon key={poke?.name} pokemon={poke}/>))}
      </ul>
    </div>
  )
}

// this page will be generated using static way
export const getStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();

  return {
    props: {
      pokemons: data.results
    }
  }
}