import React from "react";
import ReactDOMServer from "react-dom/server";
import { applyMiddleware, createStore } from "redux";
import { RouterContext, match, createMemoryHistory } from "react-router";
import { Provider } from "react-redux";
import acceptLanguage from "accept-language";
// Redux Middleware
import * as ReactRouterRedux from "react-router-redux";
import thunkMiddleware from "redux-thunk";
// helpers
import { staticHTMLWrapper } from "./helpers/htmlWrapper";
import CssInjector, { css } from "./helpers/cssInjector";
import EnvChecker from "./helpers/envChecker";
// root reducer
import { rootReducer, initialState } from "./rootReducer";
// routes
import createRoute from "./routes";
// deploy
import fs from "fs";
import * as DeployConfig from "../sls/config";
// i18n
import ConnectedIntlProvider from "./components/connectedIntlProvider";

const history = createMemoryHistory();
const routerMid = ReactRouterRedux.routerMiddleware(history);

// Create store
const AppInitialState = initialState;

const store = createStore(
  rootReducer,
  AppInitialState,
  applyMiddleware(routerMid, thunkMiddleware)
);
const routes = createRoute(store);

export async function serverSideRender(requestUrl, scriptPath, userLocale) {
  let renderedHTML;
  let stringifiedInitialReduxState;

  await new Promise((resolve, reject) => {
    match(
      { routes, location: requestUrl },
      (error, redirectLocation, renderProps) => {
        if (error) {
          console.log(error);
          reject(error);
        } else if (redirectLocation) {
          resolve();
          // TODO: do redirect and give 302
        } else if (renderProps) {
          stringifiedInitialReduxState = JSON.stringify(store.getState());

          try {
            renderedHTML = ReactDOMServer.renderToString(
              <CssInjector>
                <Provider store={store}>
                  <ConnectedIntlProvider userLocale={userLocale}>
                    <RouterContext {...renderProps} />
                  </ConnectedIntlProvider>
                </Provider>
              </CssInjector>
            );
          } catch (e) {
            console.log(e);
            reject(e);
          }
          resolve(renderedHTML);
        } else {
          console.log("404 Error");
          reject(new Error("404x"));
        }
      }
    );
  });

  const cssArr = Array.from(css);
  const fullHTML = await staticHTMLWrapper(
    renderedHTML,
    scriptPath,
    stringifiedInitialReduxState,
    cssArr.join("")
  );
  return fullHTML;
}

// Lambda Handler
export async function handler(event, context) {
  if (EnvChecker.isServer()) {
    const LAMBDA_FUNCTION_NAME = "frontRender";
    const path = event.path;
    const version = fs.readFileSync("./version");

    const requestPath = path.replace(`/${LAMBDA_FUNCTION_NAME}`, "");
    acceptLanguage.languages(["en-US", "ko-KR"]);
    const userLocale = acceptLanguage.get(event.headers["Accept-Language"]);

    try {
      const bundledJsForBrowserPath = `https://d146wza8np03cp.cloudfront.net/${DeployConfig.AWS_S3_FOLDER_PREFIX}/${version}/bundleBrowser.js`;
      const response = await serverSideRender(
        requestPath,
        bundledJsForBrowserPath,
        userLocale
      );

      context.succeed({
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*"
        },
        body: response
      });
    } catch (e) {
      console.error(e);
      console.error(e.message);
      context.succeed({
        statusCode: 500,
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*"
        },
        body: e.message
      });
    }
  }
}
