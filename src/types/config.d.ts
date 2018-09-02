declare module '*/config.json' {
  interface Config {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
  }

  const value: Config;
  export = value;
}
