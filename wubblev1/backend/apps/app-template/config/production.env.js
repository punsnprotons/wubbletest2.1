const selfsigned = require("selfsigned");
const pems = selfsigned.generate(null, { days: 3650, algorithm: "sha256" });
process.env['NODE_TLS_REJECT_UNAUTHORIZED']=0

module.exports = {
  //Vendure Db (main)
  KNEXFILE: {
    client: "mysql",
    connection: {
      host: "157.230.32.184",
      port: "3306",
      user: "root",
      password: "", 
      database: "wubble_db4",
      timezone: "Z",
    },
    useNullAsDefault: true,
  },

  OPENAI_API_KEY: "sk-proj-IH1B1iBjxH90JuLiqHeAT3BlbkFJ6LGFyxsNKmwpSpydAbKK",
  PINECONE_API_KEY: "e0bb5cf5-5862-487a-bc9a-d98668ce15af",
  CONTEXT_MAX: 2000,
  RYTR_API_KEY: "2U1O8HFK2V9SI_SFAB1DD",

  JWT_REFRESH_STORE: "keyv",

  AUTH_USER_STORE_NAME: "user",
  AUTH_USER_FIELDS_JWT_PAYLOAD: "email,role,userId",
  AUTH_USER_FIELD_GAKEY: "otp_secret",

  STOREFRONT: "",

  //SENDGRID
  SENDGRID_KEY: "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",
  SENDGRID_SENDER: "hello@wubble.ai",
  SENDGRID_DEFAULT_TEMPLATE: "d-dfec15e0fbe54372bf4e3a7121479301",

  //Aliyun
  OSS_ACCESS_ID: "LTAI5t7xpA6VJZwJSJMngBLH",
  OSS_ACCESS_KEY: "tMB1p2iHW7WdnUPVWeIBR23ij07y16",
  OSS_BUCKET: "wubble-fs-master",

  USE_GRAPHQL: false,
  CORS_ORIGINS: [
    "http://localhost:8080",
    "http://localhost:8081",
    "http://127.0.0.1:8080",
    "http://www.wubble.ai",
    "https://www.wubble.ai"
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

  VITE_WWW_URL: "https://www.wubble.ai",

  //vision@visiongroup.co : dmlzaW9uQHZpc2lvbmdyb3VwLmNv:A67iDezQy-if3r-fOcVDx
  //tech@visiongroup.co : dGVjaEB2aXNpb25ncm91cC5jbw:F_cqCmilThWJNTwRtzEwW
  // demo@visiongroup.co : ZGVtb0B2aXNpb25ncm91cC5jbw:iTQToEmczamHgr5_ndeXa
  DID_APIKEY: "dGVjaEB2aXNpb25ncm91cC5jbw:F_cqCmilThWJNTwRtzEwW",
  //DID_APIKEY: 'a2VuLmhhcmp1bmErMTAwQHZpc2lvbmdyb3VwLmNv:psJLqeFhCY28JETT8jBcr',
  DID_AVATAR_SOURCE: "https://i.postimg.cc/fy59Ph8n/o-prud3nce.jpg",

  // NOTE! in secret
  // KNEXFILE: null,
  // GCP_SERVICE_KEY: null,
  // OAUTH_OPTIONS: null,
  // FCM_SERVER_KEY: '', // Generated from firebase web dashboard

  HTTPS_CERTS: { 
    key: // pems.private,
`-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJoUn1oc0fQ26C
sgD2F9RjczPo50GwIhrqCGB/BTkTdtoUm2oADhCdKi4xdjxB1VGVz0O8SEIJJW4J
KsxDeT1pet3MO+JN4igMiK/eXNOAhCVOLeU/WWe6jfRamVq38T8rDWtp5YFTuCMr
3lyBIgSdLG1e7SzCdB5BW1JQezzLKAUwoZDuJc2hs+zieB9MbUMOiUd/B4JFpn4i
NCql4L/eHkjpd/QSRQDVfVOT1TfeLDL8xGZUHVEHBMYW5HFS1LBKElb4a2QGGMKE
XV18zOlh0H1GzwWxv4w2Pq/l/3BQ2iidGuK6AuOativm8myZEKtKJct1v3abf9Gq
tmANnmmPAgMBAAECggEAUVOPA1Zp6AxIzMqDfL+L2TkkXPK6GhMHjBIo6dLvfJxZ
xioRjUgfB2V2EFlCYMNsDuL0zULP7+R7B5ONpEGItbzrLW+SDhwET1nqpeQHIzUp
3ujAKNck8ahEQS7N2peiBPl6s9HwYhZJiW49HZDdD5BV5Q4BGcXAVlhBUVkD4mTf
i8zNXbD0q03tDZjmtpEzV6ldDHE48HweLAXBiWxfSgMrEC9E5SnMxzDGODZX0LpH
Eqzbqn9daahp5ngPWz9RUhEL0rahw7xinkHf3JdW+UfzAiGG5VmSxMqb6eo1woSG
Rs6FDwoPvA8+k8xG865ugB+ORA/xhV2hFXW4totEYQKBgQD+kqwgHZ0uKIOhij0I
d+pld8VD/GVG89rLPlXDfW+ddluIJDfWvkX/trN4g3If3HQQWWbKiLV/5EWwpUkE
sVDsyqNjKe+7YPkZdwevRu5y/AHdQH8a2gRnJKdXeJRBDaih8gKs4dzQ2ePGt8NX
ofyCxeD8J+q8YiBPcBO/0LQFSQKBgQDKwqPnwTqjzz1EoNOFKTtlFghSP0QG4/aY
QaJ/uc6fI05pk9s2BPbA9eempFdlBt7bGWamjPMtfx5sF5SWufihc/uXehaCXkow
9UYMb6KT6PcLnl965poUrdPY6o+BL6+mNSEy5447ckBxlvldShSy5xu0e06tvOCe
Od8/zBJwFwKBgQCpVlNcwZYugBCfQd87ZNjsSfFUOe38dnVRwNM3yJaYPYTBWKY0
GDlj0dosDfO6MeCah32St8FTozqgODIMBw73lAt/CQRItka8o6re8uXmYq+yxxZF
fER1f7I4wyKK61UC9ILHES7bVjTnmJE+F6hqLMptsPe5++PWM41PiLpW0QKBgAfI
uSoojOvFBQEhe31dO96BnggqTZ5GGi12N5rXs0sAu/3pozzLq/10c1Q+cux5+wxG
SV6TgrJ4ct6LeTTgJt9r6HjEQyD2JbsDb5ECqCcthm53wgqh18B7e+qT9rZq8j9b
Qs8FfLxjgn3Z4fDm6yyDGtku8rJQ0f7BEgUM/Jg5AoGBAL/agBX2XMpwJcAWSBrg
lUVaIwIIhlrxspUxrVppWRBK0/CUxYjjyGTH6NgaBiIYFUjsOMXgrio93wGlifPt
5rhVPo4LrITnmVf/YGyFV9nk3JTmgzp6x9Pn0zT3kXPdMr1u3pGtrKW0mLauX9hp
y/NPEH5G0pnEs1Gh+g142IvF
-----END PRIVATE KEY-----`,
    cert: // pems.cert
`-----BEGIN CERTIFICATE-----
MIIGNTCCBR2gAwIBAgIQb8/Kdi3pArWHt9QOFSGxIjANBgkqhkiG9w0BAQsFADCB
jzELMAkGA1UEBhMCR0IxGzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4G
A1UEBxMHU2FsZm9yZDEYMBYGA1UEChMPU2VjdGlnbyBMaW1pdGVkMTcwNQYDVQQD
Ey5TZWN0aWdvIFJTQSBEb21haW4gVmFsaWRhdGlvbiBTZWN1cmUgU2VydmVyIENB
MB4XDTI0MDEyOTAwMDAwMFoXDTI1MDEyOTIzNTk1OVowGDEWMBQGA1UEAxMNYXBp
Lnd1YmJsZS5haTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMmhSfWh
zR9DboKyAPYX1GNzM+jnQbAiGuoIYH8FORN22hSbagAOEJ0qLjF2PEHVUZXPQ7xI
QgklbgkqzEN5PWl63cw74k3iKAyIr95c04CEJU4t5T9ZZ7qN9FqZWrfxPysNa2nl
gVO4IyveXIEiBJ0sbV7tLMJ0HkFbUlB7PMsoBTChkO4lzaGz7OJ4H0xtQw6JR38H
gkWmfiI0KqXgv94eSOl39BJFANV9U5PVN94sMvzEZlQdUQcExhbkcVLUsEoSVvhr
ZAYYwoRdXXzM6WHQfUbPBbG/jDY+r+X/cFDaKJ0a4roC45q2K+bybJkQq0oly3W/
dpt/0aq2YA2eaY8CAwEAAaOCAwEwggL9MB8GA1UdIwQYMBaAFI2MXsRUrYrhd+mb
+ZsF4bgBjWHhMB0GA1UdDgQWBBQHmjOCy7Pgo69csBehc6QyLwLYbTAOBgNVHQ8B
Af8EBAMCBaAwDAYDVR0TAQH/BAIwADAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYB
BQUHAwIwSQYDVR0gBEIwQDA0BgsrBgEEAbIxAQICBzAlMCMGCCsGAQUFBwIBFhdo
dHRwczovL3NlY3RpZ28uY29tL0NQUzAIBgZngQwBAgEwgYQGCCsGAQUFBwEBBHgw
djBPBggrBgEFBQcwAoZDaHR0cDovL2NydC5zZWN0aWdvLmNvbS9TZWN0aWdvUlNB
RG9tYWluVmFsaWRhdGlvblNlY3VyZVNlcnZlckNBLmNydDAjBggrBgEFBQcwAYYX
aHR0cDovL29jc3Auc2VjdGlnby5jb20wKwYDVR0RBCQwIoINYXBpLnd1YmJsZS5h
aYIRd3d3LmFwaS53dWJibGUuYWkwggF9BgorBgEEAdZ5AgQCBIIBbQSCAWkBZwB2
AM8RVu7VLnyv84db2Wkum+kacWdKsBfsrAHSW3fOzDsIAAABjVLRot0AAAQDAEcw
RQIgTi9nYv3e4LgxyxrXqocX2FR4eZ0VlN4yl0BAddnpcrYCIQDw0Z1wjN71/KGb
OA7PPyRnTB70AbRuzQNbpePn38J2sgB2AKLjCuRF772tm3447Udnd1PXgluElNcr
XhssxLlQpEfnAAABjVLRowsAAAQDAEcwRQIgG1ns5Y/cELuBZjA2belIl1Bsb+b6
2xQxTdllyGKuq+UCIQDe8XerCOQSh+wEk3V5NdjZN1yw466bAqTfKpJvQPHzBQB1
AE51oydcmhDDOFts1N8/Uusd8OCOG41pwLH6ZLFimjnfAAABjVLRorgAAAQDAEYw
RAIgLD6cdoGUSJUgU+27iUNL5Ylb0TdHPIfUKQXPn7BnoekCIFWbE/wzQQgT2IMi
HNffL+RaNhxrCVycWBIapbItvujjMA0GCSqGSIb3DQEBCwUAA4IBAQB6gsjEYy8e
+74nOOq09JwRyNJdxWvWVRpA+SPXogGJQqBmYfDSIPK9qSEN+ZDED2l7EgMwwybn
4RpXTG3ZHzlgg1c1CWbF/95GMgaMIl1D4JyX5lpimQ5T0uYL4h3Wj4XuSZS0LJHS
Wt2aWuQULQMuPCq3/HbWGpSHctaoqeFLBGPdjTRh3PUHFDzx3pegNKj0FZQ+QYSy
g9ss6UW358VLaPseci7hMt51VR9soSGNJPbF60ewGuGUvLUxMNoCTlZRDWYs6+27
RcQqIqI2lfKdKzB7Dm7HApry315D19H+QegEgtBA8nVEAcZfYob6unS0/74W4fPw
VHTTRPzRrUPB
-----END CERTIFICATE-----`
  },
};
