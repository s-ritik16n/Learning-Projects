import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const feedQuery = gql`query Feed($limit: Int!) {
  feed(limit: $limit){
    id
    title
  }
}`;

type Feed = {
  id: string;
  title: string;
}

type Query = {
  feed: Feed[]
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  apollo: Apollo;
  feedQuery: Observable<Feed[]>;
  feed: any;
  type: string;
  itemsPerPage: number = 2;

  constructor() { }

  ngOnInit() {
    console.log(this.apollo);
    this.feedQuery = this.apollo.watchQuery<Query>({
      query: feedQuery,
      variables: {
        type: this.type,
        offset: 0,
        limit: this.itemsPerPage,
      }
    }).
      valueChanges.
      map(data => this.feed)

    // this.feed = this.feedQuery
    //   .valueChanges
    //   .subscribe(({ data }) => {
    //      this.feed = data.feed;
    //   });
  }

  fetchMore() {
    this.apollo.query({
      query: feedQuery,
      variables: {
        offset: this.itemsPerPage
      }
    }).subscribe();
    // this.feedQuery.fetchMore({
    // query: ... (you can specify a different query. feedQuery is used by default)
    //   variables: {
    //     offset: this.feed.length,
    //   },
    //   // We are able to figure out which offset to use because it matches
    //   // the feed length, but we could also use state, or the previous
    //   // variables to calculate this (see the cursor example below)
    //   updateQuery: (prev, { fetchMoreResult }) => {
    //     if (!fetchMoreResult) { return prev; }
    //     return Object.assign({}, prev, {
    //       feed: [...prev.feed, ...fetchMoreResult.feed],
    //     });
    //   },
    // });
    // }

  }
}
