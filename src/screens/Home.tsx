import React, {useState} from 'react';
import {
  AddIcon,
  Center,
  Fab,
  FabIcon,
  Text,
  VStack,
  ScrollView,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import TaskCard from '../components/TaskCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, TaskDetails} from '../../types';
import {useSelector} from 'react-redux';
import {selectTasks} from '../redux/app/appSelector';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const EmptyTask = ({msg}: {msg?: string}) => (
  <Center flex={1}>
    <Text>{msg || 'No Task Available'}</Text>
  </Center>
);

const Home = ({navigation}: Props) => {
  const tasks = useSelector(selectTasks);
  const [filtered, setFiltered] = useState<TaskDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filterTasks = () => {
    const filteredTasks = tasks.filter(
      task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFiltered(filteredTasks);
  };

  return (
    <VStack flex={1} gap="$3" mt="$3">
      <VStack gap="$2" mx="$1">
        <Text
          alignSelf="center"
          textDecorationLine="underline"
          fontWeight="$black"
          fontSize="$xl">
          Task Manager
        </Text>
        <Input>
          <InputField
            borderRadius="$lg"
            paddingVertical="$1.5"
            paddingHorizontal="$1"
            onChangeText={text => {
              setSearchTerm(text);
              filterTasks();
            }}
            value={searchTerm}
            placeholder="Search tasks"
          />
        </Input>
      </VStack>

      {tasks.length > 0 ? (
        <ScrollView flex={1} mx="$2" mb="$5">
          {searchTerm ? (
            filtered.length > 0 ? (
              filtered.map(t => (
                <TaskCard
                  key={t.id}
                  {...t}
                  onPress={() => navigation.navigate('TaskDetails', {id: t.id})}
                />
              ))
            ) : (
              <EmptyTask msg="No Task Found" />
            )
          ) : (
            tasks.map(t => (
              <TaskCard
                key={t.id}
                {...t}
                onPress={() => navigation.navigate('TaskDetails', {id: t.id})}
              />
            ))
          )}
        </ScrollView>
      ) : (
        <EmptyTask />
      )}
      <Fab
        onPress={() => navigation.navigate('AddTask')}
        backgroundColor="green"
        placement="bottom right"
        rounded="$full">
        <FabIcon as={AddIcon} p="$3" />
      </Fab>
    </VStack>
  );
};

export default Home;
