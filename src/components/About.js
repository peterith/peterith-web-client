/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_ABOUT_STORY } from '../graphql/queries';
import Heading from './Heading';

const About = () => {
  const { data, error } = useQuery(GET_ABOUT_STORY);

  const about = css`
    box-sizing: border-box;
    padding: 0px 20px;
    margin: auto;
    @media (min-width: 960px) {
      width: 960px;
    }
  `;

  const storySection = css`
    margin: 40px auto;
  `;

  if (error) {
    return <div css={about}>Unable to load the page at this time, please try again later.</div>;
  }

  return (
    <div css={about}>
      <section>
        <Heading headingLevel={1}>{data && data.getAboutStory.title}</Heading>
        <p>{data && data.getAboutStory.description}</p>
      </section>
      {data &&
        data.getAboutStory.sections.map((section) => {
          return (
            <section css={storySection} key={section.id}>
              <Heading headingLevel={2}>{section.title}</Heading>
              {section.contents.map((content) => {
                return (
                  <p key={content.id}>
                    <strong>{content.title}:</strong> {content.text}
                  </p>
                );
              })}
            </section>
          );
        })}
    </div>
  );
};

export default About;
