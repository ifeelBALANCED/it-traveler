import { getElysiaDocumentation as getClient } from './client'

export type {
  PostApiAuthRegisterResult,
  PostApiAuthLoginResult,
  PostApiAuthLogoutResult,
  GetApiAuthMeResult,
  GetApiUsersResult,
  GetApiUsersByIdResult,
  GetApiUsersByIdMarkersResult,
  PutApiUsersProfileResult,
  PutApiUsersPasswordResult,
  DeleteApiUsersAccountResult,
  GetApiMarkersResult,
  PostApiMarkersResult,
  GetApiMarkersByIdResult,
  PutApiMarkersByIdResult,
  DeleteApiMarkersByIdResult,
  GetApiMarkersMyMarkersResult,
} from './client'

export const apiClient = getClient()
