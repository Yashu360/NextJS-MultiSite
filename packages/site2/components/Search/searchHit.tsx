// components/search-hits.js
import { connectStateResults } from "react-instantsearch-dom";
import Link from "next/link";
function SearchHits({
  searchState,
  searchResults,
}: {
  searchState: any;
  searchResults: any;
}) {
  const validQuery = searchState.query?.length >= 2;
  return searchState.query && validQuery ? (
    <div className="searchHits">
      {searchResults?.hits.length === 0 && <div>No results found!</div>}
      {searchResults?.hits.length > 0 &&
        searchResults.hits.map((hit: any) => (
          <div key={hit.objectID} className="searchResult">
            <Link href={hit && hit.url ? hit.url : "/"}>
              <div className="searchPanel">
                <a className="textSmall">
                  <div className="inner">
                    <div className="thumb">
                      {/*  eslint-disable-next-line @next/next/no-img-element */}
                      <img className="imgPrint" src={hit.url} alt={hit.title} />
                    </div>
                    <div className="thumbInfo">
                      <div className="caption">
                        <h3 className="title">{hit.title}</h3>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </Link>
          </div>
        ))}
    </div>
  ) : null;
}
export default connectStateResults(SearchHits);
