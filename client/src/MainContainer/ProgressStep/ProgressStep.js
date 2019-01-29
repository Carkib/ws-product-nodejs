import React from "react";
import { Icon, Step, Popup } from "semantic-ui-react";

export const ProgressStep = ({
  active,
  onClick,
  title,
  description,
  icon,
  popupText
}) => (
  <Step active={active} onClick={onClick}>
    <Icon name={icon} />
    <Popup
      trigger={
        <Step.Content>
          <Step.Title>{title}</Step.Title>
          <Step.Description>{description}</Step.Description>
        </Step.Content>
      }
      hoverable
      content={popupText}
    />
  </Step>
);
