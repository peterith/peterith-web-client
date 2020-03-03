/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTheme } from 'emotion-theming';
// import { useToggle } from '../hooks';
import { GET_ABOUT_STORY } from '../graphql/queries';
import Heading from './Heading';

const About = () => {
  const { colours } = useTheme();
  const [isEditable, setIsEditable] = useState(false);
  // const [isEditing, toggleEditing] = useToggle(false);
  const [story, setStory] = useState({ sections: [] });
  const { loading, error } = useQuery(GET_ABOUT_STORY, {
    onCompleted: ({ getAboutStory }) => {
      setIsEditable(true);
      setStory(getAboutStory);
    },
  });
  const icon = css`
    display: none;
    float: right;
    cursor: pointer;
    &:hover {
      color: ${colours.primary.main};
    }
  `;

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
      {isEditable && <span css={icon} className="fas fa-edit" />}
      <section>
        <Heading headingLevel={1}>{story.title}</Heading>
        <p>{story.description}</p>
      </section>
      {story.sections.map((section) => {
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
