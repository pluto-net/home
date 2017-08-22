import React from "react";
import { Link } from "react-router";
// styles
import styles from "./navbar.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Icon from "../icons";

class Navbar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.getLocaleButton = this.getLocaleButton.bind(this);

    this.state = {
      isMobileOpen: false,
    };
  }

  render() {
    const { intl, isTop } = this.props;

    return (
      <nav
        className={`${styles.navbar} ${isTop ? styles.transparent : ""} ${this.state.isMobileOpen
          ? styles.isMobileOpen
          : ""}`}
      >
        <div
          onClick={() => {
            const curOpen = this.state.isMobileOpen;
            this.setState({ isMobileOpen: !curOpen });
          }}
          className={`${styles.menuListOverlay} ${this.state.isMobileOpen ? styles.isMobileOpen : ""}`}
        />
        <div className={styles.container}>
          <Link className={styles.logo} to="/">
            <Icon icon="PLUTO" />
          </Link>
          <div
            className={styles.mobileBtn}
            onClick={() => {
              const curOpen = this.state.isMobileOpen;
              this.setState({ isMobileOpen: !curOpen });
            }}
          >
            <Icon icon="MOBILE_BTN" className={styles.mobileIcon} />
            <Icon icon="CANCEL" className={styles.cancelIcon} />
          </div>
          <ul className={`${styles.menuList} ${this.state.isMobileOpen ? styles.isMobileOpen : ""}`}>
            <li>
              <Link className={styles.menuItem} to="/">
                {intl.formatMessage({ id: "NAVBAR.whitePaper" })}
              </Link>
            </li>
            <li>
              <a className={styles.menuItem} href="https://medium.com/pluto-network" target="_blank">
                {intl.formatMessage({ id: "NAVBAR.blog" })}
              </a>
            </li>
            <li>
              <a className={styles.menuItem} href="https://github.com/pluto-net" target="_blank">
                {intl.formatMessage({ id: "NAVBAR.github" })}
              </a>
            </li>
            <li className={styles.langItem}>
              {this.getLocaleButton()}
            </li>
            {/* <li>
              <Link className={styles.contributeBtn} to="/">
                {intl.formatMessage({ id: 'NAVBAR.contribute' })}
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    );
  }

  getLocaleButton() {
    const { intl, handleLocaleChange } = this.props;
    const curLocale = intl.locale;
    const nextLocale = curLocale === 'en' ? 'ko' : 'en';

    return (
      <div
        onClick={() => {
          handleLocaleChange(nextLocale);
        }}
        className={styles.langBtn}
      >
        <img src="https://d2vo77dayzjoat.cloudfront.net/language-change.png" />
        <span className={curLocale === 'en' ? styles.active : styles.notActive}>EN</span> | <span className={curLocale === 'ko' ? styles.active : styles.notActive}>KO</span>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
