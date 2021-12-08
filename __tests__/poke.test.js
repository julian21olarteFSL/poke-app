import { render, screen, waitFor } from '@testing-library/react'
import Poke from '../pages/poke'

const pokemons = [
    {
        name: 'PokeRap',
        url: 'https://pokeRap.com/miPokemon/1/'
    }
]

const fetchMock = url => new Promise(resolve => resolve({
    json: () => Promise.resolve({ results: pokemons })
}))

describe('Poke', () => {
    describe('Component  ', () => {
        it('Render Poke', async () => {
            // mock fetch function used in getStaticProps
            global.fetch = jest.fn()
                .mockImplementation(fetchMock)

            const { getByTestId } = render(
                <Poke />
            )

            // test loading
            const loading = getByTestId('loading')
            expect(loading).toBeInTheDocument()

            //wait for render this component
            await waitFor(() => screen.getByText('Pokemons App'))

            // loding shoudnt be in the document
            expect(loading).not.toBeInTheDocument()

            // after wait, test rendered components
            const pokemon = screen.getByTestId('1')
            expect(pokemon).toBeInTheDocument()
            
            const anchor = pokemon.children[0]
            expect(anchor).toHaveAttribute('href', '/pokemons/1')
            expect(anchor).toHaveTextContent('PokeRap - 1')
        })
    })
})