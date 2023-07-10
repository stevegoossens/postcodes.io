import { describe, expect, it } from '@jest/globals';

import { Configuration, ConfigurationParameters } from '../../src/openapi/configuration';

describe('configuration', () => {
  it('can instantiate without params', () => {
    // given

    // when
    const config = new Configuration()

    // then
    expect(config).toEqual({
      apiKey: undefined,
      username: undefined,
      password: undefined,
      authorization: undefined,
      basePath: undefined,
    })
  })

  it('can instantiate with params', () => {
    // given
    const params: ConfigurationParameters = {
      apiKey: 'blahplop',
      username: 'user1',
      password: 'brilliantpassword',
      authorization: 'what',
      basePath: 'yeah',
    }

    // when
    const config = new Configuration(params)

    // then
    expect(config).toEqual({
      apiKey: 'blahplop',
      username: 'user1',
      password: 'brilliantpassword',
      authorization: 'what',
      basePath: 'yeah',
    })
  })
})
