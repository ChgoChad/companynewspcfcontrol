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

  public constructor(apiKey: string, baseUrl: string, useBingWebSearch: boolean) {
    this._apiKey = apiKey;
    this._baseUrl = baseUrl;
    this._useBingWebSearch = useBingWebSearch;
  }

  public async getNews(searchString: string, apiKey: string = ""): Promise<NewsItemProps[]> {
    let newsItemsList: NewsItemProps[];
    let constants = new Constants();
    let requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Ocp-Apim-Subscription-Key", this._apiKey);
    let uriQuery: string = this._baseUrl + "?count=" + constants.Count + "&q=" + searchString;

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
      let news: BingParser = new BingParser(data);
      newsItemsList = news.getNews();
    } else {
      // Parse with Gooogle Parser
      let news: GoogleParser = new GoogleParser(data);
      newsItemsList = news.getNews();
    }

    return newsItemsList;
  }
}
