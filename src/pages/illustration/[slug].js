import { getClient } from "../../../sanity/lib/client";
import IllustrationsGrid from "@/components/IllustrationsGrid";
import HomeFooter from "@/components/HomeFooter";
import IllustrationModal from "../../components/IllustrationModal";
import {
  ILLUSTRATION_QUERY,
  ILLUSTRATIONS_SLUG_QUERY,
  ILLUSTRATIONS_QUERY,
  EVENTS_QUERY,
  VACATION_QUERY,
} from "../../../sanity/lib/queries";
import Head from "next/head";

export default function IllustrationPage({
  illustration,
  illustrations,
  events,
  vacation,
}) {
  console.log("Illustration:", illustration);
  return (
    <>
      <Head>
        <title>{`Bruce d'Anis - ${illustration?.title}`}</title>
        <meta
          property="og:title"
          content={`Bruce d'Anis - ${illustration?.title}`}
          key="title"
        />
      </Head>
      <IllustrationsGrid illustrations={illustrations} />
      <HomeFooter events={events} inModal />
      <IllustrationModal
        illustration={illustration}
        illustrations={illustrations}
        vacation={vacation}
      />
    </>
  );
}

export const getStaticProps = async ({ params = {} }) => {
  const illustrations = await getClient().fetch(ILLUSTRATIONS_QUERY, {
    cache: "no-store",
  });
  const illustration = await getClient().fetch(ILLUSTRATION_QUERY, params, {
    cache: "no-store",
  });
  const events = await getClient().fetch(EVENTS_QUERY, {
    cache: "no-store",
  });
  const vacation = await getClient().fetch(VACATION_QUERY, {
    cache: "no-store",
  });

  return {
    props: {
      illustration,
      illustrations,
      events,
      vacation,
    },
  };
};

// Prepare Next.js to know which routes already exist
export const getStaticPaths = async () => {
  const paths = await getClient().fetch(ILLUSTRATIONS_SLUG_QUERY, {
    cache: "no-store",
  });

  return { paths, fallback: false };
};
