/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const Hobbies = () => {
  const styles = {
    heading: css`
      margin: 50px 0px 30px 0px;
      font-size: 1.5rem;
      @media (min-width: 641px) {
        font-size: 1.8rem;
      }
      @media (min-width: 961px) {
        font-size: 2rem;
      }
    `,
    table: css`
      td {
        padding: 0px 20px 5px 0px;
      }
      @media (min-width: 641px) {
        font-size: 1.2rem;
      }
    `,
  };
  return (
    <section>
      <h2 css={styles.heading}>
        My PC Build{' '}
        <span role="img" aria-label="my pc build">
          🖥️
        </span>
      </h2>
      <table css={styles.table}>
        <tbody>
          <tr>
            <td>CPU</td>
            <td>AMD Ryzen 9 3900X</td>
          </tr>
          <tr>
            <td>Motherboard</td>
            <td>ASUS ROG Strix X570-E Gaming</td>
          </tr>
          <tr>
            <td>Graphics Card</td>
            <td>MSI GeForce RTX 2070 Super GAMING X TRIO</td>
          </tr>
          <tr>
            <td>Memory</td>
            <td>Corsair Vengence RGB PRO 32 GB (2 x 16 GB) 3600MHz</td>
          </tr>
          <tr>
            <td>Storage</td>
            <td>Samsung 970 Evo Plus 2 TB (2 x 1 TB)</td>
          </tr>
          <tr>
            <td>Cooler</td>
            <td>Corsair Hydro Series H115i RGB PLATINUM</td>
          </tr>
          <tr>
            <td>Power Supply</td>
            <td>Corsair HXi Series HX850i</td>
          </tr>
          <tr>
            <td>Case</td>
            <td>Corsair Crystal Series 680X RGB Black</td>
          </tr>
          <tr>
            <td>Fan</td>
            <td>Corsair LL120 RGB Black x 6</td>
          </tr>
        </tbody>
      </table>
      <h2 css={styles.heading}>
        Technology Preferences{' '}
        <span role="img" aria-label="my pc build">
          ✔️
        </span>
      </h2>
      <table css={styles.table}>
        <tbody>
          <tr>
            <td>Operating System</td>
            <td>Arch Linux</td>
          </tr>
          <tr>
            <td>Desktop Environment</td>
            <td>KDE Plasma</td>
          </tr>
          <tr>
            <td>Shell</td>
            <td>Zsh</td>
          </tr>
          <tr>
            <td>Editor (graphical)</td>
            <td>Visual Studio Code</td>
          </tr>
          <tr>
            <td>Editor (terminal)</td>
            <td>vim</td>
          </tr>
          <tr>
            <td>Browser</td>
            <td>Google Chrome</td>
          </tr>
          <tr>
            <td>Music Player</td>
            <td>Spotify</td>
          </tr>
          <tr>
            <td>Social Media</td>
            <td>Discord</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>iPhone</td>
          </tr>
          <tr>
            <td>Watch</td>
            <td>Fitbit</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Hobbies;
