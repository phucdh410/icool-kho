global.isDev = process.env.NODE_ENV === "development";
if (process.env.NODE_ENV === "production") global.buildAt = new Date();
global.api = process.env.REACT_APP_API_URL;
global.token = process.env.REACT_APP_TOKEN;
global.avatar_uri = process.env.REACT_APP_AVATAR_PATH;
