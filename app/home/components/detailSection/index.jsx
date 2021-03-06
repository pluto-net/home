import React from "react";
import { trackAndOpenLink, trackAction } from "../../../helpers/handleGA";

// styles
import styles from "./detailSection.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Icon from "../../../components/icons";

const DetailSection = ({ shown }) => (
  <section
    className={`${styles.detailSectionContainer} ${shown ? styles.shown : ""}`}
  >
    <div className={styles.innerContainer}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          PLUTO for <br />
          <strong>Cryptocurrency</strong>
        </div>
        <div className={styles.detail}>
          A Proof-of-Concept prototype will be launched in November 2017,<br />
          where Cryptocurrency related research articles, whitepapers, and
          technical blogs will be shared and evaluated.
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <a
          onClick={() =>
            trackAndOpenLink("https://search.pluto.network/", "DetailSection")
          }
          className={styles.moreDetail}
        >
          More Detail
          <Icon icon="ARROW_POINT" />
        </a>

        <img
          className={styles.imgMacbook}
          src="https://d2vo77dayzjoat.cloudfront.net/detail-macbook.png"
          alt=""
        />
        <img
          className={styles.imgMacbookMobile}
          src="https://d2vo77dayzjoat.cloudfront.net/detail-macbook-mobile.png"
          alt=""
        />
        <img
          className={styles.imgPeerReview}
          src="https://d2vo77dayzjoat.cloudfront.net/detail-peereval.png"
          alt=""
        />
        <img
          className={styles.imgComment1}
          src="https://d2vo77dayzjoat.cloudfront.net/detail-comment1.png"
          alt=""
        />
        <img
          className={styles.imgComment2}
          src="https://d2vo77dayzjoat.cloudfront.net/detail-comment2.png"
          alt=""
        />
      </div>
    </div>

    <div className={styles.waveIcon}>
      <Icon icon="WAVES_DETAIL" />
    </div>
  </section>
);

export default withStyles(styles)(DetailSection);
