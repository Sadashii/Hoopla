import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";
import { FlexBox } from "../../atoms";
import styles from "./styles.module.scss";

const WelcomeContainer = ({ title, subtitle, cta, ctaHref }) => {
  return (
    <Container className={styles.welcomeContainer} maxWidth={false}>
      <FlexBox column justify align className={styles.welcome}>
        <Typography variant="h2" variantMapping={"h1"}
                    className={styles.welcomeTitle}>
          {title}
        </Typography>
        <Typography variant="h5" variantMapping={"h2"}
                    className={styles.welcomeSubtitle}>
          {subtitle}
        </Typography>
        {cta && ctaHref && (
          <Link href={ctaHref} noLinkStyle>
            <Button variant="contained" color="primary"
                    className={styles.welcomeButton}>
              {cta}
            </Button>
          </Link>
        )}
      </FlexBox>
    </Container>
  );
};

WelcomeContainer.defaultProps = {
  title: "A better online to-do app for all of your needs",
  subtitle: "Create, share, and collaborate on your to-do lists",
  cta: "Get Started",
  ctaHref: "/auth/signup/"
};

export default WelcomeContainer;