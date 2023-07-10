import { describe, expect, it } from '@jest/globals';
import './helpers/custom-expect-matchers/toBePlacesData';
import './helpers/custom-expect-matchers/toBePostcodeData';

import { PostcodesIO } from '../src/index'
import { Api } from '../src/openapi';

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

  describe('placeQuery', () => {
    it('should return list of PlacesData for matching query', async () => {
      // given
      const query = 'adl'

      // when
      const placesDataList = await postcodesIO.placeQuery(query)

      // then
      expect(placesDataList).toEqual(
        [
          {
              "code": "osgb4000000074553835",
              "name_1": "Adlington",
              "name_1_lang": null,
              "name_2": null,
              "name_2_lang": null,
              "local_type": "Town",
              "outcode": "PR6",
              "county_unitary": "Lancashire",
              "county_unitary_type": "County",
              "district_borough": "Chorley",
              "district_borough_type": "District",
              "region": "North West",
              "country": "England",
              "longitude": -2.597354528609,
              "latitude": 53.6173202874495,
              "eastings": 360582,
              "northings": 413585,
              "min_eastings": 359099,
              "min_northings": 412300,
              "max_eastings": 361435,
              "max_northings": 414767
          },
          {
              "code": "osgb4000000074543613",
              "name_1": "Adlingfleet",
              "name_1_lang": null,
              "name_2": null,
              "name_2_lang": null,
              "local_type": "Village",
              "outcode": "DN14",
              "county_unitary": "East Riding of Yorkshire",
              "county_unitary_type": "UnitaryAuthority",
              "district_borough": null,
              "district_borough_type": null,
              "region": "Yorkshire and the Humber",
              "country": "England",
              "longitude": -0.724682993719623,
              "latitude": 53.6785976143851,
              "eastings": 484337,
              "northings": 420992,
              "min_eastings": 484107,
              "min_northings": 420632,
              "max_eastings": 484992,
              "max_northings": 421299
          },
          {
              "code": "osgb4000000074544422",
              "name_1": "Adlington",
              "name_1_lang": null,
              "name_2": null,
              "name_2_lang": null,
              "local_type": "Village",
              "outcode": "SK10",
              "county_unitary": "Cheshire East",
              "county_unitary_type": "UnitaryAuthority",
              "district_borough": null,
              "district_borough_type": null,
              "region": "North West",
              "country": "England",
              "longitude": -2.12928816062687,
              "latitude": 53.3207739728258,
              "eastings": 391485,
              "northings": 380435,
              "min_eastings": 390867,
              "min_northings": 380053,
              "max_eastings": 391921,
              "max_northings": 380553
          },
          {
              "code": "osgb4000000074561795",
              "name_1": "Adley Moor",
              "name_1_lang": null,
              "name_2": null,
              "name_2_lang": null,
              "local_type": "Hamlet",
              "outcode": "SY7",
              "county_unitary": "County of Herefordshire",
              "county_unitary_type": "UnitaryAuthority",
              "district_borough": null,
              "district_borough_type": null,
              "region": "West Midlands",
              "country": "England",
              "longitude": -2.91265007812378,
              "latitude": 52.365881613655,
              "eastings": 337954,
              "northings": 274595,
              "min_eastings": 337387,
              "min_northings": 274372,
              "max_eastings": 338451,
              "max_northings": 274872
          },
          {
              "code": "osgb4000000074565937",
              "name_1": "Adlestrop",
              "name_1_lang": null,
              "name_2": null,
              "name_2_lang": null,
              "local_type": "Village",
              "outcode": "GL56",
              "county_unitary": "Gloucestershire",
              "county_unitary_type": "County",
              "district_borough": "Cotswold",
              "district_borough_type": "District",
              "region": "South West",
              "country": "England",
              "longitude": -1.6472595570591,
              "latitude": 51.9412647669806,
              "eastings": 424345,
              "northings": 227032,
              "min_eastings": 423981,
              "min_northings": 226777,
              "max_eastings": 424651,
              "max_northings": 227277
          }
        ]
      )
    })

    it('should return empty array for non-matching query', async () => {
      // given
      const query = 'zzzzzz'

      // when
      const placesDataList = await postcodesIO.placeQuery(query)

      // then
      expect(placesDataList).toEqual([])
    })

    it('should return undefined for empty string query', async () => {
      // given
      const query = ''

      // when
      const placesDataList = await postcodesIO.placeQuery(query)

      // then
      expect(placesDataList).toBeUndefined()
    })
  })

  describe('placeLookup', () => {
    it('should return PlacesData for matching code', async () => {
      // given
      const code = 'osgb4000000074564391'

      // when
      const placesData = await postcodesIO.placeLookup(code)

      // then
      expect(placesData).toEqual(
        {
          "code": "osgb4000000074564391",
          "name_1": "Kent",
          "name_1_lang": null,
          "name_2": null,
          "name_2_lang": null,
          "local_type": "Hamlet",
          "outcode": "BH24",
          "county_unitary": "Hampshire",
          "county_unitary_type": "County",
          "district_borough": "New Forest",
          "district_borough_type": "District",
          "region": "South East",
          "country": "England",
          "longitude": -1.80317162043943,
          "latitude": 50.8926950373503,
          "eastings": 413940,
          "northings": 110375,
          "min_eastings": 413668,
          "min_northings": 110116,
          "max_eastings": 414169,
          "max_northings": 110616
        }
      )
    })

    it('should return undefined for non-matching code', async () => {
      // given
      const code = 'Plop'

      // when
      const placesData = await postcodesIO.placeLookup(code)

      // then
      expect(placesData).toBeUndefined()
    })
  })

  describe('reverseGeocoding', () => {
    it('should return list of PostcodeData for matching lon/lat', async () => {
      // given
      const lon = -1.492787
      const lat = 54.961017

      // when
      const postcodeDataList = await postcodesIO.reverseGeocoding(lon, lat, { limit: 2 })

      // then
      expect(postcodeDataList).toEqual([
        {
          "postcode": "NE32 5YQ",
          "quality": 1,
          "eastings": 432576,
          "northings": 563049,
          "country": "England",
          "nhs_ha": "North East",
          "longitude": -1.492787,
          "latitude": 54.961017,
          "european_electoral_region": "North East",
          "primary_care_trust": "South Tyneside",
          "region": "North East",
          "lsoa": "South Tyneside 017C",
          "msoa": "South Tyneside 017",
          "incode": "5YQ",
          "outcode": "NE32",
          "parliamentary_constituency": "Jarrow",
          "admin_district": "South Tyneside",
          "parish": "South Tyneside, unparished area",
          "admin_county": null,
          "date_of_introduction": "198001",
          "admin_ward": "Primrose",
          "ced": null,
          "ccg": "NHS North East and North Cumbria",
          "nuts": "Tyneside",
          "pfa": "Northumbria",
          "codes": {
            "admin_district": "E08000023",
            "admin_county": "E99999999",
            "admin_ward": "E05001147",
            "parish": "E43000177",
            "parliamentary_constituency": "E14000765",
            "ccg": "E38000163",
            "ccg_id": "00N",
            "ced": "E99999999",
            "nuts": "TLC22",
            "lsoa": "E01008659",
            "msoa": "E02001784",
            "lau2": "E08000023",
            "pfa": "E23000007"
          },
          "distance": 0
        },
        {
          "postcode": "NE32 5YJ",
          "quality": 1,
          "eastings": 432548,
          "northings": 563131,
          "country": "England",
          "nhs_ha": "North East",
          "longitude": -1.493215,
          "latitude": 54.961755,
          "european_electoral_region": "North East",
          "primary_care_trust": "South Tyneside",
          "region": "North East",
          "lsoa": "South Tyneside 017C",
          "msoa": "South Tyneside 017",
          "incode": "5YJ",
          "outcode": "NE32",
          "parliamentary_constituency": "Jarrow",
          "admin_district": "South Tyneside",
          "parish": "South Tyneside, unparished area",
          "admin_county": null,
          "date_of_introduction": "198001",
          "admin_ward": "Primrose",
          "ced": null,
          "ccg": "NHS North East and North Cumbria",
          "nuts": "Tyneside",
          "pfa": "Northumbria",
          "codes": {
            "admin_district": "E08000023",
            "admin_county": "E99999999",
            "admin_ward": "E05001147",
            "parish": "E43000177",
            "parliamentary_constituency": "E14000765",
            "ccg": "E38000163",
            "ccg_id": "00N",
            "ced": "E99999999",
            "nuts": "TLC22",
            "lsoa": "E01008659",
            "msoa": "E02001784",
            "lau2": "E08000023",
            "pfa": "E23000007"
          },
          "distance": 86.6098902
        }
      ])
    })
  })

  describe('postcodeQuery', () => {
    it('should return list of PostcodeData for matching query', async () => {
      // given
      const query = 'KT3'

      // when
      const postcodeDataList = await postcodesIO.postcodeQuery(query, { limit: 2 })

      // then
      expect(postcodeDataList).toEqual([
        {
          "postcode": "KT3 3AA",
          "quality": 1,
          "eastings": 521192,
          "northings": 168528,
          "country": "England",
          "nhs_ha": "London",
          "longitude": -0.259097,
          "latitude": 51.402843,
          "european_electoral_region": "London",
          "primary_care_trust": "Kingston",
          "region": "London",
          "lsoa": "Kingston upon Thames 007B",
          "msoa": "Kingston upon Thames 007",
          "incode": "3AA",
          "outcode": "KT3",
          "parliamentary_constituency": "Kingston and Surbiton",
          "admin_district": "Kingston upon Thames",
          "parish": "Kingston upon Thames, unparished area",
          "admin_county": null,
          "date_of_introduction": "198001",
          "admin_ward": "New Malden Village",
          "ced": null,
          "ccg": "NHS South West London",
          "nuts": "Merton, Kingston upon Thames and Sutton",
          "pfa": "Metropolitan Police",
          "codes": {
            "admin_district": "E09000021",
            "admin_county": "E99999999",
            "admin_ward": "E05013940",
            "parish": "E43000211",
            "parliamentary_constituency": "E14000770",
            "ccg": "E38000245",
            "ccg_id": "36L",
            "ced": "E99999999",
            "nuts": "TLI63",
            "lsoa": "E01002930",
            "msoa": "E02000604",
            "lau2": "E09000021",
            "pfa": "E23000001"
          }
        },
        {
          "postcode": "KT3 3AB",
          "quality": 1,
          "eastings": 521206,
          "northings": 168537,
          "country": "England",
          "nhs_ha": "London",
          "longitude": -0.258916,
          "latitude": 51.402921,
          "european_electoral_region": "London",
          "primary_care_trust": "Kingston",
          "region": "London",
          "lsoa": "Kingston upon Thames 007B",
          "msoa": "Kingston upon Thames 007",
          "incode": "3AB",
          "outcode": "KT3",
          "parliamentary_constituency": "Kingston and Surbiton",
          "admin_district": "Kingston upon Thames",
          "parish": "Kingston upon Thames, unparished area",
          "admin_county": null,
          "date_of_introduction": "199806",
          "admin_ward": "New Malden Village",
          "ced": null,
          "ccg": "NHS South West London",
          "nuts": "Merton, Kingston upon Thames and Sutton",
          "pfa": "Metropolitan Police",
          "codes": {
            "admin_district": "E09000021",
            "admin_county": "E99999999",
            "admin_ward": "E05013940",
            "parish": "E43000211",
            "parliamentary_constituency": "E14000770",
            "ccg": "E38000245",
            "ccg_id": "36L",
            "ced": "E99999999",
            "nuts": "TLI63",
            "lsoa": "E01002930",
            "msoa": "E02000604",
            "lau2": "E09000021",
            "pfa": "E23000001"
          }
        }
      ])
    })
  })

  describe('bulkPostcodeLookup', () => {
    it('should return list of PostcodeData for list of postcodes', async () => {
      // given
      const postcodes = ['BD6 3PS', 'NE32 5YQ']

      // when
      const postcodeDataList = await postcodesIO.bulkPostcodeLookup(postcodes)

      // then
      expect(postcodeDataList).toEqual([
        {
            "query": "BD6 3PS",
            "result": {
                "postcode": "BD6 3PS",
                "quality": 1,
                "eastings": 414064,
                "northings": 429870,
                "country": "England",
                "nhs_ha": "Yorkshire and the Humber",
                "longitude": -1.788133,
                "latitude": 53.765008,
                "european_electoral_region": "Yorkshire and The Humber",
                "primary_care_trust": "Bradford and Airedale Teaching",
                "region": "Yorkshire and The Humber",
                "lsoa": "Bradford 055E",
                "msoa": "Bradford 055",
                "incode": "3PS",
                "outcode": "BD6",
                "parliamentary_constituency": "Bradford South",
                "admin_district": "Bradford",
                "parish": "Bradford, unparished area",
                "admin_county": null,
                "date_of_introduction": "198001",
                "admin_ward": "Royds",
                "ced": null,
                "ccg": "NHS West Yorkshire",
                "nuts": "Bradford",
                "pfa": "West Yorkshire",
                "codes": {
                    "admin_district": "E08000032",
                    "admin_county": "E99999999",
                    "admin_ward": "E05001361",
                    "parish": "E43000274",
                    "parliamentary_constituency": "E14000588",
                    "ccg": "E38000232",
                    "ccg_id": "36J",
                    "ced": "E99999999",
                    "nuts": "TLE41",
                    "lsoa": "E01010846",
                    "msoa": "E02002237",
                    "lau2": "E08000032",
                    "pfa": "E23000010"
                }
            }
        },
        {
            "query": "NE32 5YQ",
            "result": {
                "postcode": "NE32 5YQ",
                "quality": 1,
                "eastings": 432576,
                "northings": 563049,
                "country": "England",
                "nhs_ha": "North East",
                "longitude": -1.492787,
                "latitude": 54.961017,
                "european_electoral_region": "North East",
                "primary_care_trust": "South Tyneside",
                "region": "North East",
                "lsoa": "South Tyneside 017C",
                "msoa": "South Tyneside 017",
                "incode": "5YQ",
                "outcode": "NE32",
                "parliamentary_constituency": "Jarrow",
                "admin_district": "South Tyneside",
                "parish": "South Tyneside, unparished area",
                "admin_county": null,
                "date_of_introduction": "198001",
                "admin_ward": "Primrose",
                "ced": null,
                "ccg": "NHS North East and North Cumbria",
                "nuts": "Tyneside",
                "pfa": "Northumbria",
                "codes": {
                    "admin_district": "E08000023",
                    "admin_county": "E99999999",
                    "admin_ward": "E05001147",
                    "parish": "E43000177",
                    "parliamentary_constituency": "E14000765",
                    "ccg": "E38000163",
                    "ccg_id": "00N",
                    "ced": "E99999999",
                    "nuts": "TLC22",
                    "lsoa": "E01008659",
                    "msoa": "E02001784",
                    "lau2": "E08000023",
                    "pfa": "E23000007"
                }
            }
        }
      ])
    })

    it('should return empty list for empty list of postcodes', async () => {
      // given
      const postcodes: string[] = []

      // when
      const postcodeDataList = await postcodesIO.bulkPostcodeLookup(postcodes)

      // then
      expect(postcodeDataList).toEqual([])
    })

    it('should return null for invalid postcode', async () => {
      // given
      const postcodes = ['Plop']

      // when
      const postcodeDataList = await postcodesIO.bulkPostcodeLookup(postcodes)

      // then
      expect(postcodeDataList).toEqual([
        {
          query: 'Plop',
          result: null,
        },
      ])
    })
  })

  describe('bulkReverseGeocoding', () => {
    it('should return list of PostcodeData for list of geolocations', async () => {
      // given
      const geolocations = [
        {
          longitude: 0.629834723775309,
          latitude: 51.7923246977375
        },
        {
          longitude: -2.49690382054704,
          latitude: 53.5351312861402,
          radius: 1000,
          limit: 5
        }
      ]

      // when
      const postcodeDataList = await postcodesIO.bulkReverseGeocoding(geolocations)

      // then
      expect(postcodeDataList).toEqual([
        {
            "query": {
                "longitude": 0.629834723775309,
                "latitude": 51.7923246977375
            },
            "result": [
                {
                    "postcode": "CM8 1EF",
                    "quality": 1,
                    "eastings": 581459,
                    "northings": 213679,
                    "country": "England",
                    "nhs_ha": "East of England",
                    "longitude": 0.629806,
                    "latitude": 51.792326,
                    "european_electoral_region": "Eastern",
                    "primary_care_trust": "Mid Essex",
                    "region": "East of England",
                    "lsoa": "Braintree 017F",
                    "msoa": "Braintree 017",
                    "incode": "1EF",
                    "outcode": "CM8",
                    "parliamentary_constituency": "Witham",
                    "admin_district": "Braintree",
                    "parish": "Witham",
                    "admin_county": "Essex",
                    "date_of_introduction": "198001",
                    "admin_ward": "Witham South",
                    "ced": "Witham Southern",
                    "ccg": "NHS Mid and South Essex",
                    "nuts": "Essex Haven Gateway",
                    "pfa": "Essex",
                    "codes": {
                        "admin_district": "E07000067",
                        "admin_county": "E10000012",
                        "admin_ward": "E05010388",
                        "parish": "E04012935",
                        "parliamentary_constituency": "E14001045",
                        "ccg": "E38000106",
                        "ccg_id": "06Q",
                        "ced": "E58000470",
                        "nuts": "TLH34",
                        "lsoa": "E01033460",
                        "msoa": "E02004462",
                        "lau2": "E07000067",
                        "pfa": "E23000028"
                    },
                    "distance": 1.98709706
                },
                {
                    "postcode": "CM8 1EU",
                    "quality": 1,
                    "eastings": 581508,
                    "northings": 213652,
                    "country": "England",
                    "nhs_ha": "East of England",
                    "longitude": 0.630501,
                    "latitude": 51.792068,
                    "european_electoral_region": "Eastern",
                    "primary_care_trust": "Mid Essex",
                    "region": "East of England",
                    "lsoa": "Braintree 017F",
                    "msoa": "Braintree 017",
                    "incode": "1EU",
                    "outcode": "CM8",
                    "parliamentary_constituency": "Witham",
                    "admin_district": "Braintree",
                    "parish": "Witham",
                    "admin_county": "Essex",
                    "date_of_introduction": "198001",
                    "admin_ward": "Witham South",
                    "ced": "Witham Southern",
                    "ccg": "NHS Mid and South Essex",
                    "nuts": "Essex Haven Gateway",
                    "pfa": "Essex",
                    "codes": {
                        "admin_district": "E07000067",
                        "admin_county": "E10000012",
                        "admin_ward": "E05010388",
                        "parish": "E04012935",
                        "parliamentary_constituency": "E14001045",
                        "ccg": "E38000106",
                        "ccg_id": "06Q",
                        "ced": "E58000470",
                        "nuts": "TLH34",
                        "lsoa": "E01033460",
                        "msoa": "E02004462",
                        "lau2": "E07000067",
                        "pfa": "E23000028"
                    },
                    "distance": 54.12009472
                },
                {
                    "postcode": "CM8 1PH",
                    "quality": 1,
                    "eastings": 581421,
                    "northings": 213740,
                    "country": "England",
                    "nhs_ha": "East of England",
                    "longitude": 0.629287,
                    "latitude": 51.792887,
                    "european_electoral_region": "Eastern",
                    "primary_care_trust": "Mid Essex",
                    "region": "East of England",
                    "lsoa": "Braintree 017H",
                    "msoa": "Braintree 017",
                    "incode": "1PH",
                    "outcode": "CM8",
                    "parliamentary_constituency": "Witham",
                    "admin_district": "Braintree",
                    "parish": "Witham",
                    "admin_county": "Essex",
                    "date_of_introduction": "198001",
                    "admin_ward": "Witham Central",
                    "ced": "Witham Southern",
                    "ccg": "NHS Mid and South Essex",
                    "nuts": "Essex Haven Gateway",
                    "pfa": "Essex",
                    "codes": {
                        "admin_district": "E07000067",
                        "admin_county": "E10000012",
                        "admin_ward": "E05012966",
                        "parish": "E04012935",
                        "parliamentary_constituency": "E14001045",
                        "ccg": "E38000106",
                        "ccg_id": "06Q",
                        "ced": "E58000470",
                        "nuts": "TLH34",
                        "lsoa": "E01033462",
                        "msoa": "E02004462",
                        "lau2": "E07000067",
                        "pfa": "E23000028"
                    },
                    "distance": 73.09110168
                },
                {
                    "postcode": "CM8 1PQ",
                    "quality": 1,
                    "eastings": 581399,
                    "northings": 213755,
                    "country": "England",
                    "nhs_ha": "East of England",
                    "longitude": 0.628977,
                    "latitude": 51.793028,
                    "european_electoral_region": "Eastern",
                    "primary_care_trust": "Mid Essex",
                    "region": "East of England",
                    "lsoa": "Braintree 017H",
                    "msoa": "Braintree 017",
                    "incode": "1PQ",
                    "outcode": "CM8",
                    "parliamentary_constituency": "Witham",
                    "admin_district": "Braintree",
                    "parish": "Witham",
                    "admin_county": "Essex",
                    "date_of_introduction": "198001",
                    "admin_ward": "Witham Central",
                    "ced": "Witham Southern",
                    "ccg": "NHS Mid and South Essex",
                    "nuts": "Essex Haven Gateway",
                    "pfa": "Essex",
                    "codes": {
                        "admin_district": "E07000067",
                        "admin_county": "E10000012",
                        "admin_ward": "E05012966",
                        "parish": "E04012935",
                        "parliamentary_constituency": "E14001045",
                        "ccg": "E38000106",
                        "ccg_id": "06Q",
                        "ced": "E58000470",
                        "nuts": "TLH34",
                        "lsoa": "E01033462",
                        "msoa": "E02004462",
                        "lau2": "E07000067",
                        "pfa": "E23000028"
                    },
                    "distance": 98.10933201
                }
            ]
        },
        {
            "query": {
                "longitude": -2.49690382054704,
                "latitude": 53.5351312861402,
                "radius": 1000,
                "limit": 5
            },
            "result": [
                {
                    "postcode": "M46 9WU",
                    "quality": 1,
                    "eastings": 367163,
                    "northings": 404390,
                    "country": "England",
                    "nhs_ha": "North West",
                    "longitude": -2.496903,
                    "latitude": 53.535127,
                    "european_electoral_region": "North West",
                    "primary_care_trust": "Ashton, Leigh and Wigan",
                    "region": "North West",
                    "lsoa": "Wigan 017C",
                    "msoa": "Wigan 017",
                    "incode": "9WU",
                    "outcode": "M46",
                    "parliamentary_constituency": "Bolton West",
                    "admin_district": "Wigan",
                    "parish": "Wigan, unparished area",
                    "admin_county": null,
                    "date_of_introduction": "199405",
                    "admin_ward": "Atherton",
                    "ced": null,
                    "ccg": "NHS Greater Manchester",
                    "nuts": "Greater Manchester North West",
                    "pfa": "Greater Manchester",
                    "codes": {
                        "admin_district": "E08000010",
                        "admin_county": "E99999999",
                        "admin_ward": "E05000845",
                        "parish": "E43000164",
                        "parliamentary_constituency": "E14000580",
                        "ccg": "E38000205",
                        "ccg_id": "02H",
                        "ced": "E99999999",
                        "nuts": "TLD36",
                        "lsoa": "E01006241",
                        "msoa": "E02001303",
                        "lau2": "E08000010",
                        "pfa": "E23000005"
                    },
                    "distance": 0.4801241
                },
                {
                    "postcode": "M46 9XF",
                    "quality": 1,
                    "eastings": 367155,
                    "northings": 404364,
                    "country": "England",
                    "nhs_ha": "North West",
                    "longitude": -2.497021,
                    "latitude": 53.534893,
                    "european_electoral_region": "North West",
                    "primary_care_trust": "Ashton, Leigh and Wigan",
                    "region": "North West",
                    "lsoa": "Wigan 017B",
                    "msoa": "Wigan 017",
                    "incode": "9XF",
                    "outcode": "M46",
                    "parliamentary_constituency": "Bolton West",
                    "admin_district": "Wigan",
                    "parish": "Wigan, unparished area",
                    "admin_county": null,
                    "date_of_introduction": "199405",
                    "admin_ward": "Atherton",
                    "ced": null,
                    "ccg": "NHS Greater Manchester",
                    "nuts": "Greater Manchester North West",
                    "pfa": "Greater Manchester",
                    "codes": {
                        "admin_district": "E08000010",
                        "admin_county": "E99999999",
                        "admin_ward": "E05000845",
                        "parish": "E43000164",
                        "parliamentary_constituency": "E14000580",
                        "ccg": "E38000205",
                        "ccg_id": "02H",
                        "ced": "E99999999",
                        "nuts": "TLD36",
                        "lsoa": "E01006240",
                        "msoa": "E02001303",
                        "lau2": "E08000010",
                        "pfa": "E23000005"
                    },
                    "distance": 27.6350374
                },
                {
                    "postcode": "M46 9XE",
                    "quality": 1,
                    "eastings": 367212,
                    "northings": 404330,
                    "country": "England",
                    "nhs_ha": "North West",
                    "longitude": -2.496158,
                    "latitude": 53.534608,
                    "european_electoral_region": "North West",
                    "primary_care_trust": "Ashton, Leigh and Wigan",
                    "region": "North West",
                    "lsoa": "Wigan 017C",
                    "msoa": "Wigan 017",
                    "incode": "9XE",
                    "outcode": "M46",
                    "parliamentary_constituency": "Bolton West",
                    "admin_district": "Wigan",
                    "parish": "Wigan, unparished area",
                    "admin_county": null,
                    "date_of_introduction": "199405",
                    "admin_ward": "Atherton",
                    "ced": null,
                    "ccg": "NHS Greater Manchester",
                    "nuts": "Greater Manchester North West",
                    "pfa": "Greater Manchester",
                    "codes": {
                        "admin_district": "E08000010",
                        "admin_county": "E99999999",
                        "admin_ward": "E05000845",
                        "parish": "E43000164",
                        "parliamentary_constituency": "E14000580",
                        "ccg": "E38000205",
                        "ccg_id": "02H",
                        "ced": "E99999999",
                        "nuts": "TLD36",
                        "lsoa": "E01006241",
                        "msoa": "E02001303",
                        "lau2": "E08000010",
                        "pfa": "E23000005"
                    },
                    "distance": 76.40229254
                },
                {
                    "postcode": "M46 9NX",
                    "quality": 1,
                    "eastings": 367245,
                    "northings": 404384,
                    "country": "England",
                    "nhs_ha": "North West",
                    "longitude": -2.495666,
                    "latitude": 53.535078,
                    "european_electoral_region": "North West",
                    "primary_care_trust": "Ashton, Leigh and Wigan",
                    "region": "North West",
                    "lsoa": "Wigan 017C",
                    "msoa": "Wigan 017",
                    "incode": "9NX",
                    "outcode": "M46",
                    "parliamentary_constituency": "Bolton West",
                    "admin_district": "Wigan",
                    "parish": "Wigan, unparished area",
                    "admin_county": null,
                    "date_of_introduction": "199405",
                    "admin_ward": "Atherton",
                    "ced": null,
                    "ccg": "NHS Greater Manchester",
                    "nuts": "Greater Manchester North West",
                    "pfa": "Greater Manchester",
                    "codes": {
                        "admin_district": "E08000010",
                        "admin_county": "E99999999",
                        "admin_ward": "E05000845",
                        "parish": "E43000164",
                        "parliamentary_constituency": "E14000580",
                        "ccg": "E38000205",
                        "ccg_id": "02H",
                        "ced": "E99999999",
                        "nuts": "TLD36",
                        "lsoa": "E01006241",
                        "msoa": "E02001303",
                        "lau2": "E08000010",
                        "pfa": "E23000005"
                    },
                    "distance": 82.28672453
                },
                {
                    "postcode": "M46 9NU",
                    "quality": 1,
                    "eastings": 367171,
                    "northings": 404476,
                    "country": "England",
                    "nhs_ha": "North West",
                    "longitude": -2.496792,
                    "latitude": 53.535901,
                    "european_electoral_region": "North West",
                    "primary_care_trust": "Ashton, Leigh and Wigan",
                    "region": "North West",
                    "lsoa": "Wigan 017C",
                    "msoa": "Wigan 017",
                    "incode": "9NU",
                    "outcode": "M46",
                    "parliamentary_constituency": "Bolton West",
                    "admin_district": "Wigan",
                    "parish": "Wigan, unparished area",
                    "admin_county": null,
                    "date_of_introduction": "199405",
                    "admin_ward": "Atherton",
                    "ced": null,
                    "ccg": "NHS Greater Manchester",
                    "nuts": "Greater Manchester North West",
                    "pfa": "Greater Manchester",
                    "codes": {
                        "admin_district": "E08000010",
                        "admin_county": "E99999999",
                        "admin_ward": "E05000845",
                        "parish": "E43000164",
                        "parliamentary_constituency": "E14000580",
                        "ccg": "E38000205",
                        "ccg_id": "02H",
                        "ced": "E99999999",
                        "nuts": "TLD36",
                        "lsoa": "E01006241",
                        "msoa": "E02001303",
                        "lau2": "E08000010",
                        "pfa": "E23000005"
                    },
                    "distance": 85.98655766
                }
            ]
        }
      ])
    })

    it('should return empty list for empty list of geolocations', async () => {
      // given
      const geolocations: Api.Geolocation[] = []

      // when
      const postcodeDataList = await postcodesIO.bulkReverseGeocoding(geolocations)

      // then
      expect(postcodeDataList).toEqual([])
    })
  })

  describe('postcodeLookup', () => {
    it('should return PostcodeData for valid postcode', async () => {
      // given
      const postcode = 'AB15 6DH'

      // when
      const postcodeData = await postcodesIO.postcodeLookup(postcode)

      // then
      expect(postcodeData).toEqual({
        "postcode": "AB15 6DH",
        "quality": 1,
        "eastings": 391109,
        "northings": 805979,
        "country": "Scotland",
        "nhs_ha": "Grampian",
        "longitude": -2.148567,
        "latitude": 57.1446,
        "european_electoral_region": "Scotland",
        "primary_care_trust": "Aberdeen City Community Health Partnership",
        "region": null,
        "lsoa": "Hazlehead - 03",
        "msoa": "Hazlehead",
        "incode": "6DH",
        "outcode": "AB15",
        "parliamentary_constituency": "Aberdeen South",
        "admin_district": "Aberdeen City",
        "parish": null,
        "admin_county": null,
        "date_of_introduction": "199606",
        "admin_ward": "Hazlehead/Queens Cross/Countesswells",
        "ced": null,
        "ccg": "Aberdeen City Community Health Partnership",
        "nuts": "Aberdeen City and Aberdeenshire",
        "pfa": "Scotland",
        "codes": {
            "admin_district": "S12000033",
            "admin_county": "S99999999",
            "admin_ward": "S13002844",
            "parish": "S99999999",
            "parliamentary_constituency": "S14000002",
            "ccg": "S03000012",
            "ccg_id": "012",
            "ced": "S99999999",
            "nuts": "TLM50",
            "lsoa": "S01006549",
            "msoa": "S02001243",
            "lau2": "S30000026",
            "pfa": "S23000009"
        }
      })
    })

    it('should return undefined for invalid postcode', async () => {
      // given
      const postcode = 'Plop'

      // when
      const postcodeData = await postcodesIO.postcodeLookup(postcode)

      // then
      expect(postcodeData).toBeUndefined()
    })
  })
})
