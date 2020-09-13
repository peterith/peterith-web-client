/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import ResumeSection from './resumeSection';
import ResumeSubSection from './resumeSubSection';

const Resume = () => {
  const section = css`
    margin-bottom: 100px;
  `;

  return (
    <section>
      <ResumeSection css={section} headingText="Education" headingEmoji="🎓">
        <ResumeSubSection
          position="MEng (Hons) Biomedical Engineering"
          company="Imperial College London"
          location="UK"
          startDate="2015"
          endDate="2019"
          content={[
            'Graduated with First Class Honours',
            "Obtained Engineering Dean's List award",
            "Received First place in IC Hack 19 for Cisco's Best Collaboration Based Hack",
          ]}
        />
      </ResumeSection>
      <ResumeSection css={section} headingText="Work Experience" headingEmoji="🏢">
        <ResumeSubSection
          position="Full Stack Engineer"
          company="Barclays"
          location="UK"
          startDate="2019"
          endDate="Present"
          content={[
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
          endDate="Present"
          content={[
            'Developed API gateways and microservices to modernise interal infrastructures within the Fraud team.',
            'Created a test suite to validate Java classesand RESTful resources against API specifications.',
            'Researched and implement dashboards to monitor metrics and a circuit breaker for fault tolerance.',
          ]}
          pills={['Java', 'Spring']}
        />
        <ResumeSubSection
          position="Undergraduate Teaching Assistant"
          company="Imperial College Londom"
          location="UK"
          startDate="2017"
          endDate="2018"
          content={[
            'Assisted graduate teaching assistants and lecturers with the teaching of programming modules for undergraduate students.',
          ]}
          pills={['C', 'C++', 'MATLAB']}
        />
      </ResumeSection>
      <ResumeSection css={section} headingText="Volunteering" headingEmoji="♻️">
        <ResumeSubSection
          position="Secretary"
          company="Samaggi Samagom"
          location="UK"
          startDate="2016"
          endDate="2017"
          content={[
            'Assisted with the day-to-day operations which included organising multiple events for Thai residents in the UK, and liaising with Thai student societies and external third parties.',
          ]}
        />
      </ResumeSection>
    </section>
  );
};

export default Resume;
