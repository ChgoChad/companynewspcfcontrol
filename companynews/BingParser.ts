// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as moment from "moment";
import { Constants } from "./Constants";
import { NewsItemProps } from "./NewsItemComponent";

export class BingParser {
  private _apiJson: any;
  private _newsOrSearch: boolean;

  constructor(json: any, newsOrSearch: boolean) {
    this._apiJson = json;
    this._newsOrSearch = newsOrSearch;
  }


  public getNews(): NewsItemProps[] {
    var newsItems: NewsItemProps[] = [];
    console.log(this._apiJson);
    

    if (this._newsOrSearch) {

      // Bing News Search
      // no news
      if (
        this._apiJson == null ||
        this._apiJson.value == null ||
        this._apiJson.value == 0
      ) {
        return newsItems;
      }

      // iterate over all news items
      for (var i = 0; i < this._apiJson.value.length; i++) {
        // todo: limit count
        var newsItem = {} as NewsItemProps;

        // if there is no image in the newsitem use the image from the Constants class (which is base64 encoded)
        // otherwise use the image from the newsItem
        if (this._apiJson.value[i].image == null) {
          newsItem.imageUrl = Constants.bingTileJpg;
          newsItem.imageName = "";
        } else {
          newsItem.imageUrl = this._apiJson.value[i].image.thumbnail.contentUrl;
          newsItem.imageName = this._apiJson.value[i].name;
        }

        //newsItem.imageName   = this._newsJson.value[i].image.thumbnail.name === null ? "" :
        newsItem.title = this._apiJson.value[i].name;
        newsItem.newsContent = this._apiJson.value[i].description;
        newsItem.url = this._apiJson.value[i].url;
        newsItem.source = this.getHost(newsItem.url);
        newsItem.category =
          this._apiJson.value[i].category !== null
            ? this._apiJson.value[i].category
            : "";
        newsItem.agoTime = this.getTimeAgo(
          new Date(this._apiJson.value[i].datePublished)
        );

        newsItems.push(newsItem);
      }
    } else {
      // Bing Web Search

      // no news
      if (
          this._apiJson == null ||
          this._apiJson.webPages.value == null ||
          this._apiJson.webPages.value == 0
        ) {
        return newsItems;
      }

      // iterate over all news items
      for (var i = 0; i < this._apiJson.webPages.value.length; i++) {
        // todo: limit count
        var newsItem = {} as NewsItemProps;

        // if there is no image in the newsitem use the image from the Constants class (which is base64 encoded)
        // otherwise use the image from the newsItem
        if (this._apiJson.webPages.value[i].thumbnailUrl == null) {
          newsItem.imageUrl = Constants.bingTileJpg;
          newsItem.imageName = "";
        } else {
          newsItem.imageUrl = this._apiJson.webPages.value[i].thumbnailUrl;
          newsItem.imageName = this._apiJson.webPages.value[i].name;
        }

        //newsItem.imageName   = this._newsJson.value[i].image.thumbnail.name === null ? "" :
        newsItem.title = this._apiJson.webPages.value[i].name;
        newsItem.newsContent = this._apiJson.webPages.value[i].snippet;
        newsItem.url = this._apiJson.webPages.value[i].url;
        newsItem.source = this.getHost(newsItem.url);
        newsItem.category =
          this._apiJson.webPages.value[i].category !== null
            ? this._apiJson.webPages.value[i].category
            : "";
        newsItem.agoTime = this.getTimeAgo(
          new Date(this._apiJson.webPages.value[i].dateLastCrawled)
        );

        newsItems.push(newsItem);
      }
    }
    return newsItems;
    
  }    


  private getTimeAgo(date: Date): string {
    let publishedDate: any = moment(date);
    let currentTime = moment();

    let diff         = currentTime.diff(publishedDate);
    let diffDuration = moment.duration(diff);
    let diffDays     = diffDuration.days();
    let diffHrs      = diffDuration.hours();
    let diffMins     = diffDuration.minutes();

    let dateString = "";
    if (diffDays != 0) {
      dateString = diffDays + " days";
    } else if (diffHrs != 0) {
      dateString = diffHrs + " hours";
    } else if (diffMins != 0) {
      dateString = diffMins + " minutes";
    }

    return dateString + " ago";
  }


  private getHost(url: any) {
    return url
      .replace(/<\/?b>/g, "")
      .replace(/^https?:\/\//, "")
      .split("/")[0]
      .replace(/^www\./, "");
  }
}
