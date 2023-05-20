import client from "../apollo-client";
import { gql } from "@apollo/client";

export default function Home({ countries }) {
  return <Countries countries={countries} />;
}

function Countries({ countries }) {
  if (countries?.[0]) {
    return countries.map((country, index) => (
      <div key={index}>
        <Country country={country} />
        <br />
      </div>
    ));
  }
}

function Country({ country }) {
  return (
    <>
      {country.code}: {country.name}
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries.slice(0, 4),
    },
  };
}
