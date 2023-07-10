import {
  Api,
  Configuration,
  OutcodesApi,
  PlacesApi,
  PostcodesApi,
  RandomApi,
  ScotlandApi,
  TerminatedPostcodesApi,
} from './openapi';

export class PostcodesIO {
  private _outcodesApi: OutcodesApi
  private _placesApi: PlacesApi
  private _postcodesApi: PostcodesApi
  private _randomApi: RandomApi
  private _scotlandApi: ScotlandApi
  private _terminatedPostcodesApi: TerminatedPostcodesApi

  constructor(configuration?: Configuration) {
    this._outcodesApi = new OutcodesApi(configuration)
    this._placesApi = new PlacesApi(configuration)
    this._postcodesApi = new PostcodesApi(configuration)
    this._randomApi = new RandomApi(configuration)
    this._scotlandApi = new ScotlandApi(configuration)
    this._terminatedPostcodesApi = new TerminatedPostcodesApi(configuration)
  }

  async bulkPostcodeLookup(
    postcodes: string[],
    options?: Pick<PostcodesApi.BulkPostcodeLookupOrBulkReverseGeocodingParameters, 'filter'>
  ): Promise<Api.PostcodeData[] | undefined> {
    const requestBody = { postcodes }
    const params: PostcodesApi.BulkPostcodeLookupOrBulkReverseGeocodingParameters = {
      ...options,
    }
    const response = await this._postcodesApi.bulkPostcodeLookupOrBulkReverseGeocoding(
      params,
      requestBody
    )
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }

  async bulkReverseGeocoding(
    geolocations: Api.Geolocation[],
    options?: Omit<PostcodesApi.BulkPostcodeLookupOrBulkReverseGeocodingParameters, 'filter'>
  ): Promise<Api.PostcodeData[] | undefined> {
    const requestBody = { geolocations }
    const params: PostcodesApi.BulkPostcodeLookupOrBulkReverseGeocodingParameters = {
      ...options,
    }
    const response = await this._postcodesApi.bulkPostcodeLookupOrBulkReverseGeocoding(
      params,
      requestBody
    )
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }

  async nearestOutcode(
      outcode: string,
      options?: Omit<OutcodesApi.NearestOutcodeParameters, 'outcode'>
  ): Promise<Api.OutcodeData[] | undefined> {
    const params: OutcodesApi.NearestOutcodeParameters = {
      ...{ outcode },
      ...options,
    }
    const response = await this._outcodesApi.nearestOutcode(params)
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }

  async outcodeReverseGeocoding(
    lon: number,
    lat: number,
    options?: Omit<OutcodesApi.OutcodeReverseGeocodingParameters, 'lon' | 'lat'>
  ): Promise<Api.OutcodeData[] | undefined> {
    const params: OutcodesApi.OutcodeReverseGeocodingParameters = {
      ...{ lon, lat },
      ...options,
    }
    const response = await this._outcodesApi.outcodeReverseGeocoding(params)
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }

  async placeQuery(
    query: string,
    options?: Omit<PlacesApi.PlaceQueryParameters, 'q' | 'query'>
  ): Promise<Api.PlacesData[] | undefined> {
    const params: PlacesApi.PlaceQueryParameters = {
      ...{ query },
      ...options,
    }
    const response = await this._placesApi.placeQuery(params)
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }

  async placeLookup(code: string): Promise<Api.PlacesData | undefined> {
    const response = await this._placesApi.placeLookup(code)
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }

  async postcodeLookup(postcode: string) {
    const response = await this._postcodesApi.postcodeLookup(postcode)
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }

  async postcodeQuery(
    query: string,
    options?: Omit<PostcodesApi.ReverseGeocodingOrPostcodeQueryParameters, 'lon' | 'lat' | 'q' | 'query'>
  ): Promise<Api.PostcodeData[] | undefined> {
    const params: PostcodesApi.ReverseGeocodingOrPostcodeQueryParameters = {
      ...{ query },
      ...options,
    }
    const response = await this._postcodesApi.reverseGeocodingOrPostcodeQuery(params)
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }

  async randomPlace(): Promise<Api.PlacesData | undefined> {
    const response = await this._randomApi.randomPlace()
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }

  async randomPostcode(outcode?: string): Promise<Api.PostcodeData | undefined> {
    const response = await this._randomApi.randomPostcode(outcode)
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }

  async reverseGeocoding(
    lon: number,
    lat: number,
    options?: Omit<PostcodesApi.ReverseGeocodingOrPostcodeQueryParameters, 'lon' | 'lat' | 'q' | 'query'>
  ): Promise<Api.PostcodeData[] | undefined> {
    const params: PostcodesApi.ReverseGeocodingOrPostcodeQueryParameters = {
      ...{ lon, lat },
      ...options,
    }
    const response = await this._postcodesApi.reverseGeocodingOrPostcodeQuery(params)
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }

  async scottishPostcodeLookup(postcode: string): Promise<Api.ScottishPostcodeData | undefined> {
    const response = await this._scotlandApi.scottishPostcodeLookup(postcode)
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }

  async terminatedPostcodeLookup(postcode: string): Promise<Api.TerminatedPostcodeData | undefined> {
    const response = await this._terminatedPostcodesApi.terminatedPostcodeLookup(postcode)
    if (response.status === 200 && response.body.status === 200 && response.body.result) {
      return response.body.result
    }
  }
}
