import React, { useState, useEffect } from "react";
// import { onEntryChange } from "../contentstack-sdk";
import { onEntryChange } from "@site1/contentstack-sdk";
import RenderComponents from "../../components/render-components";
// import { getPageRes } from "../helper";
import { getPageRes } from "@site1/helper";
import Skeleton from "react-loading-skeleton";
// import { Props, Context } from "../typescript/pages";
import { Props, Context } from "@site1/typescript/pages";


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
    const entryRes = await getPageRes(context.resolvedUrl);
    return {
      props: {
        entryUrl: context.resolvedUrl,
        page: entryRes,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}