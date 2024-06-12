import GitHubProvider from 'next-auth/providers/github';

export const githubProviderOptions = {
  clientId: process.env.GITHUB_ID ?? "",
  clientSecret: process.env.GITHUB_SECRET ?? "",
};

export const providerOptions = [
  GitHubProvider(githubProviderOptions)
];