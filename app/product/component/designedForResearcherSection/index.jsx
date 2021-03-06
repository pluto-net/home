import React from "react";
// styles
import Icon from "../../../components/icons";
import styles from "./designedForResearcherSection.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";

class DesignedForResearcherSection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      featureStep: "filter"
    };
  }

  render() {
    const { featureStep } = this.state;
    return (
      <section className={styles.designedForResearcherSectionContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.title}>Designed for Researchers</div>
          <div className={styles.tab}>
            <div
              className={`${styles.tabItem} ${
                featureStep === "filter" ? styles.active : ""
              }`}
              onClick={() => this.onClickTab("filter")}
            >
              Filters
            </div>
            <div
              className={`${styles.tabItem} ${
                featureStep === "collection" ? styles.active : ""
              }`}
              onClick={() => this.onClickTab("collection")}
            >
              Collections
            </div>
            <div
              className={`${styles.tabItem} ${
                featureStep === "recommendation" ? styles.active : ""
              }`}
              onClick={() => this.onClickTab("recommendation")}
            >
              Recommendation
            </div>
            <div
              className={`${styles.tabItem} ${
                featureStep === "paperRequest" ? styles.active : ""
              }`}
              onClick={() => this.onClickTab("paperRequest")}
            >
              Paper Requests
            </div>
          </div>
          {this.getFeatureByStep()}
        </div>
      </section>
    );
  }

  onClickTab(nextStep) {
    this.setState({ featureStep: nextStep });
  }

  getFeatureByStep() {
    const { featureStep } = this.state;
    if (featureStep === "") return null;

    switch (featureStep) {
      case "filter":
        return (
          <div className={styles.featureWrapper}>
            <div className={styles.contentsWrapper}>
              <div className={styles.featureTitle}>
                Customized
                <br />
                Filters
              </div>
              <div className={styles.featureDesc}>
                Looking for relevant papers can be stressful and time consuming.
                <br />
                <br />
                Use filters to optimize your search.
                <br />
                <br />
                Simply narrow down your search results by author, publication
                year, field of study, or journal.
              </div>
            </div>
            <img src="https://assets.pluto.network/pluto_team_hompage/filter%403x.png" />
          </div>
        );
      case "collection":
        return (
          <div className={styles.featureWrapper}>
            <div className={styles.contentsWrapper}>
              <div className={styles.featureTitle}>Collections</div>
              <div className={styles.featureDesc}>
                Need to share or save a list of papers?
                <br />
                <br />
                Easily manage all your papers that you searched, viewed, or
                read, from your search results. <br />
                <b>Add papers to your collection</b> or create a new collection
                to share with other researchers, export a citation list, or just
                to keep them as a reading list.
                <br />
                <br />
                Create and share personal paper collection
              </div>
            </div>
            <img src="https://assets.pluto.network/pluto_team_hompage/collection%403x.png" />
          </div>
        );
      case "recommendation":
        return (
          <div className={styles.featureWrapper}>
            <div className={styles.contentsWrapper}>
              <div className={styles.featureTitle}>
                Paper <br />
                Recommendations
              </div>
              <div className={styles.featureDesc}>
                We recommend and forward papers via email & scinpase home that
                may be highly relevant to your research.
              </div>
            </div>
            <img src="https://assets.pluto.network/pluto_team_hompage/recommendation%403x.png" />
          </div>
        );
      case "paperRequest":
        return (
          <div className={styles.featureWrapper}>
            <div className={styles.contentsWrapper}>
              <div className={styles.featureTitle}>Paper Requests</div>
              <div className={styles.featureDesc}>
                For papers that need permission to grant access or approval,
                Scinapse will request paper access directly from the author/s.
              </div>
            </div>
            <img src="https://assets.pluto.network/pluto_team_hompage/request%403x.png" />
          </div>
        );
      default:
        return null;
    }
  }
}

export default withStyles(styles)(DesignedForResearcherSection);
