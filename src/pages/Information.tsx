import { BodyLong, BodyShort, Box, GuidePanel, Heading, Link, List } from "@navikt/ds-react";
import { useLoaderData } from "react-router-dom";
import { UserData } from "../models/userData";
import pengesekk from "../../assets/images/pengesekk.svg";
import styles from "./Information.module.css";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { ROUTE_PATH } from "../models/routePath";
import { Link as ReactRouterLink } from "react-router-dom";

const Information = () => {
  const userInfo = useLoaderData() as UserData;

  return (
    <>
      <div className={styles.heading}>
        <Heading level="1" size="large" spacing>
          God dag, {userInfo.name}!
        </Heading>
      </div>
      <div className={styles.container}>
        <div className={styles.guidepanel}>
          <GuidePanel poster illustration={<img src={pengesekk} alt="pengesekk" />}>
            <Heading level="2" size="small" spacing>
              Informasjon om utbetalingsportalen
            </Heading>
            <BodyLong spacing>
              Utbetalingsportalen er en ny platform som på sikt skal overta funksjoner fra Økonomiportalen og Abetal i
              en ny og forbedret versjon.
            </BodyLong>
            <List as="ul" size="small">
              <List.Item>
                <BodyShort>
                  <Link href="https://navno.sharepoint.com/" target="_blank">
                    Les mer på Navet
                  </Link>
                </BodyShort>
              </List.Item>
              <List.Item>
                <BodyShort>
                  <Link
                    href="https://navno.sharepoint.com/sites/POutbetaling/_layouts/15/Doc.aspx?sourcedoc=%7B90953D22-FE5D-4818-A341-2FC88D4E2705%7D&file=Tilgangsbestilling%20i%20ny%20utbetalingsportal.docx&action=default&mobileredirect=true&DefaultItemOpen=1"
                    target="_blank"
                  >
                    Tilgangsbestilling
                  </Link>
                </BodyShort>
              </List.Item>
            </List>
          </GuidePanel>
        </div>
        <Heading level="3" size="medium" spacing>
          Apper
        </Heading>
        <div className={styles.apper}>
          <Link as={ReactRouterLink} to={ROUTE_PATH.SOKOS_UP_OPPDRAGSINFO} variant="neutral" underline={false}>
            <Box background="surface-alt-2-subtle" padding="6" shadow="medium" borderRadius="xlarge">
              <div className={styles.apperContent}>
                <BodyShort weight="semibold">Oppdragsinfo</BodyShort>
                <ChevronRightIcon />
              </div>
            </Box>
          </Link>
          <Link as={ReactRouterLink} to={ROUTE_PATH.SOKOS_UP_ORS} variant="neutral" underline={false}>
            <Box background="surface-alt-2-subtle" padding="6" shadow="medium" borderRadius="xlarge">
              <div className={styles.apperContent}>
                <BodyShort weight="semibold">Oppslag i Reskontro Stønad</BodyShort>
                <ChevronRightIcon />
              </div>
            </Box>
          </Link>
          <Link as={ReactRouterLink} to={ROUTE_PATH.SOKOS_UP_KRP} variant="neutral" href="#" underline={false}>
            <Box background="surface-alt-2-subtle" padding="6" shadow="medium" borderRadius="xlarge">
              <div className={styles.apperContent}>
                <BodyShort weight="semibold">Kontoregister person kontosøk</BodyShort>
                <ChevronRightIcon />
              </div>
            </Box>
          </Link>
          <Link as={ReactRouterLink} to={ROUTE_PATH.SOKOS_UP_SKATTEKORT} variant="neutral" href="#" underline={false}>
            <Box background="surface-alt-2-subtle" padding="6" shadow="medium" borderRadius="xlarge">
              <div className={styles.apperContent}>
                <BodyShort weight="semibold">Skattekort</BodyShort>
                <ChevronRightIcon />
              </div>
            </Box>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Information;
