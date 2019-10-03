import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import About from './About';
import Contact from './Contact';
import Register from './Register';
import Footer from './Footer';
import './App.css';

export default () => {
  return (
    <div className="container">
      <Header />
      <main>
        <Route path="/" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/register" exact component={Register} />
      </main>
      <Footer />
    </div>
  );
};
