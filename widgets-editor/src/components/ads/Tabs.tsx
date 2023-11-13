import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import Icon, { IconName, IconSize } from "./Icon";
import { Classes, CommonComponentProps } from "./common";

export type TabProp = {
  key: string;
  title: string;
  count?: number;
  panelComponent: JSX.Element;
  icon?: IconName;
};

const TabsWrapper = styled.div<{ shouldOverflow?: boolean }>`
  /* styles remain unchanged */
`;

const TabTitleWrapper = styled.div`
  /* styles remain unchanged */
`;

const TabTitle = styled.span`
  /* styles remain unchanged */
`;

const TabCount = styled.div`
  /* styles remain unchanged */
`;

type TabbedViewComponentType = CommonComponentProps & {
  tabs: Array<TabProp>;
  selectedIndex?: number;
  onSelect?: (tabIndex: number) => void;
  overflow?: boolean;
};

export const TabComponent = (props: TabbedViewComponentType) => {
  return (
    <TabsWrapper
      shouldOverflow={props.overflow}
      data-cy={props.cypressSelector}
    >
      <Tabs
        selectedIndex={props.selectedIndex}
        onSelect={(index: number) => {
          props.onSelect && props.onSelect(index);
        }}
      >
        <TabList>
          {props.tabs.map((tab) => (
            <Tab key={tab.key}>
              <TabTitleWrapper>
                {tab.icon ? (
                  <Icon name={tab.icon} size={IconSize.XXXL} />
                ) : null}
                <TabTitle>{tab.title}</TabTitle>
                {tab.count && tab.count > 0 ? (
                  <TabCount>{tab.count}</TabCount>
                ) : null}
              </TabTitleWrapper>
            </Tab>
          ))}
        </TabList>
        {props.tabs.map((tab) => (
          <TabPanel key={tab.key}>{tab.panelComponent}</TabPanel>
        ))}
      </Tabs>
    </TabsWrapper>
  );
};
