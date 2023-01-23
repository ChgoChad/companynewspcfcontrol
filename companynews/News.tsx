// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { NewsItemProps } from "./NewsItemComponent";
import { Constants } from "./Constants";
import { BingParser } from "./BingParser";
import { GoogleParser } from "./GoogleParser";

export class News {
  private _apiKey: string;
  private _baseUrl: string;
  private _useBingWebSearch: boolean;
  private _searchUrl: string;

  public constructor(apiKey: string, baseUrl: string, useBingWebSearch: boolean = true) {
    this._apiKey = apiKey;
    this._baseUrl = baseUrl;
    this._useBingWebSearch = useBingWebSearch;
  }

  
/**
 * getNews queries the appropriate Bing API to retrieve news items 
 * @param {string} searchString
 * @param {string} [apiKey=""]
 * @param {boolean} searchOrNews
 * @return {*}  {Promise<NewsItemProps[]>}
 * @memberof News
 */
public async getNews(searchString: string, apiKey: string = "", searchOrNews: boolean): Promise<NewsItemProps[]> {
    let newsItemsList: NewsItemProps[];
    let constants = new Constants();
    let requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Ocp-Apim-Subscription-Key", this._apiKey);

    // determine which Bing source to use
    if (this._useBingWebSearch) {
      // Get the Bing News Search UR  (the URL before the | )
      this._searchUrl = this._baseUrl.split("|", 2)[0]  
    } else {
      // Get the Bing Web Search URL (the URL after the | )
      this._searchUrl = this._baseUrl.split("|", 2)[1]
    }
  
    let uriQuery: string = this._searchUrl + "?count=" + constants.Count + "&q=" + searchString;

    // Build Google Search URL
      if (constants.NewsSource == "Google") {
      uriQuery =
        this._baseUrl +
        "?count=" +
        constants.Count +
        "&q=" +
        searchString +
        "&token=" +
        apiKey;
    }

    // Make WebAPI call and parse result as json
    const res = await fetch(uriQuery, {
      method: "GET",
      headers: requestHeaders,
    });
    const data = await res.json();

    // If Bing parse with Bing News parser
    if (constants.NewsSource == "Bing") {
      let news: BingParser = new BingParser(data, this._useBingWebSearch);
      newsItemsList = news.getNews();
    } else {
      // Parse with Gooogle Parser
      let news: GoogleParser = new GoogleParser(data);
      newsItemsList = news.getNews();
    }

    return newsItemsList;
  }
}
