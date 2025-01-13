import { Alert, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from 'dayjs';

import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";

import { CarStatus } from "../../compoents/CarStatus";
import { HomeHeader } from "../../compoents/HomeHeader";
import { HistoricCard, HistoricCardProps } from "../../compoents/HistoricCard";

import { Container, Content, Label, Title } from "./styles";

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([]);

  const {navigate} = useNavigation()
  
  const historic = useQuery(Historic)
  const realm = useRealm();

  const handleRegisterMovement = () => {
    if(vehicleInUse?._id){
      return navigate("arrival", { id: vehicleInUse._id.toString() });
    } else {
      navigate("departure")
    }
  }

  const fetchVehicleInUse = () => {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      Alert.alert('Veículo em uso', 'Não foi possível carregar o veículo em uso.');
      console.log(error);
    }
  };

  function fetchHistoric() {
    try {
      const response = historic.filtered("status='arrival' SORT(created_at DESC)");
      const formattedHistoric = response.map((item) => {
        return ({
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: false,
          created: dayjs(item.created_at).format('[Saída em] DD/MM/YYYY [às] HH:mm')
        })
      })
      setVehicleHistoric(formattedHistoric);
    } catch (error) {
      console.log(error);
      Alert.alert('Histórico', 'Não foi possível carregar o histórico.')
    }
  }
  
  function handleHistoricDetails(id: string) {
    navigate('arrival', { id })
  }

  useEffect(() => {
    fetchVehicleInUse();
  },[])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());

    return () => {
      if(realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse);
      }
    }
  }, []);

  useEffect(() => {
    fetchHistoric();
  },[historic]);  

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus licensePlate={vehicleInUse?.license_plate} onPress={handleRegisterMovement}/>

        <Title>
          Histórico
        </Title>
        <FlatList 
          data={vehicleHistoric}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoricCard 
              data={item} 
              onPress={() => handleHistoricDetails(item.id)}
          />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={(
            <Label>
              Nenhum registro de utilização.
            </Label>
          )}
        />
      </Content>
    </Container>
  );
}
