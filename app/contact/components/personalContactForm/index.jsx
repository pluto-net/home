import React from "react";
import classNames from "classnames";
import Axios from "axios";
import { Field, Form, Formik } from "formik";
import FeedbackManager from "@pluto_network/scinapse-feedback";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Icon from "../../../components/icons";
import styles from "./personalContactForm.scss";
import validateEmail from "../../../helpers/validateEmail";

class PersonalContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);
  }

  render() {
    return (
      <div className={styles.componentWrapper}>
        <div className={styles.informationSection}>
          <div>
            <div className={styles.title}>
              Get in touch for more information about …
            </div>
            <ul className={styles.featureListWrapper}>
              <div className={styles.featureItem}>
                <Icon className={styles.checkIcon} icon="CHECK_ICON" />
                <li className={styles.featureListItem}>Product support</li>
              </div>
              <div className={styles.featureItem}>
                <Icon className={styles.checkIcon} icon="CHECK_ICON" />
                <li className={styles.featureListItem}>
                  What we can improve on!
                </li>
              </div>
              <div className={styles.featureItem}>
                <Icon className={styles.checkIcon} icon="CHECK_ICON" />
                <li className={styles.featureListItem}>
                  Projects on scholarly communication
                </li>
              </div>
              <div className={styles.featureItem}>
                <Icon className={styles.checkIcon} icon="CHECK_ICON" />
                <li className={styles.featureListItem}>Awesome conferences</li>
              </div>
              <div className={styles.featureItem}>
                <Icon className={styles.checkIcon} icon="CHECK_ICON" />
                <li className={styles.featureListItem}>Collaborations</li>
              </div>
              <div className={styles.featureItem}>
                <Icon className={styles.checkIcon} icon="CHECK_ICON" />
                <li className={styles.featureListItem}>Career opportunities</li>
              </div>
              <div className={styles.featureItem}>
                <Icon className={styles.checkIcon} icon="CHECK_ICON" />
                <li className={styles.featureListItem}>
                  Blockchain in Academia
                </li>
              </div>
            </ul>
            <div className={styles.furtherInformation}>
              or Any other concern
            </div>
          </div>
          <div className={styles.sendEmail}>
            {"Don’t like forms? Send us an "}
            <a className={styles.emailLink} href="mailto:team@pluto.network">
              email.
            </a>
          </div>
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            affiliation: "",
            email: "",
            comments: ""
          }}
          validate={this.validateForm}
          validateOnChange={false}
          onSubmit={async values => {
            const {
              firstName,
              lastName,
              affiliation,
              email,
              comments
            } = values;
            const feedbackManger = new FeedbackManager();
            const feedbackDesc = `type: Researcher contact / name: ${firstName} ${lastName} / university: ${affiliation} / email: ${email} / comment: ${comments}`;
            const finalParams = {
              first_name: firstName,
              last_name: lastName,
              affiliation,
              email,
              comment: comments
            };

            try {
              await feedbackManger.sendTicketToFreshdesk({
                email,
                description: feedbackDesc,
                subject: "Researcher : " + email,
                status: 2,
                priority: 2,
                source: 1
              });
              await Axios.post(
                `https://api.scinapse.io/contact/researcher`,
                finalParams
              );
              alert("Thanks for reaching out!");
            } catch (err) {
              console.error(err);
            }
          }}
          render={props => (
            <Form className={styles.formWrapper}>
              <div>
                <label className={styles.formLabel}>NAME*</label>
                <div className={`${styles.inputWrapper} ${styles.nameWrapper}`}>
                  <div className={styles.nameControl}>
                    <Field
                      type="text"
                      className={classNames({
                        [styles.formInput]: true,
                        [styles.hasError]:
                          props.touched.firstName && props.errors.firstName
                      })}
                      name="firstName"
                      placeholder="First Name"
                    />
                    {props.touched.firstName && props.errors.firstName && (
                      <div className={styles.errorMsg}>
                        {props.errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className={styles.nameControl}>
                    <Field
                      type="text"
                      className={classNames({
                        [styles.formInput]: true,
                        [styles.hasError]:
                          props.touched.lastName && props.errors.lastName
                      })}
                      name="lastName"
                      placeholder="Last Name"
                    />
                    {props.touched.lastName && props.errors.lastName && (
                      <div className={styles.errorMsg}>
                        {props.errors.lastName}
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.inputWrapper}>
                  <label className={styles.formLabel}>AFFILIATION*</label>
                  <Field
                    type="text"
                    className={classNames({
                      [styles.formInput]: true,
                      [styles.hasError]:
                        props.touched.affiliation && props.errors.affiliation
                    })}
                    name="affiliation"
                    placeholder="ex) Harvard University"
                  />
                  {props.touched.affiliation && props.errors.affiliation && (
                    <div className={styles.errorMsg}>
                      {props.errors.affiliation}
                    </div>
                  )}
                </div>

                <div className={styles.inputWrapper}>
                  <label className={styles.formLabel}>EMAIL*</label>
                  <Field
                    type="email"
                    className={classNames({
                      [styles.formInput]: true,
                      [styles.hasError]:
                        props.touched.email && props.errors.email
                    })}
                    name="email"
                    placeholder="ex) team@pluto.network"
                  />
                  {props.touched.email && props.errors.email && (
                    <div className={styles.errorMsg}>{props.errors.email}</div>
                  )}
                </div>

                <div className={styles.inputWrapper}>
                  <label className={styles.formLabel}>COMMENTS</label>
                  <Field
                    component="textarea"
                    rows={4}
                    className={classNames({
                      [styles.formInput]: true,
                      [styles.textarea]: true,
                      [styles.hasError]:
                        props.touched.comments && props.errors.comments
                    })}
                    name="comments"
                    placeholder="Write a comment"
                  />
                  {props.touched.comments && props.errors.comments && (
                    <div className={styles.errorMsg}>
                      {props.errors.comments}
                    </div>
                  )}
                </div>
              </div>
              <button type="submit" className={styles.submitBtn}>
                Contact
              </button>
            </Form>
          )}
        />
      </div>
    );
  }

  validateForm(values) {
    const errors = {};
    for (const key of Object.keys(values)) {
      if (key === "comments") break;

      if (key === "email" && !validateEmail(values[key])) {
        errors.email = "Please enter valid e-mail address.";
      }

      if (!values[key] || values[key].length === 0) {
        errors[key] = `Please enter ${key}`;
      }
    }
    return errors;
  }
}

export default withStyles(styles)(PersonalContactForm);
