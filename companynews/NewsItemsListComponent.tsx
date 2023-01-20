// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as React from "react";
import { useState } from "react";
import { Constants } from "./Constants";
import { News } from "./News";
import { NewsItemComponent, NewsItemProps } from "./NewsItemComponent";
import { ToggleBase, Toggle } from "@fluentui/react";

export interface NewsItemsListProps {
  apiKey      : string;
  baseUrl     : string;
  searchString: string;
}

export interface NewsItemsProps {
  newsItems: NewsItemProps[]
}

// this hosts a list of news items
export class NewsItemListComponent extends React.Component<NewsItemsListProps, NewsItemsProps> {
  private _apiKey: string;
  private _baseUrl: string;
  private _searchString: string;
  private _searchOrNews: boolean;

  constructor(props: NewsItemsListProps) {
    super(props);

    this._apiKey = props.apiKey;
    this._baseUrl = props.baseUrl;
    this._searchString = props.searchString;

    this.state = {newsItems: []};
  }

  componentDidMount() {
    this.getNews();

  }

  private async getNews(): Promise<void> {
    var news = new News(this._apiKey, this._baseUrl, this._searchOrNews);
    let newsItems: NewsItemProps[] = await news.getNews(this._searchString, this._apiKey);
    this.setState({newsItems});
  }

  public render(): React.ReactNode {
    
    const newsItems = this.state.newsItems.map(
      (newsItem: NewsItemProps, index: number) => {
        return <NewsItemComponent key={index} {...newsItem} />;
      }
    );

    let morenews = "";
    morenews = Constants.MoreNews + "?q=" + this._searchString;

    return (
        <div>
          <div className="Title">
            <h4 id="newsTitle">
              News for &quot;{this.props.searchString}&quot;
            </h4>
          </div>
          <div className="container">
            <Toggle id="searchOrNews" offText="Bing News Search" onText="Bing Web Search" label="Source:" inlineLabel onChange={_onChange} />
          </div>

          {(this.state.newsItems.length == 0)
            ? <div><i>No news found</i></div>
            : <><div className="newsItems">{newsItems}</div><br /><div className="moreNews"><a target="_blank" rel="noreferrer" href={morenews}>See more on Bing News</a></div></>
          }
        </div>
    );


    function _onChange(this: any, ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
      //console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
      //getNews();
      // getNews().then(
      //   function success(result) {
      //       console.log(result);
      //   },
      //   function error(error) {
      //       console.log(error.message);
      //   }
      // )
     


  }
}




  
}


