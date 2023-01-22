// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as moment from "moment";
import { Constants } from "./Constants";
import { NewsItemProps } from "./NewsItemComponent";

export class BingParser {
  private _newsJson: any;
  private _newsOrSearch: boolean;

  constructor(json: any, newsOrSearch: boolean) {
    this._newsJson = json;
    this._newsOrSearch = newsOrSearch;
  }


  public getNews(): NewsItemProps[] {
    var newsItems: NewsItemProps[] = [];

    // no news
    if (
      this._newsJson == null ||
      this._newsJson.value == null ||
      this._newsJson.value == 0
    ) {
      return newsItems;
    }

    if (this._newsOrSearch) {
        // Bing News Search
        // iterate over all news items
        for (var i = 0; i < this._newsJson.value.length; i++) {
            // todo: limit count
            var newsItem = {} as NewsItemProps;

            // if there is no image in the newsitem use the image from the Constants class (which is base64 encoded)
            // otherwise use the image from the newsItem
            if (this._newsJson.value[i].image == null) {
              newsItem.imageUrl = Constants.bingTileJpg;
              newsItem.imageName = "";
            } else {
              newsItem.imageUrl = this._newsJson.value[i].image.thumbnail.contentUrl;
              newsItem.imageName = this._newsJson.value[i].name;
            }
            
            //newsItem.imageName   = this._newsJson.value[i].image.thumbnail.name === null ? "" : 
            newsItem.title       = this._newsJson.value[i].name;
            newsItem.newsContent = this._newsJson.value[i].description;
            newsItem.url         = this._newsJson.value[i].url;
            newsItem.source      = this.getHost(newsItem.url);
            newsItem.category    = this._newsJson.value[i].category !== null ? this._newsJson.value[i].category : "";
            newsItem.agoTime     = this.getTimeAgo(new Date(this._newsJson.value[i].datePublished));

            newsItems.push(newsItem);
        }
      
    } else {
            // Bing Web Search
            // iterate over all news items
            for (var i = 0; i < this._newsJson.value.length; i++) {
              // todo: limit count
              var newsItem = {} as NewsItemProps;
  
              // if there is no image in the newsitem use the image from the Constants class (which is base64 encoded)
              // otherwise use the image from the newsItem
              if (this._newsJson.value[i].thumbnailUrl == null) {
                newsItem.imageUrl = Constants.bingTileJpg;
                newsItem.imageName = "";
              } else {
                newsItem.imageUrl = this._newsJson.value[i].thumbnailUrl;
                newsItem.imageName = this._newsJson.value[i].name;
              }
              
              //newsItem.imageName   = this._newsJson.value[i].image.thumbnail.name === null ? "" : 
              newsItem.title       = this._newsJson.value[i].name;
              newsItem.newsContent = this._newsJson.value[i].snippet;
              newsItem.url         = this._newsJson.value[i].url;
              newsItem.source      = this.getHost(newsItem.url);
              newsItem.category    = this._newsJson.value[i].category !== null ? this._newsJson.value[i].category : "";
              newsItem.agoTime     = this.getTimeAgo(new Date(this._newsJson.value[i].dateLastCrawled));
  
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
