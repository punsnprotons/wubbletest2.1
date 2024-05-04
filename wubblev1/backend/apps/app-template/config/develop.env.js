console.log("development.env.js loaded");

const selfsigned = require("selfsigned");
const pems = selfsigned.generate(null, { days: 3650, algorithm: "sha256" });

module.exports = {
  //Vendure Db (main)
  KNEXFILE: {
    client: "mysql",
    connection: {
      host: "157.230.32.184",
      port: "3000",
      user: "root",
      password: "", 
      database: "wubble_db4",
      timezone: "Z",
    },
    useNullAsDefault: true,
  },

  OPENAI_API_KEY: "sk-proj-sk-proj-IH1B1iBjxH90JuLiqHeAT3BlbkFJ6LGFyxsNKmwpSpydAbKK",
  PINECONE_API_KEY: "23d444b5-d38a-40d7-bd6a-74b5b3a3c674",
  CONTEXT_MAX: 2000,
  RYTR_API_KEY: "2U1O8HFK2V9SI_SFAB1DD",

  JWT_REFRESH_STORE: "keyv",

  AUTH_USER_STORE_NAME: "user",
  AUTH_USER_FIELDS_JWT_PAYLOAD: "email,role,userId",
  AUTH_USER_FIELD_GAKEY: "otp_secret",

  STOREFRONT: "",

  //SENDGRID
  SENDGRID_KEY:
    "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",
  SENDGRID_SENDER: "tech@visiongroup.co",
  SENDGRID_DEFAULT_TEMPLATE: "d-dfec15e0fbe54372bf4e3a7121479301",

  //Aliyun
  OSS_ACCESS_ID: "LTAI5t7xpA6VJZwJSJMngBLH",
  OSS_ACCESS_KEY: "tMB1p2iHW7WdnUPVWeIBR23ij07y16",
  OSS_BUCKET: "wubble-fs-develop",

  USE_GRAPHQL: false,
  CORS_ORIGINS: [
    "http://localhost:8080",
    "http://localhost:8081",
    "http://127.0.0.1:8080",
    "http://wubble-www-develop.oss-ap-southeast-1.aliyuncs.com",
    "https://wubble-www-develop.oss-ap-southeast-1.aliyuncs.com", // fido2 testing
  ].join(","),

  WEB_STATIC: [], // [] // serve website from folder, blank if do not serve from express. Must be '' if there is PROXY_WWW_ORIGIN

  SAML_DECRYPTION_CERT: { private: "", cert: "" },
  SAML_OPTIONS: null,
  SAML_JWT_MAP: {
    id: "nameID",
    groups: "Role",
  },
  // NOTE: need to setup keycloak for OIDC see readme in docker-devenv folder
  OIDC_OPTIONS: null,

  GCP_DEFAULT_BUCKET: "",

  TEST_ENV: "aaa",
  ENABLE_LOGGER: false,

  VITE_WWW_URL: "http://wubble-www-develop.oss-ap-southeast-1.aliyuncs.com",

  DID_APIKEY: "dGVjaEB2aXNpb25ncm91cC5jbw:F_cqCmilThWJNTwRtzEwW",
  //DID_APIKEY: 'a2VuLmhhcmp1bmErMTAwQHZpc2lvbmdyb3VwLmNv:psJLqeFhCY28JETT8jBcr',
  DID_AVATAR_SOURCE: "https://i.postimg.cc/fy59Ph8n/o-prud3nce.jpg",

  // NOTE! in secret
  // KNEXFILE: null,
  // GCP_SERVICE_KEY: null,
  // OAUTH_OPTIONS: null,
  // FCM_SERVER_KEY: '', // Generated from firebase web dashboard
};
