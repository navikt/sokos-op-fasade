import { useState } from "react";
import { BodyLong, GuidePanel, Heading, Switch } from "@navikt/ds-react";
import pengesekk from "../../assets/images/pengesekk.svg";
import AppCard from "../components/appcard/AppCard";
import { useAuthContext } from "../components/auth/AuthProvider";
import useApps from "../hooks/useApps";
import styles from "./Home.module.css";

export default function Home() {
  const authContext = useAuthContext();
  const [showUnauthorized, setShowUnauthorized] = useState<string>("");
  const { authorizedApps, allApps } = useApps();

  function appCards() {
    return (showUnauthorized ? allApps : authorizedApps).map((app) => (
      <AppCard
        key={app.app}
        hasAccess={authorizedApps.includes(app)}
        route={app.route}
        title={app.title}
        description={app.description}
      />
    ));
  }

  return (
    <main id="main-content">
      <div className={styles.home}>
        <div className={styles.home__guidepanel}>
          <div className={styles.home__heading}>
            <Heading level="1" size="large" spacing>
              God dag, {authContext.userData.name}
            </Heading>
          </div>
          <GuidePanel
            poster
            illustration={<img src={pengesekk} alt="pengesekk" />}
          >
            <Heading level="2" size="small" spacing>
              Informasjon om utbetalingsportalen
            </Heading>
            <BodyLong spacing>
              Utbetalingsportalen er en ny platform som på sikt skal overta
              funksjoner fra Økonomiportalen og Abetal i en ny og forbedret
              versjon.
            </BodyLong>
          </GuidePanel>
        </div>
        <Heading level="3" size="medium" spacing>
          Apper
        </Heading>
        <Switch
          value="show"
          checked={showUnauthorized === "show"}
          onChange={(e) =>
            setShowUnauthorized((x) => (x ? "" : e.target.value))
          }
        >
          Vis alle
        </Switch>
        <div className={styles.home__apps}>{appCards()}</div>
      </div>
    </main>
  );
}
