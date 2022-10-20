import { ProfileEntity } from '../entities';

export class AccountFollowersInfoResponseEdgeNode extends ProfileEntity {
  followed_by_viewer: boolean;
  full_name: string;
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  requested_by_viewer: false;
  username: string;
}

export interface AccountFollowersInfoResponseEdge {
  node: AccountFollowersInfoResponseEdgeNode;
}

export interface AccountFollowersInfoResponsePageInfo {
  end_cursor: string;
  has_next_page: boolean;
}

export interface AccountFollowersInfoResponse {
  data: {
    user: {
      edge_followed_by: {
        count: number;
        edges: AccountFollowersInfoResponseEdge[];
        page_info: AccountFollowersInfoResponsePageInfo;
      };
    };
  };
}
