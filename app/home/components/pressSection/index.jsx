import React from "react";
// styles
import styles from "./pressSection.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";

const PressSection = () => {
  return (
    <section className={styles.pressSectionContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.pressWrapper}>
          <div className={styles.pressItemContainer}>
            <div className={styles.title}>FEATURED ON</div>
            <div className={styles.pressItemWrapper}>
              <div className={styles.pressItem}>
                <div className={styles.pressImgWrapper}>
                  <img src="https://assets.pluto.network/pluto_team_hompage/physics-today%403x.png" />
                </div>
              </div>
              <div className={styles.pressItem}>
                <div className={styles.pressImgWrapper}>
                  <img src="https://assets.pluto.network/pluto_team_hompage/elife%403x.png" />
                </div>
              </div>
              <div className={styles.pressItem}>
                <div className={styles.pressImgWrapper}>
                  <img src="https://assets.pluto.network/pluto_team_hompage/nature%403x.png" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.pressItemContainer}>
            <div className={styles.title}>PARTNERS</div>
            <div className={styles.pressItemWrapper}>
              <div className={styles.pressItem}>
                <div className={styles.pressImgWrapper}>
                  <img src="https://assets.pluto.network/pluto_team_hompage/microsoft-research%403x.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withStyles(styles)(PressSection);
