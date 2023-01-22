// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as React from "react";
import { useState } from "react";
import { Constants } from "./Constants";
import { News } from "./News";
import { NewsItemComponent, NewsItemProps } from "./NewsItemComponent";
import { ToggleBase, Toggle } from "@fluentui/react";
import { companynews } from ".";

export interface NewsItemsListProps {
  apiKey      : string;
  baseUrl     : string;
  searchString: string;
  searchOrNews: boolean;
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
    this._searchOrNews = props.searchOrNews;

    this.state = {newsItems: []};
  }

  componentDidMount() {
    this.getNews();

  }

  public async getNews(): Promise<void> {
    var news = new News(this._apiKey, this._baseUrl, this._searchOrNews);
    let newsItems: NewsItemProps[] = await news.getNews(this._searchString, this._apiKey, this._searchOrNews);
    this.setState({newsItems});
  }

  public render(): React.ReactNode {
    let constants = new Constants(); 
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
            {(constants.NewsSource == 'Bing')
              ? <Toggle id="searchOrNews" offText="Bing News Search" onText="Bing Web Search" label="Source:" inlineLabel onChange={this._onChange} />
              : <div></div>
            }
          </div>

          {(this.state.newsItems.length == 0)
            ? <div><i>No news found</i></div>
            : <><div className="newsItems">{newsItems}</div><br /><div className="moreNews"><a target="_blank" rel="noreferrer" href={morenews}>See more on Bing News</a></div></>
          }
        </div>
    );
  }

  private _onChange = (
		ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked?: boolean): void => {
		// this.setState((prevState: boolean): checked => {
		// 	prevState._searchOrNews = !!checked;
		// 	return prevState;
		// });
      this._searchOrNews = (checked ? false: true);
      this.getNews();
	};

}


