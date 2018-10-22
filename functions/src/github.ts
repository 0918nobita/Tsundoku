import { githubConfig } from "./config";
import axios from "axios";

export const _getGitHubAuthorizationURL = () => {
  return `https://github.com/login/oauth/authorize?client_id=${
    githubConfig.clientId
  }&scope=repo`;
};

export const _getGitHubAccessToken = async (code: string) => {
  try {
    const result = (await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        code,
        ...githubConfig
      }
    )).data;
    return result["access_token"];
  } catch (error) {
    console.error(error);
    return null;
  }
};
