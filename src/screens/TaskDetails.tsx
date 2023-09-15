import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, TaskDetails} from '../../types';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  EditIcon,
  HStack,
  ScrollView,
  Text,
  TrashIcon,
  VStack,
} from '@gluestack-ui/themed';
import {deleteTask} from '../redux/app/appSlice';
import Prompt from '../components/Promp';
import {appDispatch} from '../redux/store';
import {useSelector} from 'react-redux';
import {selectTasks} from '../redux/app/appSelector';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

const Details = ({navigation, route}: Props) => {
  const [prompt, setPrompt] = useState<boolean>(false);
  const {id} = route.params;
  const dispatch = appDispatch();
  const tasks = useSelector(selectTasks);

  const editTask = () => {
    navigation.navigate('AddTask', {data});
  };

  const [data, setData] = useState<TaskDetails>({} as TaskDetails);

  const {title, description, date} = data || {};
  const formatDate = new Date(parseInt(date, 10)).toDateString() || '';

  useEffect(() => {
    const record = tasks.filter(task => task.id === id)[0];
    setData(record);
  }, [id, tasks]);

  return (
    <Box gap="$4" flex={1}>
      <VStack gap="$3">
        <Text
          mt="$2"
          alignSelf="center"
          fontWeight="$extrabold"
          lineHeight={24}
          fontSize="$2xl">
          {title?.toLocaleUpperCase()}
        </Text>
        <HStack>
          <Text ml="$2" color="$red600" fontWeight="bold">
            Due date:&nbsp;
          </Text>
          <Text fontSize="$sm" fontWeight="bold">
            {formatDate}
          </Text>
        </HStack>
      </VStack>
      <ScrollView flex={1} h="100%" mx="$2">
        <Text fontWeight="semibold">{description}</Text>
      </ScrollView>

      <HStack
        justifyContent="space-around"
        position="absolute"
        w="100%"
        zIndex={10}
        bottom="$2">
        <Button bgColor="green" onPress={() => editTask()}>
          <ButtonIcon mr="$3">
            <EditIcon color="white" />
          </ButtonIcon>
          <ButtonText>Edit</ButtonText>
        </Button>
        <Button
          bgColor="red"
          onPress={() => {
            setPrompt(true);
          }}>
          <ButtonIcon mr="$2.5">
            <TrashIcon color="white" />
          </ButtonIcon>
          <ButtonText>Delete</ButtonText>
        </Button>
      </HStack>

      <Prompt
        showAlertDialog={prompt}
        setShowAlertDialog={setPrompt}
        removeTask={() => {
          dispatch(deleteTask(data));
          navigation.goBack();
        }}
      />
    </Box>
  );
};

export default Details;
