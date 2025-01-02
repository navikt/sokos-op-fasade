import { ReactNode, useEffect, useState } from "react";
import {
  getApplicationEnvrionment,
  getEnvironment,
} from "../../utils/environment";
import SideBar from "../sidebar/SideBar";
import Tilbakemelding from "../tilbakemelding/Tilbakemelding";
import TopBar from "../topbar/TopBar";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: ReactNode;
};

type EnvironmentState = {
  environment: string;
  applicationEnvironment: string;
};

const EnvironmentBanner = ({
  environment,
  applicationEnvironment,
}: EnvironmentState) =>
  environment === "development" && (
    <div className={styles["layout-test-banner"]}>
      <svg
        aria-hidden="true"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        height="110"
        width="110"
        className={styles["test-ikon"]}
      >
        <polygon points="0,0 110,0 110,110"></polygon>
        <text x="25" y="10" transform="rotate(45 20,40)">
          TEST {applicationEnvironment}
        </text>
      </svg>
    </div>
  );

export default function Layout({ children }: LayoutProps) {
  const [state, setState] = useState<EnvironmentState>({
    environment: "",
    applicationEnvironment: "",
  });
  const [showSideBar, setShowSideBar] = useState(true);
  const [showTilbakemelding, setShowTilbakemelding] = useState(false);

  useEffect(() => {
    const applicationEnvironment = getApplicationEnvrionment();
    const environment = getEnvironment();
    setState({ environment, applicationEnvironment });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight >= 800 || window.innerWidth >= 2050) {
        setShowTilbakemelding(true);
      } else {
        setShowTilbakemelding(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <TopBar />
      <div className={styles["layout-body"]}>
        <EnvironmentBanner {...state} />
        <SideBar onToggle={setShowSideBar} showSideBar={showSideBar} />
        <div
          className={`${styles["layout-content"]} ${!showSideBar ? styles["content-expanded"] : ""}`}
        >
          <div className={styles["layout-mikrofrontender"]}>{children}</div>
        </div>
      </div>
      {showTilbakemelding && (
        <div className={styles["layout-tilbakemelding"]}>
          <Tilbakemelding
            showTilbakemelding={showTilbakemelding}
            setShowTilbakemelding={setShowTilbakemelding}
          />
        </div>
      )}
    </>
  );
}
