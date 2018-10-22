import { githubConfig } from "./config";
import axios from 'axios';

export const _getGitHubAuthorizationURL = () => {
  return `https://github.com/login/oauth/authorize?client_id=${
      githubConfig.clientId
      }&scope=repo`;
};
