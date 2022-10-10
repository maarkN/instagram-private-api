import { Feed } from '../core/feed';
import { Expose, plainToClassFromExist } from 'class-transformer';
import { AccountFollowersInfoResponse, AccountFollowersInfoResponseEdgeNode } from '../responses';

export class AccountFollowersInfoFeed extends Feed<AccountFollowersInfoResponse, AccountFollowersInfoResponseEdgeNode> {
  id: number | string;
  @Expose()
  public nextPageToken: string;

  set state(body: AccountFollowersInfoResponse) {
    this.moreAvailable = !!body?.data.user?.edge_followed_by?.page_info?.has_next_page;
    this.nextPageToken = body?.data.user?.edge_followed_by?.page_info?.end_cursor;
  }

  async request() {
    const { body } = await this.client.request.send<AccountFollowersInfoResponse>({
      url: '/graphql/query/',
      qs: {
        query_hash: '37479f2b8209594dde7facb0d904896a',
        variables: {
          id: this.id,
          first: 50,
          after: this.nextPageToken,
        },
      },
    });
    this.state = body;
    return body;
  }

  async items() {
    const body = await this.request();
    const items = body.data.user.edge_followed_by.edges;
    return items.map(item => plainToClassFromExist(new AccountFollowersInfoResponseEdgeNode(this.client), item.node));
  }
}
