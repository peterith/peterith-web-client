/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_ABOUT_STORY } from '../graphql/queries';
import Heading from './Heading';

const About = () => {
  const { data, loading, error } = useQuery(GET_ABOUT_STORY);

  const storySection = css`
    margin: 40px auto;
  `;

  if (error) {
    return <p>{`${error.graphQLErrors[0].message}`}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <section>
        <Heading headingLevel={1}>{data.getAboutStory.title}</Heading>
        <p>{data.getAboutStory.description}</p>
      </section>
      {data.getAboutStory.sections.map((section) => {
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
