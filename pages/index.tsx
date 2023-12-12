import React, { useState, useEffect } from "react";
import { onEntryChange } from "../contentstack-sdk";
import RenderComponents from "../components/render-components";
import { getPageRes } from "../helper";
import Skeleton from "react-loading-skeleton";
import { Props, Context } from "../typescript/pages";

export default function Home(props: Props) {
  const { page, entryUrl } = props;

  const [getEntry, setEntry] = useState(page);

  async function fetchData() {
    try {
      const entryRes = await getPageRes(entryUrl);
      if (!entryRes) throw new Error("Status code 404");
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, []);

  return getEntry ? (
    <RenderComponents
      components={getEntry.components}
      contentTypeUid="page"
      entryUid={getEntry.uid}
      locale={getEntry.locale}
      articlePost={false}
      articles={undefined}
      productPost={false}
      products={undefined}
      url={""}
    />
  ) : (
    <Skeleton count={3} height={300} />
  );
}

export async function getServerSideProps(context: Context) {
  try {
    
    const { locale, req } = context;
    const host = req.headers.host || '';
    console.log(locale);
    console.log(req.headers.host);
    let entryUrl;

    switch (host) {
      case 'https://next-js-multi-site-4dfge-nagarajuchatta.vercel.app/':
        entryUrl =  context.resolvedUrl;
        break;
      case 'https://next-js-multi-site-3dfge-nagarajuchatta.vercel.app/':
        entryUrl = context.resolvedUrl;
        break;
      default:
        entryUrl = context.resolvedUrl;
    }

    const entryRes = await getPageRes(context.resolvedUrl);
    return {
      props: {
        entryUrl: context.resolvedUrl,
        page: entryRes || null,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}