import * as React from 'react';
import { Flex, Text, BoxProps, FlexProps } from '@blockstack/ui';

const Label: React.FC<BoxProps> = props => (
  <Text
    display="block"
    lineHeight="16px"
    fontSize="11px"
    fontWeight={600}
    color="white"
    {...props}
  />
);

export const Badge: React.FC<FlexProps> = ({ children, ...rest }) => (
  <Flex
    height="24px"
    align="center"
    justify="center"
    borderRadius="24px"
    py="extra-tight"
    px="base"
    {...rest}
  >
    <Label>{children}</Label>
  </Flex>
);
