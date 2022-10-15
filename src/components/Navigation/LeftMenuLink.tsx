import { Box } from "@chakra-ui/react";
import React from "react";
import { Link, Route, RouteProps } from "react-router-dom";
import LinkContent from "./LinkContent";

interface Props extends RouteProps {
  label: string;
  to: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  onClick?(): void;
  showActive?: boolean;
}

const LeftMenuLink = ({
  label,
  to,
  exact,
  icon,
  children,
  showActive,
  activeIcon,
  onClick = () => {},
}: Props) => {
  return (
    <Route
      path={to}
      exact={exact}
      children={({ match }) => {
        if (match) {
          document.title = label + " | Dynamic Forms";
        }

        const active = Object.keys(match ?? false).length > 0;

        return (
          <Box px={2} my="2px" onClick={onClick}>
            <Link to={to} role="group">
              <LinkContent
                active={showActive || active}
                label={label}
                icon={active && activeIcon ? activeIcon : icon}
                children={children as React.ReactNode}
                _groupFocus={{
                  bg: active ? "primary" : "#eaecec",
                }}
              />
            </Link>
          </Box>
        );
      }}
    />
  );
};

export default LeftMenuLink;
