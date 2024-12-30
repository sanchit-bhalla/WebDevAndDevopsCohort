// When you have a configuration object that should not be altered after initialization, making it Readonly ensures its properties cannot be changed.
interface Config {
  readonly endpoint: string; // make endpoint readOnly
  apikey: string;
}

const config: Config = {
  endpoint: "https://config.com",
  apikey: "zabzero",
};
config.apikey = "tiddu";
// config.endpoint = "new endpoint" // Cannot assign to 'endpoint' because it is a read-only property.

// Make all properties in Config (T) readonly
const finalConfig: Readonly<Config> = {
  endpoint: "https://api.example.com",
  apikey: "1234abc#",
};

// finalConfig.apikey = "tiddu" // Cannot assign to 'apikey' because it is a read-only property.
