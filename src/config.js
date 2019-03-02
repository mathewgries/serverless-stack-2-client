const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-td94aqr3rxim"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://wp80tb0qi9.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_x51EASujh",
    APP_CLIENT_ID: "7r7gio6uk2cr7in3c4l6echuej",
    IDENTITY_POOL_ID: "us-east-1:c59a8718-1971-4cc6-8203-e3e67e40c6e5"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1ntci1x6gkqo6"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://x9arg1vqei.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_VlGHkJb6q",
    APP_CLIENT_ID: "56g7a95cs66fbt6qe404486jdp",
    IDENTITY_POOL_ID: "us-east-1:c30a4486-7bb1-4799-adbe-f2507ceefd3b"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};