import {ApiError} from './errors';
import {
  Api,
  Configuration,
  OutcodesApi,
  PlacesApi,
  PostcodesApi,
} from './openapi';

class PostcodesIO {
  private _outcodesApi: OutcodesApi;
  private _placesApi: PlacesApi;
  private _postcodesApi: PostcodesApi;

  constructor(configuration?: Configuration) {
    this._outcodesApi = new OutcodesApi(configuration);
    this._placesApi = new PlacesApi(configuration);
    this._postcodesApi = new PostcodesApi(configuration);
  }

  /**
   * Accepts an array of postcodes. Returns a list of matching postcodes and
   * respective available data. Accepts up to 100 postcodes.
   *
   * @summary Bulk Postcode Lookup
   * @param {string[]} postcodes List of postcodes
   * @param {Pick<PostcodesApi.BulkPostcodeLookupOrBulkReverseGeocodingParameters, 'filter'>} [options] Optional options
   * @param {string} [options.filter] A comma separated whitelist of attributes to be returned in the result object(s), e.g. `postcode,longitude,latitude`.
   * @returns {Promise<Api.BulkPostcodeLookupResultItem[]>} List of BulkPostcodeLookupResultItem
   */
  async bulkPostcodeLookup(
    postcodes: string[],
    options?: Pick<
      PostcodesApi.BulkPostcodeLookupOrBulkReverseGeocodingParameters,
      'filter'
    >
  ): Promise<Api.BulkPostcodeLookupResultItem[]> {
    try {
      const requestBody = {postcodes};
      const params: PostcodesApi.BulkPostcodeLookupOrBulkReverseGeocodingParameters =
        {
          ...options,
        };
      const response =
        await this._postcodesApi.bulkPostcodeLookupOrBulkReverseGeocoding(
          params,
          requestBody
        );
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result as Api.BulkPostcodeLookupResultItem[];
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Bulk translates geolocations into Postcodes. Accepts up to 100 geolocations.
   *
   * @summary Bulk Reverse Geocoding
   * @param {Geolocation[]} geolocations List of geolocations
   * @param {Omit<PostcodesApi.BulkPostcodeLookupOrBulkReverseGeocodingParameters, 'filter'>} [options] Optional options
   * @param {number} [options.limit] Limits number of postcodes matches to return. Defaults to 10. Needs to be less than 100.
   * @param {number} [options.radius] Limits number of postcodes matches to return. Defaults to 100m. Needs to be less than 2,000m.
   * @param {boolean} [options.widesearch] Applies a global widesearch parameter to all geolocation lookup objects. Defaults to `false`.
   * @returns {Promise<Api.BulkReverseGeocodingResultItem[]>} List of BulkReverseGeocodingResultItem
   */
  async bulkReverseGeocoding(
    geolocations: Api.Geolocation[],
    options?: Omit<
      PostcodesApi.BulkPostcodeLookupOrBulkReverseGeocodingParameters,
      'filter'
    >
  ): Promise<Api.BulkReverseGeocodingResultItem[]> {
    try {
      const requestBody = {geolocations};
      const params: PostcodesApi.BulkPostcodeLookupOrBulkReverseGeocodingParameters =
        {
          ...options,
        };
      const response =
        await this._postcodesApi.bulkPostcodeLookupOrBulkReverseGeocoding(
          params,
          requestBody
        );
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result as Api.BulkReverseGeocodingResultItem[];
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Returns nearest outcodes for a given outcode.
   *
   * @summary Nearest Outcode
   * @param {string} outcode The outward code is the part of the postcode before the single space in the middle.
   * @param {Omit<OutcodesApi.NearestOutcodeParameters, 'outcode'>} [options] Optional options
   * @param {number} [options.limit] Limits number of outcodes matches to return. Defaults to 10. Needs to be less than 100.
   * @param {number} [options.radius] Limits number of outcodes matches to return. Defaults to 100m. Needs to be less than 2,000m.
   * @returns {Promise<Api.OutcodeData[]>} List of OutcodeData
   */
  async nearestOutcode(
    outcode: string,
    options?: Omit<OutcodesApi.NearestOutcodeParameters, 'outcode'>
  ): Promise<Api.OutcodeData[]> {
    try {
      const params: OutcodesApi.NearestOutcodeParameters = {
        ...{outcode},
        ...options,
      };
      const response = await this._outcodesApi.nearestOutcode(params);
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Returns nearest postcodes for a given postcode.
   *
   * @summary Nearest Postcode
   * @param {string} postcode All current (‘live’) postcodes within the United Kingdom, the Channel Islands and the Isle of Man.
   * @param {Omit<PostcodesApi.NearestPostcodeParameters, 'postcode'>} [options] Optional options
   * @param {number} [options.limit] Limits number of postcodes matches to return. Defaults to 10. Needs to be less than 100.
   * @param {number} [options.radius] Limits number of postcodes matches to return. Defaults to 100m. Needs to be less than 2,000m.
   * @returns {Promise<Api.PostcodeData[]>} List of PostcodeData
   */
  async nearestPostcode(
    postcode: string,
    options?: Omit<PostcodesApi.NearestPostcodeParameters, 'postcode'>
  ): Promise<Api.PostcodeDataReverseGeocoding[]> {
    try {
      const params: PostcodesApi.NearestPostcodeParameters = {
        ...{postcode},
        ...options,
      };
      const response = await this._postcodesApi.nearestPostcode(params);
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Returns nearest outcodes for a given longitude and latitude.
   *
   * @summary Outcode Reverse Geocoding
   * @param {number} lon Longitude
   * @param {number} lat Latitude
   * @param {Omit<OutcodesApi.OutcodeReverseGeocodingParameters, 'lon' | 'lat'>} [options] Optional options
   * @param {number} [options.limit] Limits number of outcodes matches to return. Defaults to 10. Needs to be less than 100.
   * @param {number} [options.radius] Limits number of outcodes matches to return. Defaults to 5000m. Needs to be less than 25,000m.
   * @returns {Promise<Api.OutcodeData[]>} List of OutcodeData
   */
  async outcodeReverseGeocoding(
    lon: number,
    lat: number,
    options?: Omit<OutcodesApi.OutcodeReverseGeocodingParameters, 'lon' | 'lat'>
  ): Promise<Api.OutcodeData[]> {
    try {
      const params: OutcodesApi.OutcodeReverseGeocodingParameters = {
        ...{lon, lat},
        ...options,
      };
      const response = await this._outcodesApi.outcodeReverseGeocoding(params);
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Geolocation data for the centroid of the outward code specified. The
   * outward code represents the first half of any postcode (separated by a
   * space).
   *
   * @summary Outward Code Lookup
   * @param {string} outcode Outward code (first part of postcode)
   * @returns {Promise<Api.OutcodeData} OutcodeData
   */
  async outwardCodeLookup(outcode: string): Promise<Api.OutcodeData> {
    try {
      const response = await this._outcodesApi.outwardCodeLookup(outcode);
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Submit a place query and receive a complete list of places matches and associated data.
   *
   * @summary Place Query
   * @param {string} query Postcode search (prefix match)
   * @param {Omit<PlacesApi.PlaceQueryParameters, 'q' | 'query'>} [options]
   * @param {number} [options.limit] Limits number of places matches to return. Defaults to 10. Needs to be less than 100.
   * @returns {Promise<Api.PlacesData[]>} List of PlacesData
   */
  async placeQuery(
    query: string,
    options?: Omit<PlacesApi.PlaceQueryParameters, 'q' | 'query'>
  ): Promise<Api.PlacesData[]> {
    try {
      const params: PlacesApi.PlaceQueryParameters = {
        ...{query},
        ...options,
      };
      const response = await this._placesApi.placeQuery(params);
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Find a place by OSGB code (e.g. "osgb4000000074564391").
   * Returns all available data if found.
   *
   * @summary Place Lookup
   * @param {string} code A unique identifier that enables records to be identified easily. The identifier will be persistent for all LocalTypes except Section of Named Road and Section of Numbered Road.
   * @returns {Promise<Api.PlacesData>} PlacesData
   */
  async placeLookup(code: string): Promise<Api.PlacesData> {
    try {
      const response = await this._placesApi.placeLookup(code);
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Convenience method to return a list of matching postcodes.
   *
   * @summary Postcode Autocomplete
   * @param {string} postcode Postcode search (prefix match)
   * @param {Omit<PostcodesApi.PostcodeAutocompleteParameters, 'postcode'>} [options] Optional options
   * @param {number} [options.limit] Limits number of postcodes matches to return. Defaults to 10. Needs to be less than 100.
   * @returns {Promise<string[]>} List of postcodes
   */
  async postcodeAutocomplete(
    postcode: string,
    options?: Omit<PostcodesApi.PostcodeAutocompleteParameters, 'postcode'>
  ): Promise<string[]> {
    try {
      const params: PostcodesApi.PostcodeAutocompleteParameters = {
        ...{postcode},
        ...options,
      };
      const response = await this._postcodesApi.postcodeAutocomplete(params);
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * This uniquely identifies a postcode.
   *
   * Returns a single postcode entity for a given postcode (case, space insensitive).
   *
   * @summary Postcode Lookup
   * @param {string} postcode All current (‘live’) postcodes within the United Kingdom, the Channel Islands and the Isle of Man.
   * @returns {Api.PostcodeData} PostcodeData
   */
  async postcodeLookup(postcode: string): Promise<Api.PostcodeData> {
    try {
      const response = await this._postcodesApi.postcodeLookup(postcode);
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Submit a postcode query and receive a complete list of postcode matches and
   * all associated postcode data.
   *
   * This is essentially a postcode search which prefix matches and returns
   * postcodes in sorted order (case insensitive).
   *
   * This is space sensitive, i.e. it detects for spaces between outward and
   * inward parts of the postcode.
   *
   * The result set can either be empty or populated with up to 100 postcode entities.
   *
   * @summary Postcode Query
   * @param {string} query Postcode search (prefix match)
   * @param {Omit<PostcodesApi.ReverseGeocodingOrPostcodeQueryParameters, 'lon' | 'lat' | 'q' | 'query'>} [options] Optional options
   * @param {number} [options.limit] Limits number of postcodes matches to return. Defaults to 10. Needs to be less than 100.
   * @param {number} [options.radius] Limits number of postcodes matches to return. Defaults to 100m. Needs to be less than 2,000m.
   * @param {boolean} [options.widesearch] Search up to 20km radius, but subject to a maximum of 10 results. Since lookups over a wide area can be very expensive, we've created this method to allow you choose to make the trade off between search radius and number of results. Defaults to false. When enabled, radius and limits over 10 are ignored.
   * @returns {Promise<Api.PostcodeDataReverseGeocoding[]>} List of PostcodeDataReverseGeocoding
   */
  async postcodeQuery(
    query: string,
    options?: Omit<
      PostcodesApi.ReverseGeocodingOrPostcodeQueryParameters,
      'lon' | 'lat' | 'q' | 'query'
    >
  ): Promise<Api.PostcodeData[]> {
    try {
      const params: PostcodesApi.ReverseGeocodingOrPostcodeQueryParameters = {
        ...{query},
        ...options,
      };
      const response = await this._postcodesApi.reverseGeocodingOrPostcodeQuery(
        params
      );
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Convenience method to validate a postcode.
   *
   * @summary Postcode Validation
   * @param {string} postcode All current (‘live’) postcodes within the United Kingdom, the Channel Islands and the Isle of Man.
   * @returns {Promise<boolean>} true or false (meaning valid or invalid respectively)
   */
  async postcodeValidation(postcode: string): Promise<boolean> {
    try {
      const response = await this._postcodesApi.postcodeValidation(postcode);
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        typeof response.body.result === 'boolean'
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Returns a random place and all associated data
   *
   * @summary Random Place
   * @returns {Promise<Api.PlacesData>} PlacesData
   */
  async randomPlace(): Promise<Api.PlacesData> {
    try {
      const response = await this._placesApi.randomPlace();
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Returns a random postcode and all available data for that postcode.
   *
   * @summary Random Postcode
   * @param {string} [outcode] Filters random postcodes by outcode.
   * @returns {Promise<Api.PostcodeData>} PostcodeData
   */
  async randomPostcode(outcode?: string): Promise<Api.PostcodeData> {
    try {
      const response = await this._postcodesApi.randomPostcode(outcode);
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Returns nearest postcodes for a given longitude and latitude.
   *
   * @summary Reverse Geocoding
   * @param {number} lon Longitude
   * @param {number} lat Latitude
   * @param {Omit<PostcodesApi.ReverseGeocodingOrPostcodeQueryParameters, 'lon' | 'lat' | 'q' | 'query'>} [options] Optional options
   * @param {number} [options.limit] Limits number of postcodes matches to return. Defaults to 10. Needs to be less than 100.
   * @param {number} [options.radius] Limits number of postcodes matches to return. Defaults to 100m. Needs to be less than 2,000m.
   * @param {boolean} [options.widesearch] Search up to 20km radius, but subject to a maximum of 10 results. Since lookups over a wide area can be very expensive, we&#39;ve created this method to allow you choose to make the trade off between search radius and number of results. Defaults to false. When enabled, radius and limits over 10 are ignored.
   * @returns {Promise<Api.PostcodeData[]>} List of PostcodeData
   */
  async reverseGeocoding(
    lon: number,
    lat: number,
    options?: Omit<
      PostcodesApi.ReverseGeocodingOrPostcodeQueryParameters,
      'lon' | 'lat' | 'q' | 'query'
    >
  ): Promise<Api.PostcodeData[]> {
    try {
      const params: PostcodesApi.ReverseGeocodingOrPostcodeQueryParameters = {
        ...{lon, lat},
        ...options,
      };
      const response = await this._postcodesApi.reverseGeocodingOrPostcodeQuery(
        params
      );
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Returns nearest postcodes for a given longitude and latitude.
   *
   * @summary Reverse Geocoding (Legacy)
   * @param {number} longitude Longitude
   * @param {number} latitude Latitude
   * @param {Omit<PostcodesApi.ReverseGeocodingLegacyParameters, 'longitude' | 'latitude'>} [options] Optional options
   * @param {number} [options.limit] Limits number of postcodes matches to return. Defaults to 10. Needs to be less than 100.
   * @param {number} [options.radius] Limits number of postcodes matches to return. Defaults to 100m. Needs to be less than 2,000m.
   * @param {boolean} [options.widesearch] Search up to 20km radius, but subject to a maximum of 10 results. Since lookups over a wide area can be very expensive, we&#39;ve created this method to allow you choose to make the trade off between search radius and number of results. Defaults to false. When enabled, radius and limits over 10 are ignored.
   * @returns {Promise<Api.PostcodeDataReverseGeocoding[]>} List of PostcodeDataReverseGeocoding
   */
  async reverseGeocodingLegacy(
    longitude: number,
    latitude: number,
    options?: Omit<
      PostcodesApi.ReverseGeocodingLegacyParameters,
      'longitude' | 'latitude'
    >
  ): Promise<Api.PostcodeDataReverseGeocoding[]> {
    try {
      const params: PostcodesApi.ReverseGeocodingLegacyParameters = {
        ...{longitude, latitude},
        ...options,
      };
      const response = await this._postcodesApi.reverseGeocodingLegacy(params);
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Lookup a Scottish postcode. Returns SPD data associated with postcode.
   * At the moment this is just Scottish Parliamentary Constituency.
   *
   * @summary Scottish Postcode Lookup
   * @param {string} postcode Scottish postcode
   * @returns {Promise<Api.ScottishPostcodeData>} ScottishPostcodeData
   */
  async scottishPostcodeLookup(
    postcode: string
  ): Promise<Api.ScottishPostcodeData> {
    try {
      const response = await this._postcodesApi.scottishPostcodeLookup(
        postcode
      );
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Lookup a terminated postcode. Returns the postcode, year and month of
   * termination.
   *
   * @summary Terminated Postcode Lookup
   * @param {string} postcode Teriminated postcode
   * @returns {Promise<Api.TerminatedPostcodeData>} TerminatedPostcodeData
   */
  async terminatedPostcodeLookup(
    postcode: string
  ): Promise<Api.TerminatedPostcodeData> {
    try {
      const response = await this._postcodesApi.terminatedPostcodeLookup(
        postcode
      );
      if (
        response.status === 200 &&
        response.body.status === 200 &&
        response.body.result
      ) {
        return response.body.result;
      } else {
        throw new ApiError(
          `Unsuccessful HTTP response: Status ${
            response.status
          }, Body: ${JSON.stringify(response.body)}`
        );
      }
    } catch (error) {
      throw this.getApiError(error);
    }
  }

  /**
   * Get ApiError or wrap a different thrown type with ApiError
   *
   * @param {unknown} error ApiError or unknown
   * @returns {ApiError} ApiError or ApiError with cause (i.e. wrapped)
   */
  private getApiError(error: unknown): ApiError {
    if (error instanceof ApiError) {
      return error;
    } else {
      return new ApiError('Exception thrown during API call', {cause: error});
    }
  }
}

module.exports = PostcodesIO;
export default PostcodesIO;
