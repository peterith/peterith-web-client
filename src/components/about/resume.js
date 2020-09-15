/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'emotion-theming';
import ResumeSection from './resumeSection';
import ResumeSubSection from './resumeSubSection';
import { useToggle } from '../../hooks';
import { slideRight } from '../../utils/keyframes';

const Resume = () => {
  const { colours } = useTheme();
  const [isHiding, toggleHiding] = useToggle();

  const styles = {
    headingContainer: css`
      display: flex;
      align-items: center;
      animation: ${slideRight(30)} 1s;
    `,
    icon: css`
      font-size: 1.2rem;
      transform: ${!isHiding && 'rotate(90deg)'};
      transition: transform 0.3s;
      @media (hover: hover) {
        cursor: pointer;
        transition: color 0.3s, transform 0.3s;
        &:hover {
          color: ${colours.primary.main};
        }
      }
      @media (min-width: 641px) {
        font-size: 1.5rem;
      }
    `,
    heading: css`
      font-size: 1.8rem;
      margin: 0px 10px 0px 20px;
      @media (min-width: 641px) {
        font-size: 2.2rem;
      }
      @media (min-width: 961px) {
        font-size: 2.4rem;
      }
    `,
    emoji: css`
      font-size: 1.8rem;
      @media (min-width: 641px) {
        font-size: 2.2rem;
      }
      @media (min-width: 961px) {
        font-size: 2.4rem;
      }
    `,
    hidable: css`
      display: flex;
      flex-direction: column;
      overflow: hidden;
      justify-content: space-between;
      max-height: ${isHiding ? '0px' : '4000px'};
      transition: max-height 0.5s;
    `,
  };

  return (
    <section>
      <div css={styles.headingContainer}>
        <FontAwesomeIcon
          css={styles.icon}
          icon="chevron-right"
          role="button"
          aria-label="toggle collapse"
          tabIndex="0"
          onKeyPress={toggleHiding}
          onClick={toggleHiding}
        />
        <h2 css={styles.heading}>Resume</h2>
        <span css={styles.emoji} role="img" aria-label="emoji">
          📄
        </span>
      </div>
      <div css={styles.hidable}>
        <ResumeSection heading="Education 🎓">
          <ResumeSubSection
            position="MEng (Hons) Biomedical Engineering"
            company="Imperial College London"
            location="UK"
            startDate="2015"
            endDate="2019"
            descriptions={[
              'Graduated with First Class Honours',
              "Obtained Engineering Dean's List award",
              "Received First place in IC Hack 19 for Cisco's Best Collaboration Based Hack",
            ]}
          />
        </ResumeSection>
        <ResumeSection heading="Work Experience 🏢">
          <ResumeSubSection
            position="Full Stack Engineer"
            company="Barclays"
            location="UK"
            startDate="2019"
            endDate="Present"
            descriptions={[
              'Implemented multiple UI components and backend services for the bank’s data governance platform, which included a custom rule based notification system and an interdependent metadata validation system.',
              'Created a backend service for the bank’s data lineage system, with a peer based review authoring feature.',
              'Performed a large database migration for data lineage with a data QA functionality established where all errors were reported via CSV files.',
            ]}
            pills={[
              'React',
              'Apollo GraphQL',
              'Express',
              'Sequelize',
              'Node.js',
              'Jest',
              'JavaScript',
              'SQL',
              'Python',
              'HTML',
              'CSS',
            ]}
          />
          <ResumeSubSection
            position="Software Engineering Intern"
            company="Barclays"
            location="UK"
            startDate="2018"
            descriptions={[
              'Developed API gateways and microservices to modernise interal infrastructures within the Fraud team.',
              'Created a test suite to validate Java classesand RESTful resources against API specifications.',
              'Researched and implement dashboards to monitor metrics and a circuit breaker for fault tolerance.',
            ]}
            pills={['Java', 'Spring']}
          />
          <ResumeSubSection
            position="Undergraduate Teaching Assistant"
            company="Imperial College London"
            location="UK"
            startDate="2017"
            endDate="2018"
            descriptions={[
              'Assisted graduate teaching assistants and lecturers with the teaching of programming modules for undergraduate students.',
            ]}
            pills={['C', 'C++', 'MATLAB']}
          />
        </ResumeSection>
        <ResumeSection heading="Volunteering ♻️">
          <ResumeSubSection
            position="Secretary"
            company="Samaggi Samagom"
            location="UK"
            startDate="2016"
            endDate="2017"
            descriptions={[
              'Assisted with the day-to-day operations which included organising multiple events for Thai residents in the UK, and liaising with Thai student societies and external third parties.',
            ]}
          />
        </ResumeSection>
      </div>
    </section>
  );
};

export default Resume;
