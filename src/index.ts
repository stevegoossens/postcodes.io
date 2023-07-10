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
