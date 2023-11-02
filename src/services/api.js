/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

const EntityExistsDto = {
  exists: false,
};

const CreateSignRequestDto = {
  walletAddress: "0x00",
  action: "SIGN_UP",
};

const CreateSignRequestResultDto = {
  walletAddress: "0x00",
  action: "SIGN_UP",
  createdAt: "2023-10-16T10:50:36.408Z",
  expiredAt: "2023-10-16T10:50:36.409Z",
  nonce: "",
  message: "",
};

const SignUpDto = {
  username: "username",
  email: "",
};

const SignUpResultDto = {
  signInToken: "",
};

const SignUpExternalDto = {
  username: "username",
  token: "",
};

const SignUpWalletDto = {
  walletAddress: "0x00",
  action: "SIGN_UP",
  createdAt: "2023-10-16T10:50:36.408Z",
  expiredAt: "2023-10-16T10:50:36.409Z",
  username: "username",
  nonce: "",
  signedMessage: "",
};

const SignInDto = {
  includeIdToken: false,
  emailOrUsername: "",
  password: "",
};

const SignInResultDto = {
  signInToken: "",
  idToken: "",
};

const SignInWalletDto = {
  walletAddress: "0x00",
  action: "SIGN_UP",
  createdAt: "2023-10-16T10:50:36.408Z",
  expiredAt: "2023-10-16T10:50:36.409Z",
  signedMessage: "",
  nonce: "",
};

const RequestAccessTokenDto = {
  idToken: "",
};

const RequestAccessTokenResultDto = {
  accessToken: "",
};

const PaginationDto = {
  limit: 10,
  offset: 0,
  total: 0,
  sortBy: "",
};

const PaginatedBaseDto = {
  pagination: PaginationDto,
};

const PermissionDto = {
  id: "",
  isSystemPermission: false,
  code: "",
  module: "",
  sortOrder: 0,
  description: "",
  createdAt: "",
  createdBy: "",
  updatedAt: "",
  updatedBy: "",
};

const CreatePermissionDto = {
  code: "",
  module: "",
  description: "",
  sortOrder: 0,
};

const IdDto = {
  id: "",
};

const UpdatePermissionDto = {
  code: "",
  module: "",
  description: "",
  sortOrder: 0,
};

const GetProfileResultDto = {
  username: "username",
  id: "",
  displayName: "",
  avatarUrl: "",
  email: "",
  firebaseId: "",
  emailVerified: false,
  facebookId: "",
  googleId: "",
  appleId: "",
  accountType: "EMAIL",
  walletAddress: "",
};

const UpdateProfileDto = {
  username: "",
  displayName: "",
};

const LinkWalletDto = {
  walletAddress: "0x00",
  action: "SIGN_UP",
  createdAt: "2023-10-16T10:50:36.408Z",
  expiredAt: "2023-10-16T10:50:36.409Z",
  signedMessage: "",
  nonce: "",
};

const RoleDto = {
  isDefault: false,
  id: "",
  name: "",
  description: "",
  isSystemRole: false,
  status: "ACTIVE",
  createdAt: "",
  createdBy: "",
  updatedAt: "",
  updatedBy: "",
};

const RoleDetailDto = {
  isDefault: false,
  permissions: [],
  id: "",
  name: "",
  description: "",
  isSystemRole: false,
  status: "ACTIVE",
  createdAt: "",
  createdBy: "",
  updatedAt: "",
  updatedBy: "",
};

const CreateRoleDto = {
  isDefault: false,
  name: "",
  description: "",
  status: "ACTIVE",
};

const UpdateRoleDto = {
  isDefault: false,
  name: "",
  description: "",
  status: "ACTIVE",
  permissions: [],
};

const CheckDto = {
  status: "",
};

const axios = require("axios");

const QueryParamsType = {};

const FullRequestParams = {};

const RequestParams = {};

const ApiConfig = {};

const ContentType = {
  Json: "application/json",
  FormData: "multipart/form-data",
  UrlEncoded: "application/x-www-form-urlencoded",
  Text: "text/plain",
};

const Api = {
  api: {
    authUserExists: (query, params) => {},
    authWalletAddressExists: (query, params) => {},
    authEmailExists: (query, params) => {},
    authCreateSignRequest: (data, params) => {},
    authSignUp: (data, params) => {},
    authSignUpExternal: (data, params) => {},
    authSignUpWallet: (data, params) => {},
    authSignIn: (data, params) => {},
    authSignInWallet: (data, params) => {},
    authRequestAccessToken: (data, params) => {},
    permissionsFind: (query, params) => {},
    permissionsCreate: (data, params) => {},
    permissionsFindOne: (id, query, params) => {},
    permissionsUpdate: (id, data, params) => {},
    permissionsRemove: (id, params) => {},
    profileGet: (params) => {},
    profileUpdate: (data, params) => {},
  },
};
