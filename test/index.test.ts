import { describe, expect, it } from '@jest/globals';
import './helpers/custom-expect-matchers/toBePlacesData';
import './helpers/custom-expect-matchers/toBePostcodeData';

import { PostcodesIO } from '../src/index'

describe('PostcodesIO', () => {
  const postcodesIO = new PostcodesIO()

  describe('nearestOutcode', () => {
    it('should return list of nearest OutcodeData for valid outcode and limit=2', async () => {
      // given
      const outcode = 'W1A'
  
      // when
      const outcodeDataList = await postcodesIO.nearestOutcode(outcode, { limit: 2 })
  
      // then
      expect(outcodeDataList).toEqual(
        [
          {
            admin_county: [],
            admin_district: [
              'Westminster',
              'Islington',
            ],
            admin_ward: [
              'West End',
              'Clerkenwell',
            ],
            country: [
              'England',
            ],
            eastings: 531022,
            latitude: 51.5243793926381,
            longitude: -0.112778809815951,
            northings: 182295,
            outcode: 'W1A',
            parish: [
              'Islington, unparished area',
              'Westminster, unparished area',
            ],
            parliamentary_constituency: [
              'Islington South and Finsbury',
              'Cities of London and Westminster',
            ],
          },
          {
            admin_county: [],
            admin_district: [
              'Islington',
            ],
            admin_ward: [
              'Clerkenwell',
            ],
            country: [
              'England',
            ],
            eastings: 531073,
            latitude: 51.5245656272727,
            longitude: -0.112034159090909,
            northings: 182317,
            outcode: 'EC1P',
            parish: [
              'Islington, unparished area',
            ],
            parliamentary_constituency: [
              'Islington South and Finsbury',
            ],
          },
        ],
      )
    })

    it('should return undefined for invalid outcode',async () => {
      // given
      const outcode = 'PLOP'

      // when
      const outcodeDataList = await postcodesIO.nearestOutcode(outcode)

      // then
      expect(outcodeDataList).toBeUndefined()
    })
  })

  describe('outcodeReverseGeocoding', () => {
    it('should return list of nearest OutcodeData for matching lon/lat', async () => {
      // given
      const lon = -2.302836
      const lat = 53.455654

      // when
      const outcodeDataList = await postcodesIO.outcodeReverseGeocoding(lon, lat, { limit: 2 })

      // then
      expect(outcodeDataList).toEqual(
        [
          {
            admin_county: [],
            admin_district: [
              'Trafford',
            ],
            admin_ward: [
              'Gorse Hill',
              'Longford',
              'Stretford',
              'Priory',
            ],
            country: [
              'England',
            ],
            eastings: 379552,
            latitude: 53.4509196350365,
            longitude: -2.30937130656934,
            northings: 394951,
            outcode: 'M32',
            parish: [
              'Trafford, unparished area',
            ],
            parliamentary_constituency: [
              'Stretford and Urmston',
              'Wythenshawe and Sale East',
            ],
          },
          {
            admin_county: [],
            admin_district: [
              'Salford',
              'Trafford',
            ],
            admin_ward: [
              'Pendleton & Charlestown',
              'Gorse Hill',
              'Davyhulme East',
            ],
            country: [
              'England',
            ],
            eastings: 378921,
            latitude: 53.467968,
            longitude: -2.31899632335329,
            northings: 396850,
            outcode: 'M17',
            parish: [
              'Salford, unparished area',
              'Trafford, unparished area',
            ],
            parliamentary_constituency: [
              'Salford and Eccles',
              'Stretford and Urmston',
            ],
          },
        ],
      )
    })

    it('should return undefined for non-matching lon/lat',async () => {
      // given
      const lon = 0
      const lat = 0

      // when
      const outcodeDataList = await postcodesIO.outcodeReverseGeocoding(lon, lat)
      
      // then
      expect(outcodeDataList).toBeUndefined()
    })
  })

  describe('randomPostcode', () => {
    it('should return PostcodeData', async () => {
      // given

      // when
      const postcodeData = await postcodesIO.randomPostcode()

      // then
      expect(postcodeData).toBePostcodeData()
    })

    it('should return PostcodeData for valid outcode', async () => {
      // given
      const outcode = 'W1A'

      // when
      const postcodeData = await postcodesIO.randomPostcode(outcode)

      // then
      expect(postcodeData).toBePostcodeData()
    })

    it('should return undefined for invalid outcode', async () => {
      // given
      const outcode = 'Plop'

      // when
      const postcodeData = await postcodesIO.randomPostcode(outcode)

      // then
      expect(postcodeData).toBeUndefined()
    })
  })

  describe('randomPlace', () => {
    it('should return PlacesData', async () => {
      // given

      // when
      const placesData = await postcodesIO.randomPlace()

      // then
      expect(placesData).toBePlacesData()
    })
  })

  describe('scottishPostcodeLookup', () => {
    it('should return ScottishPostcodeData for Scottish postcode', async () => {
      // given
      const postcode = 'EH22 3NX'

      // when
      const scottishPostcodeData = await postcodesIO.scottishPostcodeLookup(postcode)

      // then
      expect(scottishPostcodeData).toEqual(
        {
          "postcode": "EH22 3NX",
          "scottish_parliamentary_constituency": "Midlothian North and Musselburgh",
          "codes": {
            "scottish_parliamentary_constituency": "S16000130"
          }
        }
      )
    })

    it('should return undefined for non-Scottish postcode', async () => {
      // given
      const postcode = 'W1A 1AA'

      // when
      const scottishPostcodeData = await postcodesIO.scottishPostcodeLookup(postcode)

      // then
      expect(scottishPostcodeData).toBeUndefined()
    })

    it('should return undefined for invalid postcode', async () => {
      // given
      const postcode = 'Plop'

      // when
      const scottishPostcodeData = await postcodesIO.scottishPostcodeLookup(postcode)

      // then
      expect(scottishPostcodeData).toBeUndefined()
    })
  })

  describe('terminatedPostcodeLookup', () => {
    it('should return TerminatedPostcodeData for terminated postcode', async () => {
      // given
      const postcode = 'E1W 1UU'

      // when
      const terminatedPostcodeData = await postcodesIO.terminatedPostcodeLookup(postcode)

      // then
      expect(terminatedPostcodeData).toEqual(
        {
          "postcode": "E1W 1UU",
          "year_terminated": 2015,
          "month_terminated": 2,
          "longitude": -0.073732,
          "latitude": 51.508007
        }
      )
    })

    it('should return undefined for live postcode', async () => {
      // given
      const postcode = 'W1A 1AA'

      // when
      const terminatedPostcodeData = await postcodesIO.terminatedPostcodeLookup(postcode)

      // then
      expect(terminatedPostcodeData).toBeUndefined()
    })

    it('should return undefined for invalid postcode', async () => {
      // given
      const postcode = 'Plop'

      // when
      const terminatedPostcodeData = await postcodesIO.terminatedPostcodeLookup(postcode)

      // then
      expect(terminatedPostcodeData).toBeUndefined()
    })
  })
})
