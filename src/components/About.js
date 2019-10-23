/** @jsx jsx */
import { jsx } from '@emotion/core';
import Heading from './Heading';

const About = () => {
  return (
    <div>
      <section>
        <Heading>Hi, I&apos;m Pete!</Heading>
        <p>
          I&apos;m a full-time software engineer, machine learning hobbyist, fitness enthusiast, and a self-motivated
          learner.
        </p>
      </section>
      <section>
        <Heading>Software Engineering</Heading>
        <p>
          <strong>Languages:</strong> JavaScript, Python, Java, C++, C, SQL
        </p>
        <p>
          <strong>Frameworks/Tools:</strong> React, Apollo GraphQL, Node.js, Spring, MongoDB, Git, AWS
        </p>
        <p>
          <strong>Interests:</strong> Web Development, Internet of Things, Embedded Systems, GPU programming
        </p>
      </section>
      <section>
        <Heading>Machine Learning</Heading>
        <p>
          <strong>Interests:</strong> Computer Vision, Object Detection, Face Recognition, Recurrent Neural Network
        </p>
        <p>
          <strong>Frameworks/Tools:</strong> Tensorflow, Keras, scikit-learn, MATLAB
        </p>
      </section>
      <section>
        <Heading>There&apos;s more to me!</Heading>
        <p>
          <strong>Qualifications:</strong> MEng (Hons) Biomedical Engineering @ Imperial College London (1st Class
          Honours)
        </p>
        <p>
          <strong>Human Languages:</strong> English, Thai
        </p>
        <p>
          <strong>Other Interests:</strong> Computers, 3D printing, weight training, singing, Asian food
        </p>
      </section>
    </div>
  );
};

export default About;
