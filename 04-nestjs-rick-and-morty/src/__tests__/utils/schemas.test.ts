// __tests__/utils/schemas.test.ts

import {
  feedbackSchema,
  CharacterSchema,
  CharacterResponseSchema,
} from '@/app/utils/schemas'

//Prueba con el shema del ejemplo
describe('Feedback Schema', () => {
  it('should validate valid feedback data', () => {
    const validData = {
      name: 'Sofia C',
      subject: 'Test Subject',
      comments: 'This is a test comment',
    }
    const result = feedbackSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail validation for invalid feedback data', () => {
    const invalidData = {
      name: 'Sofía',
      subject: '',
      comments: 123, // Invalid type
    }
    const result = feedbackSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})

describe('Character Schema', () => {
  it('should validate valid character data', () => {
    const validCharacterData = {
      image: 'https://example.com/image.jpg',
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      origin: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      location: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/20',
      },
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    }
    const result = CharacterSchema.safeParse(validCharacterData)
    expect(result.success).toBe(true)
  })

  it('should fail validation for invalid character data', () => {
    const invalidCharacterData = {
      // Provide invalid character data according to schema
    }
    const result = CharacterSchema.safeParse(invalidCharacterData)
    expect(result.success).toBe(false)
  })
})

describe('Character Response Schema', () => {
  it('should validate valid character response data', () => {
    const validCharacterResponseData = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [
        {
          image: 'https://example.com/image.jpg',
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          origin: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          location: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z',
        },
      ],
    }
    const result = CharacterResponseSchema.safeParse(validCharacterResponseData)
    expect(result.success).toBe(true)
  })

  it('should fail validation for invalid character response data', () => {
    const invalidCharacterResponseData = {
      // Provide invalid character response data according to schema
    }
    const result = CharacterResponseSchema.safeParse(
      invalidCharacterResponseData,
    )
    expect(result.success).toBe(false)
  })
})
