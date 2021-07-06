import * as React from "react"
import { Helmet } from "react-helmet"

interface SeoProps {
  title: string;
  meta: {name: string, content: string}[];
  lang: string;
  description: string;
}

const Seo: React.FC<SeoProps> = (props) => {
  return (
    <Helmet htmlAttributes={{
      lang: props.lang
    }} title={props.title} titleTemplate={props.title ? `%s | ${props.title}` : null} meta={[
      {
        name: `description`,
        content: props.description
      },
      {
        property: `og:title`,
        content: props.title
      },
      {
        property: `og:description`,
        content: props.description
      },
      {
        property: `og:type`,
        content: `website`
      }
    ].concat(props.meta)}/>
  )
}

export default Seo
