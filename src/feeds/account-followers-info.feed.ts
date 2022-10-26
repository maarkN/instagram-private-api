import { Feed } from '../core/feed';
import { Expose, plainToClassFromExist } from 'class-transformer';
import { AccountFollowersInfoResponse, AccountFollowersInfoResponseEdgeNode } from '../responses';
import { AccountFollowersInfoFeedPageInfoOptions } from 'src/types/account-followers-feed.options';

export class AccountFollowersInfoFeed extends Feed<AccountFollowersInfoResponse, AccountFollowersInfoResponseEdgeNode> {
  id: number | string;
  @Expose()
  public nextPageToken?: string;
  @Expose()
  public currentPagePosition: number = 0;

  set state(body: AccountFollowersInfoResponse) {
    this.moreAvailable = !!body?.data.user?.edge_followed_by?.page_info?.has_next_page;
    this.nextPageToken = body?.data.user?.edge_followed_by?.page_info?.end_cursor;
    this.currentPagePosition++;
  }

  set pageInfo(pageInfo: AccountFollowersInfoFeedPageInfoOptions) {
    this.nextPageToken = pageInfo.token;
    this.currentPagePosition = pageInfo.position || 0;
  }

  async request() {
    const variables = JSON.stringify({
      id: this.id,
      first: 50,
      after: this.nextPageToken,
    });

    const { body } = await this.client.request.send<AccountFollowersInfoResponse>({
      url: '/graphql/query/',
      qs: {
        query_hash: '37479f2b8209594dde7facb0d904896a',
        variables: variables,
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
