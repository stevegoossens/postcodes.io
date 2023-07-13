// eslint-disable-next-line node/no-unpublished-import
import {afterEach, beforeEach, describe, expect, it} from '@jest/globals';
// eslint-disable-next-line node/no-unpublished-import
import nock from 'nock';

import '../../helpers/custom-expect-matchers/toBePostcodeData';
import {PostcodesApi} from '../../../src/openapi';

describe('PostcodesApi', () => {
  let basePath: string;
  let postcodesApi: PostcodesApi;

  beforeEach(() => {
    basePath = 'https://api.postcodes.io';
    postcodesApi = new PostcodesApi();
  });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
  });

  it('should use different API hostname when specified', async () => {
    // given
    basePath = 'http://plop.plop';
    postcodesApi = new PostcodesApi({basePath});
    const lon = -1.492787;
    const lat = 54.961017;
    const scope = nock(basePath)
      .get(`/postcodes?lon=${lon}&lat=${lat}&limit=2`)
      .reply(200, {
        status: 200,
        result: [
          {
            postcode: 'NE32 5YQ Plop',
            quality: 1,
            eastings: 432576,
            northings: 563049,
            country: 'England',
            nhs_ha: 'North East',
            longitude: -1.492787,
            latitude: 54.961017,
            european_electoral_region: 'North East',
            primary_care_trust: 'South Tyneside',
            region: 'North East',
            lsoa: 'South Tyneside 017C',
            msoa: 'South Tyneside 017',
            incode: '5YQ',
            outcode: 'NE32',
            parliamentary_constituency: 'Jarrow',
            admin_district: 'South Tyneside',
            parish: 'South Tyneside, unparished area',
            admin_county: null,
            date_of_introduction: '198001',
            admin_ward: 'Primrose',
            ced: null,
            ccg: 'NHS North East and North Cumbria',
            nuts: 'Tyneside',
            pfa: 'Northumbria',
            codes: {
              admin_district: 'E08000023',
              admin_county: 'E99999999',
              admin_ward: 'E05001147',
              parish: 'E43000177',
              parliamentary_constituency: 'E14000765',
              ccg: 'E38000163',
              ccg_id: '00N',
              ced: 'E99999999',
              nuts: 'TLC22',
              lsoa: 'E01008659',
              msoa: 'E02001784',
              lau2: 'E08000023',
              pfa: 'E23000007',
            },
            distance: 0,
          },
          {
            postcode: 'NE32 5YJ',
            quality: 1,
            eastings: 432548,
            northings: 563131,
            country: 'England',
            nhs_ha: 'North East',
            longitude: -1.493215,
            latitude: 54.961755,
            european_electoral_region: 'North East',
            primary_care_trust: 'South Tyneside',
            region: 'North East',
            lsoa: 'South Tyneside 017C',
            msoa: 'South Tyneside 017',
            incode: '5YJ',
            outcode: 'NE32',
            parliamentary_constituency: 'Jarrow',
            admin_district: 'South Tyneside',
            parish: 'South Tyneside, unparished area',
            admin_county: null,
            date_of_introduction: '198001',
            admin_ward: 'Primrose',
            ced: null,
            ccg: 'NHS North East and North Cumbria',
            nuts: 'Tyneside',
            pfa: 'Northumbria',
            codes: {
              admin_district: 'E08000023',
              admin_county: 'E99999999',
              admin_ward: 'E05001147',
              parish: 'E43000177',
              parliamentary_constituency: 'E14000765',
              ccg: 'E38000163',
              ccg_id: '00N',
              ced: 'E99999999',
              nuts: 'TLC22',
              lsoa: 'E01008659',
              msoa: 'E02001784',
              lau2: 'E08000023',
              pfa: 'E23000007',
            },
            distance: 86.6098902,
          },
        ],
      });

    // when
    const response = postcodesApi.reverseGeocodingOrPostcodeQuery({
      lon,
      lat,
      limit: 2,
    });

    // then
    await expect(response).resolves.toEqual({
      status: 200,
      contentType: 'application/json',
      body: {
        status: 200,
        result: [
          {
            postcode: 'NE32 5YQ Plop',
            quality: 1,
            eastings: 432576,
            northings: 563049,
            country: 'England',
            nhs_ha: 'North East',
            longitude: -1.492787,
            latitude: 54.961017,
            european_electoral_region: 'North East',
            primary_care_trust: 'South Tyneside',
            region: 'North East',
            lsoa: 'South Tyneside 017C',
            msoa: 'South Tyneside 017',
            incode: '5YQ',
            outcode: 'NE32',
            parliamentary_constituency: 'Jarrow',
            admin_district: 'South Tyneside',
            parish: 'South Tyneside, unparished area',
            admin_county: null,
            date_of_introduction: '198001',
            admin_ward: 'Primrose',
            ced: null,
            ccg: 'NHS North East and North Cumbria',
            nuts: 'Tyneside',
            pfa: 'Northumbria',
            codes: {
              admin_district: 'E08000023',
              admin_county: 'E99999999',
              admin_ward: 'E05001147',
              parish: 'E43000177',
              parliamentary_constituency: 'E14000765',
              ccg: 'E38000163',
              ccg_id: '00N',
              ced: 'E99999999',
              nuts: 'TLC22',
              lsoa: 'E01008659',
              msoa: 'E02001784',
              lau2: 'E08000023',
              pfa: 'E23000007',
            },
            distance: 0,
          },
          {
            postcode: 'NE32 5YJ',
            quality: 1,
            eastings: 432548,
            northings: 563131,
            country: 'England',
            nhs_ha: 'North East',
            longitude: -1.493215,
            latitude: 54.961755,
            european_electoral_region: 'North East',
            primary_care_trust: 'South Tyneside',
            region: 'North East',
            lsoa: 'South Tyneside 017C',
            msoa: 'South Tyneside 017',
            incode: '5YJ',
            outcode: 'NE32',
            parliamentary_constituency: 'Jarrow',
            admin_district: 'South Tyneside',
            parish: 'South Tyneside, unparished area',
            admin_county: null,
            date_of_introduction: '198001',
            admin_ward: 'Primrose',
            ced: null,
            ccg: 'NHS North East and North Cumbria',
            nuts: 'Tyneside',
            pfa: 'Northumbria',
            codes: {
              admin_district: 'E08000023',
              admin_county: 'E99999999',
              admin_ward: 'E05001147',
              parish: 'E43000177',
              parliamentary_constituency: 'E14000765',
              ccg: 'E38000163',
              ccg_id: '00N',
              ced: 'E99999999',
              nuts: 'TLC22',
              lsoa: 'E01008659',
              msoa: 'E02001784',
              lau2: 'E08000023',
              pfa: 'E23000007',
            },
            distance: 86.6098902,
          },
        ],
      },
    });
    expect(scope.isDone()).toBeTruthy();
  });

  it('should use default API hostname when optional config is missing basePath', async () => {
    // given
    postcodesApi = new PostcodesApi({});
    const lon = -1.492787;
    const lat = 54.961017;
    const scope = nock(basePath)
      .get(`/postcodes?lon=${lon}&lat=${lat}&limit=2`)
      .reply(200, {
        status: 200,
        result: [
          {
            postcode: 'NE32 5YQ Plop',
            quality: 1,
            eastings: 432576,
            northings: 563049,
            country: 'England',
            nhs_ha: 'North East',
            longitude: -1.492787,
            latitude: 54.961017,
            european_electoral_region: 'North East',
            primary_care_trust: 'South Tyneside',
            region: 'North East',
            lsoa: 'South Tyneside 017C',
            msoa: 'South Tyneside 017',
            incode: '5YQ',
            outcode: 'NE32',
            parliamentary_constituency: 'Jarrow',
            admin_district: 'South Tyneside',
            parish: 'South Tyneside, unparished area',
            admin_county: null,
            date_of_introduction: '198001',
            admin_ward: 'Primrose',
            ced: null,
            ccg: 'NHS North East and North Cumbria',
            nuts: 'Tyneside',
            pfa: 'Northumbria',
            codes: {
              admin_district: 'E08000023',
              admin_county: 'E99999999',
              admin_ward: 'E05001147',
              parish: 'E43000177',
              parliamentary_constituency: 'E14000765',
              ccg: 'E38000163',
              ccg_id: '00N',
              ced: 'E99999999',
              nuts: 'TLC22',
              lsoa: 'E01008659',
              msoa: 'E02001784',
              lau2: 'E08000023',
              pfa: 'E23000007',
            },
            distance: 0,
          },
          {
            postcode: 'NE32 5YJ',
            quality: 1,
            eastings: 432548,
            northings: 563131,
            country: 'England',
            nhs_ha: 'North East',
            longitude: -1.493215,
            latitude: 54.961755,
            european_electoral_region: 'North East',
            primary_care_trust: 'South Tyneside',
            region: 'North East',
            lsoa: 'South Tyneside 017C',
            msoa: 'South Tyneside 017',
            incode: '5YJ',
            outcode: 'NE32',
            parliamentary_constituency: 'Jarrow',
            admin_district: 'South Tyneside',
            parish: 'South Tyneside, unparished area',
            admin_county: null,
            date_of_introduction: '198001',
            admin_ward: 'Primrose',
            ced: null,
            ccg: 'NHS North East and North Cumbria',
            nuts: 'Tyneside',
            pfa: 'Northumbria',
            codes: {
              admin_district: 'E08000023',
              admin_county: 'E99999999',
              admin_ward: 'E05001147',
              parish: 'E43000177',
              parliamentary_constituency: 'E14000765',
              ccg: 'E38000163',
              ccg_id: '00N',
              ced: 'E99999999',
              nuts: 'TLC22',
              lsoa: 'E01008659',
              msoa: 'E02001784',
              lau2: 'E08000023',
              pfa: 'E23000007',
            },
            distance: 86.6098902,
          },
        ],
      });

    // when
    const response = postcodesApi.reverseGeocodingOrPostcodeQuery({
      lon,
      lat,
      limit: 2,
    });

    // then
    await expect(response).resolves.toEqual({
      status: 200,
      contentType: 'application/json',
      body: {
        status: 200,
        result: [
          {
            postcode: 'NE32 5YQ Plop',
            quality: 1,
            eastings: 432576,
            northings: 563049,
            country: 'England',
            nhs_ha: 'North East',
            longitude: -1.492787,
            latitude: 54.961017,
            european_electoral_region: 'North East',
            primary_care_trust: 'South Tyneside',
            region: 'North East',
            lsoa: 'South Tyneside 017C',
            msoa: 'South Tyneside 017',
            incode: '5YQ',
            outcode: 'NE32',
            parliamentary_constituency: 'Jarrow',
            admin_district: 'South Tyneside',
            parish: 'South Tyneside, unparished area',
            admin_county: null,
            date_of_introduction: '198001',
            admin_ward: 'Primrose',
            ced: null,
            ccg: 'NHS North East and North Cumbria',
            nuts: 'Tyneside',
            pfa: 'Northumbria',
            codes: {
              admin_district: 'E08000023',
              admin_county: 'E99999999',
              admin_ward: 'E05001147',
              parish: 'E43000177',
              parliamentary_constituency: 'E14000765',
              ccg: 'E38000163',
              ccg_id: '00N',
              ced: 'E99999999',
              nuts: 'TLC22',
              lsoa: 'E01008659',
              msoa: 'E02001784',
              lau2: 'E08000023',
              pfa: 'E23000007',
            },
            distance: 0,
          },
          {
            postcode: 'NE32 5YJ',
            quality: 1,
            eastings: 432548,
            northings: 563131,
            country: 'England',
            nhs_ha: 'North East',
            longitude: -1.493215,
            latitude: 54.961755,
            european_electoral_region: 'North East',
            primary_care_trust: 'South Tyneside',
            region: 'North East',
            lsoa: 'South Tyneside 017C',
            msoa: 'South Tyneside 017',
            incode: '5YJ',
            outcode: 'NE32',
            parliamentary_constituency: 'Jarrow',
            admin_district: 'South Tyneside',
            parish: 'South Tyneside, unparished area',
            admin_county: null,
            date_of_introduction: '198001',
            admin_ward: 'Primrose',
            ced: null,
            ccg: 'NHS North East and North Cumbria',
            nuts: 'Tyneside',
            pfa: 'Northumbria',
            codes: {
              admin_district: 'E08000023',
              admin_county: 'E99999999',
              admin_ward: 'E05001147',
              parish: 'E43000177',
              parliamentary_constituency: 'E14000765',
              ccg: 'E38000163',
              ccg_id: '00N',
              ced: 'E99999999',
              nuts: 'TLC22',
              lsoa: 'E01008659',
              msoa: 'E02001784',
              lau2: 'E08000023',
              pfa: 'E23000007',
            },
            distance: 86.6098902,
          },
        ],
      },
    });
    expect(scope.isDone()).toBeTruthy();
  });

  describe('randomPostcode', () => {
    it('should return PostcodeData', async () => {
      // given
      const scope = nock(basePath)
        .get('/random/postcodes')
        .reply(200, {
          status: 200,
          result: {
            postcode: 'BD6 1DB',
            quality: 1,
            eastings: 415881,
            northings: 429882,
            country: 'England',
            nhs_ha: 'Yorkshire and the Humber',
            longitude: -1.760567,
            latitude: 53.765049,
            european_electoral_region: 'Yorkshire and The Humber',
            primary_care_trust: 'Bradford and Airedale Teaching',
            region: 'Yorkshire and The Humber',
            lsoa: 'Bradford 060A',
            msoa: 'Bradford 060',
            incode: '1DB',
            outcode: 'BD6',
            parliamentary_constituency: 'Bradford South',
            admin_district: 'Bradford',
            parish: 'Bradford, unparished area',
            admin_county: null,
            date_of_introduction: '198001',
            admin_ward: 'Wibsey',
            ced: null,
            ccg: 'NHS West Yorkshire',
            nuts: 'Bradford',
            pfa: 'West Yorkshire',
            codes: {
              admin_district: 'E08000032',
              admin_county: 'E99999999',
              admin_ward: 'E05001367',
              parish: 'E43000274',
              parliamentary_constituency: 'E14000588',
              ccg: 'E38000232',
              ccg_id: '36J',
              ced: 'E99999999',
              nuts: 'TLE41',
              lsoa: 'E01010746',
              msoa: 'E02002242',
              lau2: 'E08000032',
              pfa: 'E23000010',
            },
          },
        });

      // when
      const response = postcodesApi.randomPostcode(undefined);

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: expect.toBePostcodeData(),
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return PostcodeData for outcode', async () => {
      // given
      const outcode = 'NR7';
      const scope = nock(basePath)
        .get(`/random/postcodes?outcode=${outcode}`)
        .reply(200, {
          status: 200,
          result: {
            postcode: 'NR7 0DT',
            quality: 1,
            eastings: 626103,
            northings: 309334,
            country: 'England',
            nhs_ha: 'East of England',
            longitude: 1.33995,
            latitude: 52.634622,
            european_electoral_region: 'Eastern',
            primary_care_trust: 'Norfolk',
            region: 'East of England',
            lsoa: 'Broadland 015D',
            msoa: 'Broadland 015',
            incode: '0DT',
            outcode: 'NR7',
            parliamentary_constituency: 'Norwich North',
            admin_district: 'Broadland',
            parish: 'Thorpe St. Andrew',
            admin_county: 'Norfolk',
            date_of_introduction: '198001',
            admin_ward: 'Thorpe St. Andrew North West',
            ced: 'Woodside',
            ccg: 'NHS Norfolk and Waveney',
            nuts: 'Norwich and East Norfolk',
            pfa: 'Norfolk',
            codes: {
              admin_district: 'E07000144',
              admin_county: 'E10000020',
              admin_ward: 'E05005781',
              parish: 'E04006256',
              parliamentary_constituency: 'E14000863',
              ccg: 'E38000239',
              ccg_id: '26A',
              ced: 'E58001035',
              nuts: 'TLH15',
              lsoa: 'E01026572',
              msoa: 'E02005534',
              lau2: 'E07000144',
              pfa: 'E23000024',
            },
          },
        });

      // when
      const response = postcodesApi.randomPostcode(outcode);

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: expect.toBePostcodeData(),
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return null for invalid outcode', async () => {
      // given
      const outcode = 'Ploppy';
      const scope = nock(basePath)
        .get(`/random/postcodes?outcode=${outcode}`)
        .reply(200, {
          status: 200,
          result: null,
        });

      // when
      const response = postcodesApi.randomPostcode(outcode);

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: null,
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return PostcodeData for empty string outcode', async () => {
      // given
      const outcode = '';
      const scope = nock(basePath)
        .get(`/random/postcodes?outcode=${outcode}`)
        .reply(200, {
          status: 200,
          result: {
            postcode: 'NR7 0DT',
            quality: 1,
            eastings: 626103,
            northings: 309334,
            country: 'England',
            nhs_ha: 'East of England',
            longitude: 1.33995,
            latitude: 52.634622,
            european_electoral_region: 'Eastern',
            primary_care_trust: 'Norfolk',
            region: 'East of England',
            lsoa: 'Broadland 015D',
            msoa: 'Broadland 015',
            incode: '0DT',
            outcode: 'NR7',
            parliamentary_constituency: 'Norwich North',
            admin_district: 'Broadland',
            parish: 'Thorpe St. Andrew',
            admin_county: 'Norfolk',
            date_of_introduction: '198001',
            admin_ward: 'Thorpe St. Andrew North West',
            ced: 'Woodside',
            ccg: 'NHS Norfolk and Waveney',
            nuts: 'Norwich and East Norfolk',
            pfa: 'Norfolk',
            codes: {
              admin_district: 'E07000144',
              admin_county: 'E10000020',
              admin_ward: 'E05005781',
              parish: 'E04006256',
              parliamentary_constituency: 'E14000863',
              ccg: 'E38000239',
              ccg_id: '26A',
              ced: 'E58001035',
              nuts: 'TLH15',
              lsoa: 'E01026572',
              msoa: 'E02005534',
              lau2: 'E07000144',
              pfa: 'E23000024',
            },
          },
        });

      // when
      const response = postcodesApi.randomPostcode(outcode);

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: expect.toBePostcodeData(),
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });

  describe('terminatedPostcodeLookup', () => {
    it('should return TerminatedPostcodeData for terminated postcode', async () => {
      // given
      const postcode = 'E1W 1UU';
      const scope = nock(basePath)
        .get(`/terminated_postcodes/${encodeURIComponent(postcode)}`)
        .reply(200, {
          status: 200,
          result: {
            postcode: 'E1W 1UU',
            year_terminated: 2015,
            month_terminated: 2,
            longitude: -0.073732,
            latitude: 51.508007,
          },
        });

      // when
      const response = postcodesApi.terminatedPostcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: {
            postcode: 'E1W 1UU',
            year_terminated: 2015,
            month_terminated: 2,
            longitude: -0.073732,
            latitude: 51.508007,
          },
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 404 error for live postcode', async () => {
      // given
      const postcode = 'W1A 1AA';
      const scope = nock(basePath)
        .get(`/terminated_postcodes/${encodeURIComponent(postcode)}`)
        .reply(404, {
          status: 404,
          error: 'Terminated postcode not found',
        });

      // when
      const response = postcodesApi.terminatedPostcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Terminated postcode not found',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 404 error for invalid postcode', async () => {
      // given
      const postcode = 'Plop';
      const scope = nock(basePath)
        .get(`/terminated_postcodes/${encodeURIComponent(postcode)}`)
        .reply(404, {
          status: 404,
          error: 'Invalid postcode',
        });

      // when
      const response = postcodesApi.terminatedPostcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Invalid postcode',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 404 error for empty string postcode', async () => {
      // given
      const postcode = '';
      const scope = nock(basePath).get('/terminated_postcodes/').reply(404, {
        status: 404,
        error: 'Resource not found',
      });

      // when
      const response = postcodesApi.terminatedPostcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Resource not found',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });

  describe('scottishPostcodeLookup', () => {
    it('should return ScottishPostcodeData for Scottish postcode', async () => {
      // given
      const postcode = 'EH22 3NX';
      const scope = nock(basePath)
        .get(`/scotland/postcodes/${encodeURIComponent(postcode)}`)
        .reply(200, {
          status: 200,
          result: {
            postcode: 'EH22 3NX',
            scottish_parliamentary_constituency:
              'Midlothian North and Musselburgh',
            codes: {
              scottish_parliamentary_constituency: 'S16000130',
            },
          },
        });

      // when
      const response = postcodesApi.scottishPostcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: {
            postcode: 'EH22 3NX',
            scottish_parliamentary_constituency:
              'Midlothian North and Musselburgh',
            codes: {
              scottish_parliamentary_constituency: 'S16000130',
            },
          },
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 404 error for non-Scottish postcode', async () => {
      // given
      const postcode = 'W1A 1AA';
      const scope = nock(basePath)
        .get(`/scotland/postcodes/${encodeURIComponent(postcode)}`)
        .reply(404, {
          status: 404,
          error: 'Postcode exists in ONSPD but not in SPD',
        });

      // when
      const response = postcodesApi.scottishPostcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Postcode exists in ONSPD but not in SPD',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 404 error for invalid postcode', async () => {
      // given
      const postcode = 'Plop';
      const scope = nock(basePath)
        .get(`/scotland/postcodes/${encodeURIComponent(postcode)}`)
        .reply(404, {
          status: 404,
          error: 'Invalid postcode',
        });

      // when
      const response = postcodesApi.scottishPostcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Invalid postcode',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 404 error for invalid postcode', async () => {
      // given
      const postcode = '';
      const scope = nock(basePath).get('/scotland/postcodes/').reply(404, {
        status: 404,
        error: 'Resource not found',
      });

      // when
      const response = postcodesApi.scottishPostcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Resource not found',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });

  describe('reverseGeocodingOrPostcodeQuery', () => {
    it('should return list of PostcodeData for matching lon/lat', async () => {
      // given
      const lon = -1.492787;
      const lat = 54.961017;
      const scope = nock(basePath)
        .get(`/postcodes?lon=${lon}&lat=${lat}&limit=2`)
        .reply(200, {
          status: 200,
          result: [
            {
              postcode: 'NE32 5YQ',
              quality: 1,
              eastings: 432576,
              northings: 563049,
              country: 'England',
              nhs_ha: 'North East',
              longitude: -1.492787,
              latitude: 54.961017,
              european_electoral_region: 'North East',
              primary_care_trust: 'South Tyneside',
              region: 'North East',
              lsoa: 'South Tyneside 017C',
              msoa: 'South Tyneside 017',
              incode: '5YQ',
              outcode: 'NE32',
              parliamentary_constituency: 'Jarrow',
              admin_district: 'South Tyneside',
              parish: 'South Tyneside, unparished area',
              admin_county: null,
              date_of_introduction: '198001',
              admin_ward: 'Primrose',
              ced: null,
              ccg: 'NHS North East and North Cumbria',
              nuts: 'Tyneside',
              pfa: 'Northumbria',
              codes: {
                admin_district: 'E08000023',
                admin_county: 'E99999999',
                admin_ward: 'E05001147',
                parish: 'E43000177',
                parliamentary_constituency: 'E14000765',
                ccg: 'E38000163',
                ccg_id: '00N',
                ced: 'E99999999',
                nuts: 'TLC22',
                lsoa: 'E01008659',
                msoa: 'E02001784',
                lau2: 'E08000023',
                pfa: 'E23000007',
              },
              distance: 0,
            },
            {
              postcode: 'NE32 5YJ',
              quality: 1,
              eastings: 432548,
              northings: 563131,
              country: 'England',
              nhs_ha: 'North East',
              longitude: -1.493215,
              latitude: 54.961755,
              european_electoral_region: 'North East',
              primary_care_trust: 'South Tyneside',
              region: 'North East',
              lsoa: 'South Tyneside 017C',
              msoa: 'South Tyneside 017',
              incode: '5YJ',
              outcode: 'NE32',
              parliamentary_constituency: 'Jarrow',
              admin_district: 'South Tyneside',
              parish: 'South Tyneside, unparished area',
              admin_county: null,
              date_of_introduction: '198001',
              admin_ward: 'Primrose',
              ced: null,
              ccg: 'NHS North East and North Cumbria',
              nuts: 'Tyneside',
              pfa: 'Northumbria',
              codes: {
                admin_district: 'E08000023',
                admin_county: 'E99999999',
                admin_ward: 'E05001147',
                parish: 'E43000177',
                parliamentary_constituency: 'E14000765',
                ccg: 'E38000163',
                ccg_id: '00N',
                ced: 'E99999999',
                nuts: 'TLC22',
                lsoa: 'E01008659',
                msoa: 'E02001784',
                lau2: 'E08000023',
                pfa: 'E23000007',
              },
              distance: 86.6098902,
            },
          ],
        });

      // when
      const response = postcodesApi.reverseGeocodingOrPostcodeQuery({
        lon,
        lat,
        limit: 2,
      });

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: [
            {
              postcode: 'NE32 5YQ',
              quality: 1,
              eastings: 432576,
              northings: 563049,
              country: 'England',
              nhs_ha: 'North East',
              longitude: -1.492787,
              latitude: 54.961017,
              european_electoral_region: 'North East',
              primary_care_trust: 'South Tyneside',
              region: 'North East',
              lsoa: 'South Tyneside 017C',
              msoa: 'South Tyneside 017',
              incode: '5YQ',
              outcode: 'NE32',
              parliamentary_constituency: 'Jarrow',
              admin_district: 'South Tyneside',
              parish: 'South Tyneside, unparished area',
              admin_county: null,
              date_of_introduction: '198001',
              admin_ward: 'Primrose',
              ced: null,
              ccg: 'NHS North East and North Cumbria',
              nuts: 'Tyneside',
              pfa: 'Northumbria',
              codes: {
                admin_district: 'E08000023',
                admin_county: 'E99999999',
                admin_ward: 'E05001147',
                parish: 'E43000177',
                parliamentary_constituency: 'E14000765',
                ccg: 'E38000163',
                ccg_id: '00N',
                ced: 'E99999999',
                nuts: 'TLC22',
                lsoa: 'E01008659',
                msoa: 'E02001784',
                lau2: 'E08000023',
                pfa: 'E23000007',
              },
              distance: 0,
            },
            {
              postcode: 'NE32 5YJ',
              quality: 1,
              eastings: 432548,
              northings: 563131,
              country: 'England',
              nhs_ha: 'North East',
              longitude: -1.493215,
              latitude: 54.961755,
              european_electoral_region: 'North East',
              primary_care_trust: 'South Tyneside',
              region: 'North East',
              lsoa: 'South Tyneside 017C',
              msoa: 'South Tyneside 017',
              incode: '5YJ',
              outcode: 'NE32',
              parliamentary_constituency: 'Jarrow',
              admin_district: 'South Tyneside',
              parish: 'South Tyneside, unparished area',
              admin_county: null,
              date_of_introduction: '198001',
              admin_ward: 'Primrose',
              ced: null,
              ccg: 'NHS North East and North Cumbria',
              nuts: 'Tyneside',
              pfa: 'Northumbria',
              codes: {
                admin_district: 'E08000023',
                admin_county: 'E99999999',
                admin_ward: 'E05001147',
                parish: 'E43000177',
                parliamentary_constituency: 'E14000765',
                ccg: 'E38000163',
                ccg_id: '00N',
                ced: 'E99999999',
                nuts: 'TLC22',
                lsoa: 'E01008659',
                msoa: 'E02001784',
                lau2: 'E08000023',
                pfa: 'E23000007',
              },
              distance: 86.6098902,
            },
          ],
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 200 null for non-matching lon/lat', async () => {
      // given
      const lon = 0;
      const lat = 0;
      const scope = nock(basePath)
        .get(`/postcodes?lon=${lon}&lat=${lat}&limit=2`)
        .reply(200, {
          status: 200,
          result: null,
        });

      // when
      const response = postcodesApi.reverseGeocodingOrPostcodeQuery({
        lon,
        lat,
        limit: 2,
      });

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: null,
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return list of PostcodeData for matching query', async () => {
      // given
      const query = 'KT3';
      const scope = nock(basePath)
        .get(`/postcodes?query=${encodeURIComponent(query)}&limit=2`)
        .reply(200, {
          status: 200,
          result: [
            {
              postcode: 'KT3 3AA',
              quality: 1,
              eastings: 521192,
              northings: 168528,
              country: 'England',
              nhs_ha: 'London',
              longitude: -0.259097,
              latitude: 51.402843,
              european_electoral_region: 'London',
              primary_care_trust: 'Kingston',
              region: 'London',
              lsoa: 'Kingston upon Thames 007B',
              msoa: 'Kingston upon Thames 007',
              incode: '3AA',
              outcode: 'KT3',
              parliamentary_constituency: 'Kingston and Surbiton',
              admin_district: 'Kingston upon Thames',
              parish: 'Kingston upon Thames, unparished area',
              admin_county: null,
              date_of_introduction: '198001',
              admin_ward: 'New Malden Village',
              ced: null,
              ccg: 'NHS South West London',
              nuts: 'Merton, Kingston upon Thames and Sutton',
              pfa: 'Metropolitan Police',
              codes: {
                admin_district: 'E09000021',
                admin_county: 'E99999999',
                admin_ward: 'E05013940',
                parish: 'E43000211',
                parliamentary_constituency: 'E14000770',
                ccg: 'E38000245',
                ccg_id: '36L',
                ced: 'E99999999',
                nuts: 'TLI63',
                lsoa: 'E01002930',
                msoa: 'E02000604',
                lau2: 'E09000021',
                pfa: 'E23000001',
              },
            },
            {
              postcode: 'KT3 3AB',
              quality: 1,
              eastings: 521206,
              northings: 168537,
              country: 'England',
              nhs_ha: 'London',
              longitude: -0.258916,
              latitude: 51.402921,
              european_electoral_region: 'London',
              primary_care_trust: 'Kingston',
              region: 'London',
              lsoa: 'Kingston upon Thames 007B',
              msoa: 'Kingston upon Thames 007',
              incode: '3AB',
              outcode: 'KT3',
              parliamentary_constituency: 'Kingston and Surbiton',
              admin_district: 'Kingston upon Thames',
              parish: 'Kingston upon Thames, unparished area',
              admin_county: null,
              date_of_introduction: '199806',
              admin_ward: 'New Malden Village',
              ced: null,
              ccg: 'NHS South West London',
              nuts: 'Merton, Kingston upon Thames and Sutton',
              pfa: 'Metropolitan Police',
              codes: {
                admin_district: 'E09000021',
                admin_county: 'E99999999',
                admin_ward: 'E05013940',
                parish: 'E43000211',
                parliamentary_constituency: 'E14000770',
                ccg: 'E38000245',
                ccg_id: '36L',
                ced: 'E99999999',
                nuts: 'TLI63',
                lsoa: 'E01002930',
                msoa: 'E02000604',
                lau2: 'E09000021',
                pfa: 'E23000001',
              },
            },
          ],
        });

      // when
      const response = postcodesApi.reverseGeocodingOrPostcodeQuery({
        query,
        limit: 2,
      });

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: [
            {
              postcode: 'KT3 3AA',
              quality: 1,
              eastings: 521192,
              northings: 168528,
              country: 'England',
              nhs_ha: 'London',
              longitude: -0.259097,
              latitude: 51.402843,
              european_electoral_region: 'London',
              primary_care_trust: 'Kingston',
              region: 'London',
              lsoa: 'Kingston upon Thames 007B',
              msoa: 'Kingston upon Thames 007',
              incode: '3AA',
              outcode: 'KT3',
              parliamentary_constituency: 'Kingston and Surbiton',
              admin_district: 'Kingston upon Thames',
              parish: 'Kingston upon Thames, unparished area',
              admin_county: null,
              date_of_introduction: '198001',
              admin_ward: 'New Malden Village',
              ced: null,
              ccg: 'NHS South West London',
              nuts: 'Merton, Kingston upon Thames and Sutton',
              pfa: 'Metropolitan Police',
              codes: {
                admin_district: 'E09000021',
                admin_county: 'E99999999',
                admin_ward: 'E05013940',
                parish: 'E43000211',
                parliamentary_constituency: 'E14000770',
                ccg: 'E38000245',
                ccg_id: '36L',
                ced: 'E99999999',
                nuts: 'TLI63',
                lsoa: 'E01002930',
                msoa: 'E02000604',
                lau2: 'E09000021',
                pfa: 'E23000001',
              },
            },
            {
              postcode: 'KT3 3AB',
              quality: 1,
              eastings: 521206,
              northings: 168537,
              country: 'England',
              nhs_ha: 'London',
              longitude: -0.258916,
              latitude: 51.402921,
              european_electoral_region: 'London',
              primary_care_trust: 'Kingston',
              region: 'London',
              lsoa: 'Kingston upon Thames 007B',
              msoa: 'Kingston upon Thames 007',
              incode: '3AB',
              outcode: 'KT3',
              parliamentary_constituency: 'Kingston and Surbiton',
              admin_district: 'Kingston upon Thames',
              parish: 'Kingston upon Thames, unparished area',
              admin_county: null,
              date_of_introduction: '199806',
              admin_ward: 'New Malden Village',
              ced: null,
              ccg: 'NHS South West London',
              nuts: 'Merton, Kingston upon Thames and Sutton',
              pfa: 'Metropolitan Police',
              codes: {
                admin_district: 'E09000021',
                admin_county: 'E99999999',
                admin_ward: 'E05013940',
                parish: 'E43000211',
                parliamentary_constituency: 'E14000770',
                ccg: 'E38000245',
                ccg_id: '36L',
                ced: 'E99999999',
                nuts: 'TLI63',
                lsoa: 'E01002930',
                msoa: 'E02000604',
                lau2: 'E09000021',
                pfa: 'E23000001',
              },
            },
          ],
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 200 null for non-matching query', async () => {
      // given
      const query = 'Plop';
      const scope = nock(basePath).get(`/postcodes?query=${query}`).reply(200, {
        status: 200,
        result: null,
      });

      // when
      const response = postcodesApi.reverseGeocodingOrPostcodeQuery({query});

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: null,
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 400 error for missing params', async () => {
      // given
      const scope = nock(basePath).get('/postcodes').reply(400, {
        status: 400,
        error:
          'No postcode query submitted. Remember to include query parameter',
      });

      // when
      const response = postcodesApi.reverseGeocodingOrPostcodeQuery({});

      // then
      await expect(response).resolves.toEqual({
        status: 400,
        contentType: 'application/json',
        body: {
          status: 400,
          error:
            'No postcode query submitted. Remember to include query parameter',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 400 error for empty string query', async () => {
      // given
      const query = '';
      const scope = nock(basePath).get('/postcodes?query=').reply(400, {
        status: 400,
        error:
          'No postcode query submitted. Remember to include query parameter',
      });

      // when
      const response = postcodesApi.reverseGeocodingOrPostcodeQuery({query});

      // then
      await expect(response).resolves.toEqual({
        status: 400,
        contentType: 'application/json',
        body: {
          status: 400,
          error:
            'No postcode query submitted. Remember to include query parameter',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });

  describe('bulkPostcodeLookupOrBulkReverseGeocoding', () => {
    it('should return list of PostcodeData for list of postcodes', async () => {
      // given
      const request = {
        postcodes: ['BD6 3PS', 'NE32 5YQ'],
      };
      const scope = nock(basePath)
        .post('/postcodes', request)
        .reply(200, {
          status: 200,
          result: [
            {
              query: 'BD6 3PS',
              result: {
                postcode: 'BD6 3PS',
                quality: 1,
                eastings: 414064,
                northings: 429870,
                country: 'England',
                nhs_ha: 'Yorkshire and the Humber',
                longitude: -1.788133,
                latitude: 53.765008,
                european_electoral_region: 'Yorkshire and The Humber',
                primary_care_trust: 'Bradford and Airedale Teaching',
                region: 'Yorkshire and The Humber',
                lsoa: 'Bradford 055E',
                msoa: 'Bradford 055',
                incode: '3PS',
                outcode: 'BD6',
                parliamentary_constituency: 'Bradford South',
                admin_district: 'Bradford',
                parish: 'Bradford, unparished area',
                admin_county: null,
                date_of_introduction: '198001',
                admin_ward: 'Royds',
                ced: null,
                ccg: 'NHS West Yorkshire',
                nuts: 'Bradford',
                pfa: 'West Yorkshire',
                codes: {
                  admin_district: 'E08000032',
                  admin_county: 'E99999999',
                  admin_ward: 'E05001361',
                  parish: 'E43000274',
                  parliamentary_constituency: 'E14000588',
                  ccg: 'E38000232',
                  ccg_id: '36J',
                  ced: 'E99999999',
                  nuts: 'TLE41',
                  lsoa: 'E01010846',
                  msoa: 'E02002237',
                  lau2: 'E08000032',
                  pfa: 'E23000010',
                },
              },
            },
            {
              query: 'NE32 5YQ',
              result: {
                postcode: 'NE32 5YQ',
                quality: 1,
                eastings: 432576,
                northings: 563049,
                country: 'England',
                nhs_ha: 'North East',
                longitude: -1.492787,
                latitude: 54.961017,
                european_electoral_region: 'North East',
                primary_care_trust: 'South Tyneside',
                region: 'North East',
                lsoa: 'South Tyneside 017C',
                msoa: 'South Tyneside 017',
                incode: '5YQ',
                outcode: 'NE32',
                parliamentary_constituency: 'Jarrow',
                admin_district: 'South Tyneside',
                parish: 'South Tyneside, unparished area',
                admin_county: null,
                date_of_introduction: '198001',
                admin_ward: 'Primrose',
                ced: null,
                ccg: 'NHS North East and North Cumbria',
                nuts: 'Tyneside',
                pfa: 'Northumbria',
                codes: {
                  admin_district: 'E08000023',
                  admin_county: 'E99999999',
                  admin_ward: 'E05001147',
                  parish: 'E43000177',
                  parliamentary_constituency: 'E14000765',
                  ccg: 'E38000163',
                  ccg_id: '00N',
                  ced: 'E99999999',
                  nuts: 'TLC22',
                  lsoa: 'E01008659',
                  msoa: 'E02001784',
                  lau2: 'E08000023',
                  pfa: 'E23000007',
                },
              },
            },
          ],
        });

      // when
      const response = postcodesApi.bulkPostcodeLookupOrBulkReverseGeocoding(
        {},
        request
      );

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: [
            {
              query: 'BD6 3PS',
              result: {
                postcode: 'BD6 3PS',
                quality: 1,
                eastings: 414064,
                northings: 429870,
                country: 'England',
                nhs_ha: 'Yorkshire and the Humber',
                longitude: -1.788133,
                latitude: 53.765008,
                european_electoral_region: 'Yorkshire and The Humber',
                primary_care_trust: 'Bradford and Airedale Teaching',
                region: 'Yorkshire and The Humber',
                lsoa: 'Bradford 055E',
                msoa: 'Bradford 055',
                incode: '3PS',
                outcode: 'BD6',
                parliamentary_constituency: 'Bradford South',
                admin_district: 'Bradford',
                parish: 'Bradford, unparished area',
                admin_county: null,
                date_of_introduction: '198001',
                admin_ward: 'Royds',
                ced: null,
                ccg: 'NHS West Yorkshire',
                nuts: 'Bradford',
                pfa: 'West Yorkshire',
                codes: {
                  admin_district: 'E08000032',
                  admin_county: 'E99999999',
                  admin_ward: 'E05001361',
                  parish: 'E43000274',
                  parliamentary_constituency: 'E14000588',
                  ccg: 'E38000232',
                  ccg_id: '36J',
                  ced: 'E99999999',
                  nuts: 'TLE41',
                  lsoa: 'E01010846',
                  msoa: 'E02002237',
                  lau2: 'E08000032',
                  pfa: 'E23000010',
                },
              },
            },
            {
              query: 'NE32 5YQ',
              result: {
                postcode: 'NE32 5YQ',
                quality: 1,
                eastings: 432576,
                northings: 563049,
                country: 'England',
                nhs_ha: 'North East',
                longitude: -1.492787,
                latitude: 54.961017,
                european_electoral_region: 'North East',
                primary_care_trust: 'South Tyneside',
                region: 'North East',
                lsoa: 'South Tyneside 017C',
                msoa: 'South Tyneside 017',
                incode: '5YQ',
                outcode: 'NE32',
                parliamentary_constituency: 'Jarrow',
                admin_district: 'South Tyneside',
                parish: 'South Tyneside, unparished area',
                admin_county: null,
                date_of_introduction: '198001',
                admin_ward: 'Primrose',
                ced: null,
                ccg: 'NHS North East and North Cumbria',
                nuts: 'Tyneside',
                pfa: 'Northumbria',
                codes: {
                  admin_district: 'E08000023',
                  admin_county: 'E99999999',
                  admin_ward: 'E05001147',
                  parish: 'E43000177',
                  parliamentary_constituency: 'E14000765',
                  ccg: 'E38000163',
                  ccg_id: '00N',
                  ced: 'E99999999',
                  nuts: 'TLC22',
                  lsoa: 'E01008659',
                  msoa: 'E02001784',
                  lau2: 'E08000023',
                  pfa: 'E23000007',
                },
              },
            },
          ],
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return list of PostcodeData for list of geolocations', async () => {
      // given
      const request = {
        geolocations: [
          {
            longitude: 0.629834723775309,
            latitude: 51.7923246977375,
          },
          {
            longitude: -2.49690382054704,
            latitude: 53.5351312861402,
            radius: 1000,
            limit: 5,
          },
        ],
      };
      const scope = nock(basePath)
        .post('/postcodes', request)
        .reply(200, {
          status: 200,
          result: [
            {
              query: {
                longitude: 0.629834723775309,
                latitude: 51.7923246977375,
              },
              result: [
                {
                  postcode: 'CM8 1EF',
                  quality: 1,
                  eastings: 581459,
                  northings: 213679,
                  country: 'England',
                  nhs_ha: 'East of England',
                  longitude: 0.629806,
                  latitude: 51.792326,
                  european_electoral_region: 'Eastern',
                  primary_care_trust: 'Mid Essex',
                  region: 'East of England',
                  lsoa: 'Braintree 017F',
                  msoa: 'Braintree 017',
                  incode: '1EF',
                  outcode: 'CM8',
                  parliamentary_constituency: 'Witham',
                  admin_district: 'Braintree',
                  parish: 'Witham',
                  admin_county: 'Essex',
                  date_of_introduction: '198001',
                  admin_ward: 'Witham South',
                  ced: 'Witham Southern',
                  ccg: 'NHS Mid and South Essex',
                  nuts: 'Essex Haven Gateway',
                  pfa: 'Essex',
                  codes: {
                    admin_district: 'E07000067',
                    admin_county: 'E10000012',
                    admin_ward: 'E05010388',
                    parish: 'E04012935',
                    parliamentary_constituency: 'E14001045',
                    ccg: 'E38000106',
                    ccg_id: '06Q',
                    ced: 'E58000470',
                    nuts: 'TLH34',
                    lsoa: 'E01033460',
                    msoa: 'E02004462',
                    lau2: 'E07000067',
                    pfa: 'E23000028',
                  },
                  distance: 1.98709706,
                },
                {
                  postcode: 'CM8 1EU',
                  quality: 1,
                  eastings: 581508,
                  northings: 213652,
                  country: 'England',
                  nhs_ha: 'East of England',
                  longitude: 0.630501,
                  latitude: 51.792068,
                  european_electoral_region: 'Eastern',
                  primary_care_trust: 'Mid Essex',
                  region: 'East of England',
                  lsoa: 'Braintree 017F',
                  msoa: 'Braintree 017',
                  incode: '1EU',
                  outcode: 'CM8',
                  parliamentary_constituency: 'Witham',
                  admin_district: 'Braintree',
                  parish: 'Witham',
                  admin_county: 'Essex',
                  date_of_introduction: '198001',
                  admin_ward: 'Witham South',
                  ced: 'Witham Southern',
                  ccg: 'NHS Mid and South Essex',
                  nuts: 'Essex Haven Gateway',
                  pfa: 'Essex',
                  codes: {
                    admin_district: 'E07000067',
                    admin_county: 'E10000012',
                    admin_ward: 'E05010388',
                    parish: 'E04012935',
                    parliamentary_constituency: 'E14001045',
                    ccg: 'E38000106',
                    ccg_id: '06Q',
                    ced: 'E58000470',
                    nuts: 'TLH34',
                    lsoa: 'E01033460',
                    msoa: 'E02004462',
                    lau2: 'E07000067',
                    pfa: 'E23000028',
                  },
                  distance: 54.12009472,
                },
                {
                  postcode: 'CM8 1PH',
                  quality: 1,
                  eastings: 581421,
                  northings: 213740,
                  country: 'England',
                  nhs_ha: 'East of England',
                  longitude: 0.629287,
                  latitude: 51.792887,
                  european_electoral_region: 'Eastern',
                  primary_care_trust: 'Mid Essex',
                  region: 'East of England',
                  lsoa: 'Braintree 017H',
                  msoa: 'Braintree 017',
                  incode: '1PH',
                  outcode: 'CM8',
                  parliamentary_constituency: 'Witham',
                  admin_district: 'Braintree',
                  parish: 'Witham',
                  admin_county: 'Essex',
                  date_of_introduction: '198001',
                  admin_ward: 'Witham Central',
                  ced: 'Witham Southern',
                  ccg: 'NHS Mid and South Essex',
                  nuts: 'Essex Haven Gateway',
                  pfa: 'Essex',
                  codes: {
                    admin_district: 'E07000067',
                    admin_county: 'E10000012',
                    admin_ward: 'E05012966',
                    parish: 'E04012935',
                    parliamentary_constituency: 'E14001045',
                    ccg: 'E38000106',
                    ccg_id: '06Q',
                    ced: 'E58000470',
                    nuts: 'TLH34',
                    lsoa: 'E01033462',
                    msoa: 'E02004462',
                    lau2: 'E07000067',
                    pfa: 'E23000028',
                  },
                  distance: 73.09110168,
                },
                {
                  postcode: 'CM8 1PQ',
                  quality: 1,
                  eastings: 581399,
                  northings: 213755,
                  country: 'England',
                  nhs_ha: 'East of England',
                  longitude: 0.628977,
                  latitude: 51.793028,
                  european_electoral_region: 'Eastern',
                  primary_care_trust: 'Mid Essex',
                  region: 'East of England',
                  lsoa: 'Braintree 017H',
                  msoa: 'Braintree 017',
                  incode: '1PQ',
                  outcode: 'CM8',
                  parliamentary_constituency: 'Witham',
                  admin_district: 'Braintree',
                  parish: 'Witham',
                  admin_county: 'Essex',
                  date_of_introduction: '198001',
                  admin_ward: 'Witham Central',
                  ced: 'Witham Southern',
                  ccg: 'NHS Mid and South Essex',
                  nuts: 'Essex Haven Gateway',
                  pfa: 'Essex',
                  codes: {
                    admin_district: 'E07000067',
                    admin_county: 'E10000012',
                    admin_ward: 'E05012966',
                    parish: 'E04012935',
                    parliamentary_constituency: 'E14001045',
                    ccg: 'E38000106',
                    ccg_id: '06Q',
                    ced: 'E58000470',
                    nuts: 'TLH34',
                    lsoa: 'E01033462',
                    msoa: 'E02004462',
                    lau2: 'E07000067',
                    pfa: 'E23000028',
                  },
                  distance: 98.10933201,
                },
              ],
            },
            {
              query: {
                longitude: -2.49690382054704,
                latitude: 53.5351312861402,
                radius: 1000,
                limit: 5,
              },
              result: [
                {
                  postcode: 'M46 9WU',
                  quality: 1,
                  eastings: 367163,
                  northings: 404390,
                  country: 'England',
                  nhs_ha: 'North West',
                  longitude: -2.496903,
                  latitude: 53.535127,
                  european_electoral_region: 'North West',
                  primary_care_trust: 'Ashton, Leigh and Wigan',
                  region: 'North West',
                  lsoa: 'Wigan 017C',
                  msoa: 'Wigan 017',
                  incode: '9WU',
                  outcode: 'M46',
                  parliamentary_constituency: 'Bolton West',
                  admin_district: 'Wigan',
                  parish: 'Wigan, unparished area',
                  admin_county: null,
                  date_of_introduction: '199405',
                  admin_ward: 'Atherton',
                  ced: null,
                  ccg: 'NHS Greater Manchester',
                  nuts: 'Greater Manchester North West',
                  pfa: 'Greater Manchester',
                  codes: {
                    admin_district: 'E08000010',
                    admin_county: 'E99999999',
                    admin_ward: 'E05000845',
                    parish: 'E43000164',
                    parliamentary_constituency: 'E14000580',
                    ccg: 'E38000205',
                    ccg_id: '02H',
                    ced: 'E99999999',
                    nuts: 'TLD36',
                    lsoa: 'E01006241',
                    msoa: 'E02001303',
                    lau2: 'E08000010',
                    pfa: 'E23000005',
                  },
                  distance: 0.4801241,
                },
                {
                  postcode: 'M46 9XF',
                  quality: 1,
                  eastings: 367155,
                  northings: 404364,
                  country: 'England',
                  nhs_ha: 'North West',
                  longitude: -2.497021,
                  latitude: 53.534893,
                  european_electoral_region: 'North West',
                  primary_care_trust: 'Ashton, Leigh and Wigan',
                  region: 'North West',
                  lsoa: 'Wigan 017B',
                  msoa: 'Wigan 017',
                  incode: '9XF',
                  outcode: 'M46',
                  parliamentary_constituency: 'Bolton West',
                  admin_district: 'Wigan',
                  parish: 'Wigan, unparished area',
                  admin_county: null,
                  date_of_introduction: '199405',
                  admin_ward: 'Atherton',
                  ced: null,
                  ccg: 'NHS Greater Manchester',
                  nuts: 'Greater Manchester North West',
                  pfa: 'Greater Manchester',
                  codes: {
                    admin_district: 'E08000010',
                    admin_county: 'E99999999',
                    admin_ward: 'E05000845',
                    parish: 'E43000164',
                    parliamentary_constituency: 'E14000580',
                    ccg: 'E38000205',
                    ccg_id: '02H',
                    ced: 'E99999999',
                    nuts: 'TLD36',
                    lsoa: 'E01006240',
                    msoa: 'E02001303',
                    lau2: 'E08000010',
                    pfa: 'E23000005',
                  },
                  distance: 27.6350374,
                },
                {
                  postcode: 'M46 9XE',
                  quality: 1,
                  eastings: 367212,
                  northings: 404330,
                  country: 'England',
                  nhs_ha: 'North West',
                  longitude: -2.496158,
                  latitude: 53.534608,
                  european_electoral_region: 'North West',
                  primary_care_trust: 'Ashton, Leigh and Wigan',
                  region: 'North West',
                  lsoa: 'Wigan 017C',
                  msoa: 'Wigan 017',
                  incode: '9XE',
                  outcode: 'M46',
                  parliamentary_constituency: 'Bolton West',
                  admin_district: 'Wigan',
                  parish: 'Wigan, unparished area',
                  admin_county: null,
                  date_of_introduction: '199405',
                  admin_ward: 'Atherton',
                  ced: null,
                  ccg: 'NHS Greater Manchester',
                  nuts: 'Greater Manchester North West',
                  pfa: 'Greater Manchester',
                  codes: {
                    admin_district: 'E08000010',
                    admin_county: 'E99999999',
                    admin_ward: 'E05000845',
                    parish: 'E43000164',
                    parliamentary_constituency: 'E14000580',
                    ccg: 'E38000205',
                    ccg_id: '02H',
                    ced: 'E99999999',
                    nuts: 'TLD36',
                    lsoa: 'E01006241',
                    msoa: 'E02001303',
                    lau2: 'E08000010',
                    pfa: 'E23000005',
                  },
                  distance: 76.40229254,
                },
                {
                  postcode: 'M46 9NX',
                  quality: 1,
                  eastings: 367245,
                  northings: 404384,
                  country: 'England',
                  nhs_ha: 'North West',
                  longitude: -2.495666,
                  latitude: 53.535078,
                  european_electoral_region: 'North West',
                  primary_care_trust: 'Ashton, Leigh and Wigan',
                  region: 'North West',
                  lsoa: 'Wigan 017C',
                  msoa: 'Wigan 017',
                  incode: '9NX',
                  outcode: 'M46',
                  parliamentary_constituency: 'Bolton West',
                  admin_district: 'Wigan',
                  parish: 'Wigan, unparished area',
                  admin_county: null,
                  date_of_introduction: '199405',
                  admin_ward: 'Atherton',
                  ced: null,
                  ccg: 'NHS Greater Manchester',
                  nuts: 'Greater Manchester North West',
                  pfa: 'Greater Manchester',
                  codes: {
                    admin_district: 'E08000010',
                    admin_county: 'E99999999',
                    admin_ward: 'E05000845',
                    parish: 'E43000164',
                    parliamentary_constituency: 'E14000580',
                    ccg: 'E38000205',
                    ccg_id: '02H',
                    ced: 'E99999999',
                    nuts: 'TLD36',
                    lsoa: 'E01006241',
                    msoa: 'E02001303',
                    lau2: 'E08000010',
                    pfa: 'E23000005',
                  },
                  distance: 82.28672453,
                },
                {
                  postcode: 'M46 9NU',
                  quality: 1,
                  eastings: 367171,
                  northings: 404476,
                  country: 'England',
                  nhs_ha: 'North West',
                  longitude: -2.496792,
                  latitude: 53.535901,
                  european_electoral_region: 'North West',
                  primary_care_trust: 'Ashton, Leigh and Wigan',
                  region: 'North West',
                  lsoa: 'Wigan 017C',
                  msoa: 'Wigan 017',
                  incode: '9NU',
                  outcode: 'M46',
                  parliamentary_constituency: 'Bolton West',
                  admin_district: 'Wigan',
                  parish: 'Wigan, unparished area',
                  admin_county: null,
                  date_of_introduction: '199405',
                  admin_ward: 'Atherton',
                  ced: null,
                  ccg: 'NHS Greater Manchester',
                  nuts: 'Greater Manchester North West',
                  pfa: 'Greater Manchester',
                  codes: {
                    admin_district: 'E08000010',
                    admin_county: 'E99999999',
                    admin_ward: 'E05000845',
                    parish: 'E43000164',
                    parliamentary_constituency: 'E14000580',
                    ccg: 'E38000205',
                    ccg_id: '02H',
                    ced: 'E99999999',
                    nuts: 'TLD36',
                    lsoa: 'E01006241',
                    msoa: 'E02001303',
                    lau2: 'E08000010',
                    pfa: 'E23000005',
                  },
                  distance: 85.98655766,
                },
              ],
            },
          ],
        });

      // when
      const response = postcodesApi.bulkPostcodeLookupOrBulkReverseGeocoding(
        {},
        request
      );

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: [
            {
              query: {
                longitude: 0.629834723775309,
                latitude: 51.7923246977375,
              },
              result: [
                {
                  postcode: 'CM8 1EF',
                  quality: 1,
                  eastings: 581459,
                  northings: 213679,
                  country: 'England',
                  nhs_ha: 'East of England',
                  longitude: 0.629806,
                  latitude: 51.792326,
                  european_electoral_region: 'Eastern',
                  primary_care_trust: 'Mid Essex',
                  region: 'East of England',
                  lsoa: 'Braintree 017F',
                  msoa: 'Braintree 017',
                  incode: '1EF',
                  outcode: 'CM8',
                  parliamentary_constituency: 'Witham',
                  admin_district: 'Braintree',
                  parish: 'Witham',
                  admin_county: 'Essex',
                  date_of_introduction: '198001',
                  admin_ward: 'Witham South',
                  ced: 'Witham Southern',
                  ccg: 'NHS Mid and South Essex',
                  nuts: 'Essex Haven Gateway',
                  pfa: 'Essex',
                  codes: {
                    admin_district: 'E07000067',
                    admin_county: 'E10000012',
                    admin_ward: 'E05010388',
                    parish: 'E04012935',
                    parliamentary_constituency: 'E14001045',
                    ccg: 'E38000106',
                    ccg_id: '06Q',
                    ced: 'E58000470',
                    nuts: 'TLH34',
                    lsoa: 'E01033460',
                    msoa: 'E02004462',
                    lau2: 'E07000067',
                    pfa: 'E23000028',
                  },
                  distance: 1.98709706,
                },
                {
                  postcode: 'CM8 1EU',
                  quality: 1,
                  eastings: 581508,
                  northings: 213652,
                  country: 'England',
                  nhs_ha: 'East of England',
                  longitude: 0.630501,
                  latitude: 51.792068,
                  european_electoral_region: 'Eastern',
                  primary_care_trust: 'Mid Essex',
                  region: 'East of England',
                  lsoa: 'Braintree 017F',
                  msoa: 'Braintree 017',
                  incode: '1EU',
                  outcode: 'CM8',
                  parliamentary_constituency: 'Witham',
                  admin_district: 'Braintree',
                  parish: 'Witham',
                  admin_county: 'Essex',
                  date_of_introduction: '198001',
                  admin_ward: 'Witham South',
                  ced: 'Witham Southern',
                  ccg: 'NHS Mid and South Essex',
                  nuts: 'Essex Haven Gateway',
                  pfa: 'Essex',
                  codes: {
                    admin_district: 'E07000067',
                    admin_county: 'E10000012',
                    admin_ward: 'E05010388',
                    parish: 'E04012935',
                    parliamentary_constituency: 'E14001045',
                    ccg: 'E38000106',
                    ccg_id: '06Q',
                    ced: 'E58000470',
                    nuts: 'TLH34',
                    lsoa: 'E01033460',
                    msoa: 'E02004462',
                    lau2: 'E07000067',
                    pfa: 'E23000028',
                  },
                  distance: 54.12009472,
                },
                {
                  postcode: 'CM8 1PH',
                  quality: 1,
                  eastings: 581421,
                  northings: 213740,
                  country: 'England',
                  nhs_ha: 'East of England',
                  longitude: 0.629287,
                  latitude: 51.792887,
                  european_electoral_region: 'Eastern',
                  primary_care_trust: 'Mid Essex',
                  region: 'East of England',
                  lsoa: 'Braintree 017H',
                  msoa: 'Braintree 017',
                  incode: '1PH',
                  outcode: 'CM8',
                  parliamentary_constituency: 'Witham',
                  admin_district: 'Braintree',
                  parish: 'Witham',
                  admin_county: 'Essex',
                  date_of_introduction: '198001',
                  admin_ward: 'Witham Central',
                  ced: 'Witham Southern',
                  ccg: 'NHS Mid and South Essex',
                  nuts: 'Essex Haven Gateway',
                  pfa: 'Essex',
                  codes: {
                    admin_district: 'E07000067',
                    admin_county: 'E10000012',
                    admin_ward: 'E05012966',
                    parish: 'E04012935',
                    parliamentary_constituency: 'E14001045',
                    ccg: 'E38000106',
                    ccg_id: '06Q',
                    ced: 'E58000470',
                    nuts: 'TLH34',
                    lsoa: 'E01033462',
                    msoa: 'E02004462',
                    lau2: 'E07000067',
                    pfa: 'E23000028',
                  },
                  distance: 73.09110168,
                },
                {
                  postcode: 'CM8 1PQ',
                  quality: 1,
                  eastings: 581399,
                  northings: 213755,
                  country: 'England',
                  nhs_ha: 'East of England',
                  longitude: 0.628977,
                  latitude: 51.793028,
                  european_electoral_region: 'Eastern',
                  primary_care_trust: 'Mid Essex',
                  region: 'East of England',
                  lsoa: 'Braintree 017H',
                  msoa: 'Braintree 017',
                  incode: '1PQ',
                  outcode: 'CM8',
                  parliamentary_constituency: 'Witham',
                  admin_district: 'Braintree',
                  parish: 'Witham',
                  admin_county: 'Essex',
                  date_of_introduction: '198001',
                  admin_ward: 'Witham Central',
                  ced: 'Witham Southern',
                  ccg: 'NHS Mid and South Essex',
                  nuts: 'Essex Haven Gateway',
                  pfa: 'Essex',
                  codes: {
                    admin_district: 'E07000067',
                    admin_county: 'E10000012',
                    admin_ward: 'E05012966',
                    parish: 'E04012935',
                    parliamentary_constituency: 'E14001045',
                    ccg: 'E38000106',
                    ccg_id: '06Q',
                    ced: 'E58000470',
                    nuts: 'TLH34',
                    lsoa: 'E01033462',
                    msoa: 'E02004462',
                    lau2: 'E07000067',
                    pfa: 'E23000028',
                  },
                  distance: 98.10933201,
                },
              ],
            },
            {
              query: {
                longitude: -2.49690382054704,
                latitude: 53.5351312861402,
                radius: 1000,
                limit: 5,
              },
              result: [
                {
                  postcode: 'M46 9WU',
                  quality: 1,
                  eastings: 367163,
                  northings: 404390,
                  country: 'England',
                  nhs_ha: 'North West',
                  longitude: -2.496903,
                  latitude: 53.535127,
                  european_electoral_region: 'North West',
                  primary_care_trust: 'Ashton, Leigh and Wigan',
                  region: 'North West',
                  lsoa: 'Wigan 017C',
                  msoa: 'Wigan 017',
                  incode: '9WU',
                  outcode: 'M46',
                  parliamentary_constituency: 'Bolton West',
                  admin_district: 'Wigan',
                  parish: 'Wigan, unparished area',
                  admin_county: null,
                  date_of_introduction: '199405',
                  admin_ward: 'Atherton',
                  ced: null,
                  ccg: 'NHS Greater Manchester',
                  nuts: 'Greater Manchester North West',
                  pfa: 'Greater Manchester',
                  codes: {
                    admin_district: 'E08000010',
                    admin_county: 'E99999999',
                    admin_ward: 'E05000845',
                    parish: 'E43000164',
                    parliamentary_constituency: 'E14000580',
                    ccg: 'E38000205',
                    ccg_id: '02H',
                    ced: 'E99999999',
                    nuts: 'TLD36',
                    lsoa: 'E01006241',
                    msoa: 'E02001303',
                    lau2: 'E08000010',
                    pfa: 'E23000005',
                  },
                  distance: 0.4801241,
                },
                {
                  postcode: 'M46 9XF',
                  quality: 1,
                  eastings: 367155,
                  northings: 404364,
                  country: 'England',
                  nhs_ha: 'North West',
                  longitude: -2.497021,
                  latitude: 53.534893,
                  european_electoral_region: 'North West',
                  primary_care_trust: 'Ashton, Leigh and Wigan',
                  region: 'North West',
                  lsoa: 'Wigan 017B',
                  msoa: 'Wigan 017',
                  incode: '9XF',
                  outcode: 'M46',
                  parliamentary_constituency: 'Bolton West',
                  admin_district: 'Wigan',
                  parish: 'Wigan, unparished area',
                  admin_county: null,
                  date_of_introduction: '199405',
                  admin_ward: 'Atherton',
                  ced: null,
                  ccg: 'NHS Greater Manchester',
                  nuts: 'Greater Manchester North West',
                  pfa: 'Greater Manchester',
                  codes: {
                    admin_district: 'E08000010',
                    admin_county: 'E99999999',
                    admin_ward: 'E05000845',
                    parish: 'E43000164',
                    parliamentary_constituency: 'E14000580',
                    ccg: 'E38000205',
                    ccg_id: '02H',
                    ced: 'E99999999',
                    nuts: 'TLD36',
                    lsoa: 'E01006240',
                    msoa: 'E02001303',
                    lau2: 'E08000010',
                    pfa: 'E23000005',
                  },
                  distance: 27.6350374,
                },
                {
                  postcode: 'M46 9XE',
                  quality: 1,
                  eastings: 367212,
                  northings: 404330,
                  country: 'England',
                  nhs_ha: 'North West',
                  longitude: -2.496158,
                  latitude: 53.534608,
                  european_electoral_region: 'North West',
                  primary_care_trust: 'Ashton, Leigh and Wigan',
                  region: 'North West',
                  lsoa: 'Wigan 017C',
                  msoa: 'Wigan 017',
                  incode: '9XE',
                  outcode: 'M46',
                  parliamentary_constituency: 'Bolton West',
                  admin_district: 'Wigan',
                  parish: 'Wigan, unparished area',
                  admin_county: null,
                  date_of_introduction: '199405',
                  admin_ward: 'Atherton',
                  ced: null,
                  ccg: 'NHS Greater Manchester',
                  nuts: 'Greater Manchester North West',
                  pfa: 'Greater Manchester',
                  codes: {
                    admin_district: 'E08000010',
                    admin_county: 'E99999999',
                    admin_ward: 'E05000845',
                    parish: 'E43000164',
                    parliamentary_constituency: 'E14000580',
                    ccg: 'E38000205',
                    ccg_id: '02H',
                    ced: 'E99999999',
                    nuts: 'TLD36',
                    lsoa: 'E01006241',
                    msoa: 'E02001303',
                    lau2: 'E08000010',
                    pfa: 'E23000005',
                  },
                  distance: 76.40229254,
                },
                {
                  postcode: 'M46 9NX',
                  quality: 1,
                  eastings: 367245,
                  northings: 404384,
                  country: 'England',
                  nhs_ha: 'North West',
                  longitude: -2.495666,
                  latitude: 53.535078,
                  european_electoral_region: 'North West',
                  primary_care_trust: 'Ashton, Leigh and Wigan',
                  region: 'North West',
                  lsoa: 'Wigan 017C',
                  msoa: 'Wigan 017',
                  incode: '9NX',
                  outcode: 'M46',
                  parliamentary_constituency: 'Bolton West',
                  admin_district: 'Wigan',
                  parish: 'Wigan, unparished area',
                  admin_county: null,
                  date_of_introduction: '199405',
                  admin_ward: 'Atherton',
                  ced: null,
                  ccg: 'NHS Greater Manchester',
                  nuts: 'Greater Manchester North West',
                  pfa: 'Greater Manchester',
                  codes: {
                    admin_district: 'E08000010',
                    admin_county: 'E99999999',
                    admin_ward: 'E05000845',
                    parish: 'E43000164',
                    parliamentary_constituency: 'E14000580',
                    ccg: 'E38000205',
                    ccg_id: '02H',
                    ced: 'E99999999',
                    nuts: 'TLD36',
                    lsoa: 'E01006241',
                    msoa: 'E02001303',
                    lau2: 'E08000010',
                    pfa: 'E23000005',
                  },
                  distance: 82.28672453,
                },
                {
                  postcode: 'M46 9NU',
                  quality: 1,
                  eastings: 367171,
                  northings: 404476,
                  country: 'England',
                  nhs_ha: 'North West',
                  longitude: -2.496792,
                  latitude: 53.535901,
                  european_electoral_region: 'North West',
                  primary_care_trust: 'Ashton, Leigh and Wigan',
                  region: 'North West',
                  lsoa: 'Wigan 017C',
                  msoa: 'Wigan 017',
                  incode: '9NU',
                  outcode: 'M46',
                  parliamentary_constituency: 'Bolton West',
                  admin_district: 'Wigan',
                  parish: 'Wigan, unparished area',
                  admin_county: null,
                  date_of_introduction: '199405',
                  admin_ward: 'Atherton',
                  ced: null,
                  ccg: 'NHS Greater Manchester',
                  nuts: 'Greater Manchester North West',
                  pfa: 'Greater Manchester',
                  codes: {
                    admin_district: 'E08000010',
                    admin_county: 'E99999999',
                    admin_ward: 'E05000845',
                    parish: 'E43000164',
                    parliamentary_constituency: 'E14000580',
                    ccg: 'E38000205',
                    ccg_id: '02H',
                    ced: 'E99999999',
                    nuts: 'TLD36',
                    lsoa: 'E01006241',
                    msoa: 'E02001303',
                    lau2: 'E08000010',
                    pfa: 'E23000005',
                  },
                  distance: 85.98655766,
                },
              ],
            },
          ],
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 200 null for invalid postcode', async () => {
      // given
      const request = {
        postcodes: ['Plop'],
      };
      const scope = nock(basePath)
        .post('/postcodes', request)
        .reply(200, {
          status: 200,
          result: [
            {
              query: 'Plop',
              result: null,
            },
          ],
        });

      // when
      const response = postcodesApi.bulkPostcodeLookupOrBulkReverseGeocoding(
        {},
        request
      );

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: [
            {
              query: 'Plop',
              result: null,
            },
          ],
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 200 null for empty string postcode', async () => {
      // given
      const request = {
        postcodes: [''],
      };
      const scope = nock(basePath)
        .post('/postcodes', request)
        .reply(200, {
          status: 200,
          result: [
            {
              query: '',
              result: null,
            },
          ],
        });

      // when
      const response = postcodesApi.bulkPostcodeLookupOrBulkReverseGeocoding(
        {},
        request
      );

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: [
            {
              query: '',
              result: null,
            },
          ],
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });

  describe('postcodeLookup', () => {
    it('should return PostcodeData for valid postcode', async () => {
      // given
      const postcode = 'AB15 6DH';
      const scope = nock(basePath)
        .get(`/postcodes/${encodeURIComponent(postcode)}`)
        .reply(200, {
          status: 200,
          result: {
            postcode: 'AB15 6DH',
            quality: 1,
            eastings: 391109,
            northings: 805979,
            country: 'Scotland',
            nhs_ha: 'Grampian',
            longitude: -2.148567,
            latitude: 57.1446,
            european_electoral_region: 'Scotland',
            primary_care_trust: 'Aberdeen City Community Health Partnership',
            region: null,
            lsoa: 'Hazlehead - 03',
            msoa: 'Hazlehead',
            incode: '6DH',
            outcode: 'AB15',
            parliamentary_constituency: 'Aberdeen South',
            admin_district: 'Aberdeen City',
            parish: null,
            admin_county: null,
            date_of_introduction: '199606',
            admin_ward: 'Hazlehead/Queens Cross/Countesswells',
            ced: null,
            ccg: 'Aberdeen City Community Health Partnership',
            nuts: 'Aberdeen City and Aberdeenshire',
            pfa: 'Scotland',
            codes: {
              admin_district: 'S12000033',
              admin_county: 'S99999999',
              admin_ward: 'S13002844',
              parish: 'S99999999',
              parliamentary_constituency: 'S14000002',
              ccg: 'S03000012',
              ccg_id: '012',
              ced: 'S99999999',
              nuts: 'TLM50',
              lsoa: 'S01006549',
              msoa: 'S02001243',
              lau2: 'S30000026',
              pfa: 'S23000009',
            },
          },
        });

      // when
      const response = postcodesApi.postcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: {
            postcode: 'AB15 6DH',
            quality: 1,
            eastings: 391109,
            northings: 805979,
            country: 'Scotland',
            nhs_ha: 'Grampian',
            longitude: -2.148567,
            latitude: 57.1446,
            european_electoral_region: 'Scotland',
            primary_care_trust: 'Aberdeen City Community Health Partnership',
            region: null,
            lsoa: 'Hazlehead - 03',
            msoa: 'Hazlehead',
            incode: '6DH',
            outcode: 'AB15',
            parliamentary_constituency: 'Aberdeen South',
            admin_district: 'Aberdeen City',
            parish: null,
            admin_county: null,
            date_of_introduction: '199606',
            admin_ward: 'Hazlehead/Queens Cross/Countesswells',
            ced: null,
            ccg: 'Aberdeen City Community Health Partnership',
            nuts: 'Aberdeen City and Aberdeenshire',
            pfa: 'Scotland',
            codes: {
              admin_district: 'S12000033',
              admin_county: 'S99999999',
              admin_ward: 'S13002844',
              parish: 'S99999999',
              parliamentary_constituency: 'S14000002',
              ccg: 'S03000012',
              ccg_id: '012',
              ced: 'S99999999',
              nuts: 'TLM50',
              lsoa: 'S01006549',
              msoa: 'S02001243',
              lau2: 'S30000026',
              pfa: 'S23000009',
            },
          },
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 404 error for invalid postcode', async () => {
      // given
      const postcode = 'Plop';
      const scope = nock(basePath)
        .get(`/postcodes/${encodeURIComponent(postcode)}`)
        .reply(404, {
          status: 404,
          error: 'Invalid postcode',
        });

      // when
      const response = postcodesApi.postcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Invalid postcode',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });

  describe('postcodeAutocomplete', () => {
    it('should return list of matching postcodes', async () => {
      // given
      const postcode = 'TA11 7Y';
      const scope = nock(basePath)
        .get(`/postcodes/${encodeURIComponent(postcode)}/autocomplete`)
        .reply(200, {
          status: 200,
          result: ['TA11 7YU'],
        });

      // when
      const response = postcodesApi.postcodeAutocomplete({postcode});

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: ['TA11 7YU'],
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 200 null for invalid postcode', async () => {
      // given
      const postcode = 'Plop';
      const scope = nock(basePath)
        .get(`/postcodes/${encodeURIComponent(postcode)}/autocomplete`)
        .reply(200, {
          status: 200,
          result: null,
        });

      // when
      const response = postcodesApi.postcodeAutocomplete({postcode});

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: null,
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });

  describe('nearestPostcode', () => {
    it('should return list of PostcodeData for valid postcode', async () => {
      // given
      const postcode = 'BH21 7AT';
      const scope = nock(basePath)
        .get(`/postcodes/${encodeURIComponent(postcode)}/nearest`)
        .reply(200, {
          status: 200,
          result: [
            {
              postcode: 'BH21 7AT',
              quality: 1,
              eastings: 402917,
              northings: 101363,
              country: 'England',
              nhs_ha: 'South West',
              longitude: -1.959965,
              latitude: 50.811811,
              european_electoral_region: 'South West',
              primary_care_trust: 'Dorset',
              region: 'South West',
              lsoa: 'East Dorset 007B',
              msoa: 'East Dorset 007',
              incode: '7AT',
              outcode: 'BH21',
              parliamentary_constituency: 'Mid Dorset and North Poole',
              admin_district: 'Dorset',
              parish: 'Colehill',
              admin_county: null,
              date_of_introduction: '198001',
              admin_ward: 'Colehill & Wimborne Minster East',
              ced: null,
              ccg: 'NHS Dorset',
              nuts: 'Dorset',
              pfa: 'Dorset',
              codes: {
                admin_district: 'E06000059',
                admin_county: 'E99999999',
                admin_ward: 'E05012691',
                parish: 'E04012462',
                parliamentary_constituency: 'E14000815',
                ccg: 'E38000045',
                ccg_id: '11J',
                ced: 'E99999999',
                nuts: 'TLK25',
                lsoa: 'E01020379',
                msoa: 'E02004249',
                lau2: 'E06000059',
                pfa: 'E23000039',
              },
              distance: 0,
            },
            {
              postcode: 'BH21 7AX',
              quality: 1,
              eastings: 402951,
              northings: 101327,
              country: 'England',
              nhs_ha: 'South West',
              longitude: -1.959483,
              latitude: 50.811487,
              european_electoral_region: 'South West',
              primary_care_trust: 'Dorset',
              region: 'South West',
              lsoa: 'East Dorset 007B',
              msoa: 'East Dorset 007',
              incode: '7AX',
              outcode: 'BH21',
              parliamentary_constituency: 'Mid Dorset and North Poole',
              admin_district: 'Dorset',
              parish: 'Colehill',
              admin_county: null,
              date_of_introduction: '198001',
              admin_ward: 'Colehill & Wimborne Minster East',
              ced: null,
              ccg: 'NHS Dorset',
              nuts: 'Dorset',
              pfa: 'Dorset',
              codes: {
                admin_district: 'E06000059',
                admin_county: 'E99999999',
                admin_ward: 'E05012691',
                parish: 'E04012462',
                parliamentary_constituency: 'E14000815',
                ccg: 'E38000045',
                ccg_id: '11J',
                ced: 'E99999999',
                nuts: 'TLK25',
                lsoa: 'E01020379',
                msoa: 'E02004249',
                lau2: 'E06000059',
                pfa: 'E23000039',
              },
              distance: 49.52999179,
            },
          ],
        });

      // when
      const response = postcodesApi.nearestPostcode({postcode});

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: [
            {
              postcode: 'BH21 7AT',
              quality: 1,
              eastings: 402917,
              northings: 101363,
              country: 'England',
              nhs_ha: 'South West',
              longitude: -1.959965,
              latitude: 50.811811,
              european_electoral_region: 'South West',
              primary_care_trust: 'Dorset',
              region: 'South West',
              lsoa: 'East Dorset 007B',
              msoa: 'East Dorset 007',
              incode: '7AT',
              outcode: 'BH21',
              parliamentary_constituency: 'Mid Dorset and North Poole',
              admin_district: 'Dorset',
              parish: 'Colehill',
              admin_county: null,
              date_of_introduction: '198001',
              admin_ward: 'Colehill & Wimborne Minster East',
              ced: null,
              ccg: 'NHS Dorset',
              nuts: 'Dorset',
              pfa: 'Dorset',
              codes: {
                admin_district: 'E06000059',
                admin_county: 'E99999999',
                admin_ward: 'E05012691',
                parish: 'E04012462',
                parliamentary_constituency: 'E14000815',
                ccg: 'E38000045',
                ccg_id: '11J',
                ced: 'E99999999',
                nuts: 'TLK25',
                lsoa: 'E01020379',
                msoa: 'E02004249',
                lau2: 'E06000059',
                pfa: 'E23000039',
              },
              distance: 0,
            },
            {
              postcode: 'BH21 7AX',
              quality: 1,
              eastings: 402951,
              northings: 101327,
              country: 'England',
              nhs_ha: 'South West',
              longitude: -1.959483,
              latitude: 50.811487,
              european_electoral_region: 'South West',
              primary_care_trust: 'Dorset',
              region: 'South West',
              lsoa: 'East Dorset 007B',
              msoa: 'East Dorset 007',
              incode: '7AX',
              outcode: 'BH21',
              parliamentary_constituency: 'Mid Dorset and North Poole',
              admin_district: 'Dorset',
              parish: 'Colehill',
              admin_county: null,
              date_of_introduction: '198001',
              admin_ward: 'Colehill & Wimborne Minster East',
              ced: null,
              ccg: 'NHS Dorset',
              nuts: 'Dorset',
              pfa: 'Dorset',
              codes: {
                admin_district: 'E06000059',
                admin_county: 'E99999999',
                admin_ward: 'E05012691',
                parish: 'E04012462',
                parliamentary_constituency: 'E14000815',
                ccg: 'E38000045',
                ccg_id: '11J',
                ced: 'E99999999',
                nuts: 'TLK25',
                lsoa: 'E01020379',
                msoa: 'E02004249',
                lau2: 'E06000059',
                pfa: 'E23000039',
              },
              distance: 49.52999179,
            },
          ],
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 404 error for invalid postcode', async () => {
      // given
      const postcode = 'Plop';
      const scope = nock(basePath)
        .get(`/postcodes/${encodeURIComponent(postcode)}/nearest`)
        .reply(404, {
          status: 404,
          error: 'Postcode not found',
        });

      // when
      const response = postcodesApi.nearestPostcode({postcode});

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Postcode not found',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });

  describe('postcodeValidation', () => {
    it('should return true for valid postcode', async () => {
      // given
      const postcode = 'CW6 0EF';
      const scope = nock(basePath)
        .get(`/postcodes/${encodeURIComponent(postcode)}/validate`)
        .reply(200, {
          status: 200,
          result: true,
        });

      // when
      const response = postcodesApi.postcodeValidation(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: true,
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return false for invalid postcode', async () => {
      // given
      const postcode = 'Plop';
      const scope = nock(basePath)
        .get(`/postcodes/${encodeURIComponent(postcode)}/validate`)
        .reply(200, {
          status: 200,
          result: false,
        });

      // when
      const response = postcodesApi.postcodeValidation(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: false,
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });

  describe('reverseGeocodingLegacy', () => {
    it('should return list of PostcodeData for matching lon/lat', async () => {
      // given
      const longitude = -3.924229;
      const latitude = 51.923369;
      const scope = nock(basePath)
        .get(`/postcodes/lon/${longitude}/lat/${latitude}`)
        .reply(200, {
          status: 200,
          result: [
            {
              postcode: 'SA19 7BR',
              quality: 1,
              eastings: 267774,
              northings: 226733,
              country: 'Wales',
              nhs_ha: 'Hywel Dda University Health Board',
              longitude: -3.924229,
              latitude: 51.923369,
              european_electoral_region: 'Wales',
              primary_care_trust: 'Hywel Dda University Health Board',
              region: null,
              lsoa: 'Carmarthenshire 004D',
              msoa: 'Carmarthenshire 004',
              incode: '7BR',
              outcode: 'SA19',
              parliamentary_constituency: 'Carmarthen East and Dinefwr',
              admin_district: 'Carmarthenshire',
              parish: 'Manordeilo and Salem',
              admin_county: null,
              date_of_introduction: '198001',
              admin_ward: 'Manordeilo and Salem',
              ced: null,
              ccg: 'Hywel Dda University',
              nuts: 'South West Wales',
              pfa: 'Dyfed-Powys',
              codes: {
                admin_district: 'W06000010',
                admin_county: 'W99999999',
                admin_ward: 'W05001216',
                parish: 'W04000546',
                parliamentary_constituency: 'W07000067',
                ccg: 'W11000025',
                ccg_id: '7A2',
                ced: 'W99999999',
                nuts: 'TLL14',
                lsoa: 'W01000709',
                msoa: 'W02000145',
                lau2: 'W06000010',
                pfa: 'W15000004',
              },
              distance: 0,
            },
          ],
        });

      // when
      const response = postcodesApi.reverseGeocodingLegacy({
        longitude,
        latitude,
      });

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: [
            {
              postcode: 'SA19 7BR',
              quality: 1,
              eastings: 267774,
              northings: 226733,
              country: 'Wales',
              nhs_ha: 'Hywel Dda University Health Board',
              longitude: -3.924229,
              latitude: 51.923369,
              european_electoral_region: 'Wales',
              primary_care_trust: 'Hywel Dda University Health Board',
              region: null,
              lsoa: 'Carmarthenshire 004D',
              msoa: 'Carmarthenshire 004',
              incode: '7BR',
              outcode: 'SA19',
              parliamentary_constituency: 'Carmarthen East and Dinefwr',
              admin_district: 'Carmarthenshire',
              parish: 'Manordeilo and Salem',
              admin_county: null,
              date_of_introduction: '198001',
              admin_ward: 'Manordeilo and Salem',
              ced: null,
              ccg: 'Hywel Dda University',
              nuts: 'South West Wales',
              pfa: 'Dyfed-Powys',
              codes: {
                admin_district: 'W06000010',
                admin_county: 'W99999999',
                admin_ward: 'W05001216',
                parish: 'W04000546',
                parliamentary_constituency: 'W07000067',
                ccg: 'W11000025',
                ccg_id: '7A2',
                ced: 'W99999999',
                nuts: 'TLL14',
                lsoa: 'W01000709',
                msoa: 'W02000145',
                lau2: 'W06000010',
                pfa: 'W15000004',
              },
              distance: 0,
            },
          ],
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 200 null for non-matching lon/lat', async () => {
      // given
      const longitude = 0;
      const latitude = 0;
      const scope = nock(basePath)
        .get(`/postcodes/lon/${longitude}/lat/${latitude}`)
        .reply(200, {
          status: 200,
          result: null,
        });

      // when
      const response = postcodesApi.reverseGeocodingLegacy({
        longitude,
        latitude,
      });

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: null,
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });
});
