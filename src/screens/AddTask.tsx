import React, {useLayoutEffect} from 'react';
import {
  AlertCircleIcon,
  VStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  ScrollView,
  Button,
  Text,
  HStack,
  CloseCircleIcon,
  ButtonText,
} from '@gluestack-ui/themed';
import {GestureResponderEvent} from 'react-native';
import {Formik} from 'formik';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {selectOpenDatetimeModal} from '../redux/app/appSelector';
import {addTask, setDatetimeModal, updateTask} from '../redux/app/appSlice';
import {appDispatch} from '../redux/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, TaskDetails} from '../../types';
import * as yup from 'yup';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

const AddTask = ({navigation, route}: Props) => {
  const dispatch = appDispatch();
  const {params} = route;
  const data = params?.data;
  const openDatetimeModal = useSelector(selectOpenDatetimeModal);

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title cannot be blank!'),
    description: yup.string().required('Description cannot be blank!'),
    date: yup.string().required('Date cannot be black'),
  });

  const onSubmit = (values: TaskDetails) => {
    data ? dispatch(updateTask(values)) : dispatch(addTask(values));
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data ? 'Edit Task' : 'Add Task',
    });
  }, [data, navigation]);

  return (
    <ScrollView bgColor="$red.500" flex={1} showsVerticalScrollIndicator>
      <VStack gap="$3" mx="$2" flex={1}>
        <Formik
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            id: data?.id ?? Math.floor(Math.random() * 10000).toString(),
            title: data?.title ?? '',
            description: data?.description ?? '',
            date: data?.date ?? '',
          }}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setErrors,
          }) => (
            <VStack flex={1} gap="$5" pt="$3" justifyContent="space-between">
              <VStack w="100%" gap="$5">
                <FormControl isRequired={true}>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText fontWeight="bold">
                      Title
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="text"
                      placeholder="Enter Task Title"
                      value={values.title}
                      onChangeText={e => {
                        setErrors({});
                        handleChange('title')(e as unknown as string);
                      }}
                      onBlur={(e: any) => {
                        setErrors({});
                        handleBlur('title')(e);
                      }}
                    />
                  </Input>
                  {errors.title && (
                    <HStack mt="$0.5" gap="$1" alignItems="center">
                      <AlertCircleIcon color="red" />
                      <Text color="red" fontSize="$sm">
                        {errors.title}
                      </Text>
                    </HStack>
                  )}
                </FormControl>

                <FormControl isRequired>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Description</FormControlLabelText>
                  </FormControlLabel>
                  <Textarea>
                    <TextareaInput
                      onChangeText={e => {
                        setErrors({});
                        handleChange('description')(e as unknown as string);
                      }}
                      onBlur={(e: any) => {
                        setErrors({});
                        handleBlur('title')(e);
                      }}
                      placeholder="Enter Task Description"
                      value={values.description}
                    />
                  </Textarea>
                  {errors.description && (
                    <HStack mt="$0.5" gap="$1" alignItems="center">
                      <AlertCircleIcon color="red" />
                      <Text color="red" fontSize="$sm">
                        {errors.description}
                      </Text>
                    </HStack>
                  )}
                </FormControl>

                <FormControl>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Due date</FormControlLabelText>
                  </FormControlLabel>

                  {values.date ? (
                    <HStack
                      alignItems="center"
                      justifyContent="space-between"
                      gap="$4">
                      <Text>
                        {new Date(parseInt(values.date, 10)).toDateString()}
                      </Text>
                      <HStack gap="$3">
                        <Button
                          h="$10"
                          onPress={() => {
                            dispatch(setDatetimeModal(true));
                          }}>
                          <Text color="white">Change Date</Text>
                        </Button>
                        <Button
                          bgColor="$red700"
                          onPress={() => handleChange('date')('')}>
                          <CloseCircleIcon color="white" bgColor="$red700" />
                        </Button>
                      </HStack>
                    </HStack>
                  ) : (
                    <Button
                      h="$10"
                      onPress={() => {
                        dispatch(setDatetimeModal(true));
                      }}>
                      <ButtonText color="white">Pick Date</ButtonText>
                    </Button>
                  )}

                  {errors.date && (
                    <HStack mt="$0.5" gap="$1" alignItems="center">
                      <AlertCircleIcon color="red" />
                      <Text color="red" fontSize="$sm">
                        {errors.date}
                      </Text>
                    </HStack>
                  )}
                </FormControl>
              </VStack>

              <Button
                bgColor="green"
                onPress={
                  handleSubmit as (
                    e?: GestureResponderEvent | undefined,
                  ) => void
                }>
                <ButtonText fontWeight="$extrabold">Save</ButtonText>
              </Button>

              <DatePicker
                modal
                minimumDate={new Date(new Date().getTime())}
                open={openDatetimeModal}
                date={new Date(parseInt(values.date, 10) || Date.now())}
                onConfirm={date => {
                  dispatch(setDatetimeModal(false));
                  handleChange('date')(date.getTime().toString());
                }}
                onCancel={() => {
                  dispatch(setDatetimeModal(false));
                }}
              />
            </VStack>
          )}
        </Formik>
      </VStack>
    </ScrollView>
  );
};

export default AddTask;
