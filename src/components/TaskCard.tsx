import React from 'react';
import {Box, VStack, Text, Pressable, HStack} from '@gluestack-ui/themed';
import {TaskDetails} from '../../types';

export interface ITaskCard extends TaskDetails {
  onPress: () => void;
}

const TaskCard = ({title, description, date, onPress}: ITaskCard) => {
  const formatDate = new Date(parseInt(date, 10)).toDateString();

  return (
    <Pressable onPress={onPress}>
      <Box
        bgColor="$green50"
        px="$3"
        py="$2"
        my="$1"
        borderWidth="$1"
        borderRadius="$lg">
        <VStack gap="$2.5">
          <VStack gap="$2.5">
            <Text fontWeight="$bold" fontSize="$lg">
              {title.toLocaleUpperCase()}
            </Text>
            <Text numberOfLines={2} ellipsizeMode="tail">
              {description}
            </Text>
          </VStack>
          <HStack>
            <Text color="$red600" fontWeight="bold">
              Due date:&nbsp;
            </Text>
            <Text fontWeight="$semibold" fontSize="$sm">
              {formatDate}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default TaskCard;
