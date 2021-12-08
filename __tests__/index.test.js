import { render, screen } from '@testing-library/react'
import Index, { getStaticProps } from '../pages/index'

const pokemons = [
    {
        name: 'PokeRap',
        url: 'https://pokeRap.com/miPokemon/1/'
    }
]

const fetchMock = url => new Promise(resolve => resolve({
    json: () => Promise.resolve({ results: pokemons })
}))

describe('Index', () => {
    describe('Component  ', () => {
        it('Render Index', () => {
            const { getByTestId } = render(
                <Index pokemons={pokemons} />
            )

            // find by text
            let paragraph = screen.getByText('Pokemons App')
            expect(paragraph).toBeInTheDocument()
            
            // find by testId in all screen
            paragraph = screen.getByTestId('title')
            expect(paragraph).toBeInTheDocument()

            // find by testId in rendered component
            paragraph = getByTestId('title')
            expect(paragraph).toBeInTheDocument()


            // get pokemon by text
            const pokeDummy = screen.getByText('PokeRap - 1')
            expect(pokeDummy).toBeInTheDocument()

            // get pokemon link/url and test it
            const pokeUrl = pokeDummy.getAttribute('href')
            expect(pokeUrl).toEqual('/pokemons/1')
        })
    })

    describe('getStaticProps  ', () => {
        it('return pokemons by mock', async () => {
            // mock fetch function used in getStaticProps
            global.fetch = jest.fn()
                .mockImplementation(fetchMock)

            // test if getStaticProps result contains array passed
            const { props } = await getStaticProps()
            expect(props.pokemons).toEqual(pokemons)
        })
    })
})