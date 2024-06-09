import logo from './logo.svg';
import './App.css';

import {
  Button,
  Center,
  CheckboxIcon,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Tab,
  Text,
  VStack,
  useStatStyles,
} from '@chakra-ui/react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

import { Radio, RadioGroup } from '@chakra-ui/react';

import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const res = {
  success: true,
  data: {
    ways_to_attend_classes: {
      number_of_ways: 29,
      ways: [
        ['P', 'A', 'P', 'P', 'P'],
        ['P', 'P', 'P', 'P', 'P'],
        ['P', 'A', 'A', 'P', 'P'],
        ['A', 'A', 'P', 'A', 'P'],
        ['P', 'A', 'A', 'A', 'P'],
        ['P', 'P', 'A', 'A', 'P'],
        ['P', 'P', 'P', 'A', 'P'],
        ['A', 'P', 'P', 'A', 'A'],
        ['P', 'A', 'P', 'A', 'P'],
        ['A', 'P', 'P', 'A', 'P'],
        ['P', 'P', 'P', 'P', 'A'],
        ['A', 'P', 'A', 'P', 'P'],
        ['P', 'P', 'A', 'P', 'P'],
        ['A', 'A', 'P', 'P', 'P'],
        ['A', 'P', 'A', 'A', 'A'],
        ['A', 'A', 'P', 'P', 'A'],
        ['P', 'P', 'A', 'P', 'A'],
        ['A', 'P', 'P', 'P', 'A'],
        ['P', 'A', 'P', 'P', 'A'],
        ['A', 'P', 'P', 'P', 'P'],
        ['P', 'P', 'A', 'A', 'A'],
        ['A', 'A', 'P', 'A', 'A'],
        ['A', 'P', 'A', 'P', 'A'],
        ['A', 'P', 'A', 'A', 'P'],
        ['A', 'A', 'A', 'P', 'A'],
        ['P', 'A', 'P', 'A', 'A'],
        ['P', 'P', 'P', 'A', 'A'],
        ['P', 'A', 'A', 'P', 'A'],
        ['A', 'A', 'A', 'P', 'P'],
      ],
    },
    ways_to_miss_last_day: {
      number_of_ways: 14,
      ways: [
        ['A', 'P', 'P', 'A', 'A'],
        ['P', 'P', 'P', 'P', 'A'],
        ['A', 'P', 'A', 'A', 'A'],
        ['A', 'A', 'P', 'P', 'A'],
        ['P', 'P', 'A', 'P', 'A'],
        ['A', 'P', 'P', 'P', 'A'],
        ['P', 'A', 'P', 'P', 'A'],
        ['P', 'P', 'A', 'A', 'A'],
        ['A', 'A', 'P', 'A', 'A'],
        ['A', 'P', 'A', 'P', 'A'],
        ['A', 'A', 'A', 'P', 'A'],
        ['P', 'A', 'P', 'A', 'A'],
        ['P', 'P', 'P', 'A', 'A'],
        ['P', 'A', 'A', 'P', 'A'],
      ],
    },
  },
};
function App() {

  const [mainValue, setmainValue]= useState(0);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [n ,setN] = useState(0);
  const [probablity, setProbablity] = useState(0);

  const [value, setValue] = useState([]);

  // useEffect(() => {
  //   setData(res.data.ways_to_attend_classes.ways);
  // }, [])

  const handleRadio = (e) => {
    setValue(e.target.value);
  }


  const fetcher = (e) => {
    console.log("inside fetch")
    e.preventDefault();
    fetch('https://mysite-atis.onrender.com/attendance_insight/attendance_selector/?name=Mohit%20Chouhan&academic_days=' + n)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setProbablity(data.data.probability_to_miss_class_on_grad_day);
      setData(data.data.ways_to_attend_classes.ways);
    })
    .catch(err => {
      console.log(err);
    })
  }

  
  return (
    <div className="App">
      <VStack gap={"20px"}>
        <Heading backgroundColor={"coral"} color={"wheat"} width={"100%"} padding={"20px 0"}>Attendace Analytics</Heading>
        <FormControl>
          <VStack>
            <form onSubmit={fetcher}>
              <FormLabel htmlFor="acd">Academic Days</FormLabel>

              <HStack>
                <Input
                  onChange={(e) => setN(e.target.value)}
                  type="number"
                  placeholder="Academic Days"
                />
                <Button type="submit">Find Cases</Button>
              </HStack>
            </form>
          </VStack>
        </FormControl>
        {probablity ? <HStack display={'flex'} justifyContent={'center'}>
          <Heading>Probablity</Heading>
          <Heading>{probablity}</Heading>
        </HStack> : ""}
        
        {data.length && n<7 ? <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Number of cases</TableCaption>
            <Thead>
              <Tr>
                <Tr></Tr>
                {data[0]?.map((el, index) => (
                  <Th key={index} >Day {index + 1}</Th>
                ))}
                <Th>Select One</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((el, index) => (
                <Tr key={index + Date.now()}>
                  <Td>
                    <strong>Case {index + 1}</strong>
                  </Td>
                  {el.map((e, i) => (
                    <Td>{e === 'P' ? 'P' : 'A'}</Td>
                  ))}
                  <Td>
                    <input
                      name="value"
                      value={el}
                      type="radio"
                      onChange={handleRadio}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer> : <Text>Visualization not possioble .....</Text>}
        
      </VStack>
    </div>
  );
}

export default App;
