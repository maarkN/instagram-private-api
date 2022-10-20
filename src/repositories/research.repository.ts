import { Repository } from '../core/repository';

export class ResearchRepository extends Repository {
  public async graphQL<T extends { data: any }>(profileId: string): Promise<T> {
    const { body } = await this.client.request.send<T>(
      {
        url: '/graphql/query/',
        method: 'GET',
        qs: {
          query_hash: '37479f2b8209594dde7facb0d904896a',
          variables: {
            id: profileId,
            first: 50,
            after: 'params',
          },
        },
      },
      true,
    );
    return body;
  }
}
