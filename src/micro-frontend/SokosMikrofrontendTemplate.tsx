import React, { LazyExoticComponent } from "react";
import { ErrorBoundary } from "react-error-boundary";
import FeilMelding from "../components/feilmelding/Feilmelding.js";
import ContentLoader from "../components/loader/ContentLoader.js";
import { sokosMikrofrontendTemplateUrl } from "../urls.js";

const SokosMikrofrontendTemplateBundle: LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import(sokosMikrofrontendTemplateUrl)
);

const SokosMikrofrontendTemplate = () => {
  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary fallbackRender={() => <FeilMelding />}>
        <SokosMikrofrontendTemplateBundle />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default SokosMikrofrontendTemplate;