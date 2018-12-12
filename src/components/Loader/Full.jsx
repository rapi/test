import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";
/*
 * Loading on Full screen
 */
export default () => (
  <Dimmer active inverted>
    <Loader inverted>Loading</Loader>
  </Dimmer>
);
