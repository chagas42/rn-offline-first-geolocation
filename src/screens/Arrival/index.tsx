import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BSON } from 'realm';
import { X } from 'phosphor-react-native';

import { ButtonIcon } from '../../compoents/ButtonIcon';
import { Header } from '../../compoents/Header';
import { Button } from '../../compoents/Button';

import { useObject, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';

import { Container, Content, Description, Footer, Label, LicensePlate } from './styles';

type RouteParamsProps = {
  id: string;
}

export function Arrival() {
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string)
  const realm = useRealm();
  const { goBack } = useNavigation();

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes';

  const handleRemoveVehicleUsage = () => {
    Alert.alert(
      'Cancelar',
      'Cancelar a utilização do veículo?', 
      [
        { text: 'Não', style: 'cancel'},
        { text: 'Sim', onPress: () => removeVehicleUsage()}
      ]
    )
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    });

    goBack();
  }

  const handleArrivalRegister = () => {
    try {
      if(!historic) {
        return Alert.alert('Erro', 'Não foi possível obter os dados para registrar a chegada do veículo.')
      }
      realm.write(() => {
        historic.status = 'arrival';
        historic.updated_at = new Date();
      });
      Alert.alert('Chegada', 'Chegada registrada com sucesso.');
      goBack();
      
    } catch (error) {
      Alert.alert('Erro', "Não foi possível registar a chegada do veículo.")
    }
  }

  return (
    <Container>
      <Header title={title}/>
      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>
          {historic?.license_plate}
        </LicensePlate>

        <Label>Finalidade</Label>
        <Description>
          {historic?.description}
        </Description>
      </Content>
      {
          historic?.status === 'departure' &&
          <Footer>
            <ButtonIcon 
              icon={X} 
              onPress={handleRemoveVehicleUsage}
            />
            <Button 
              title='Registrar chegada' 
              onPress={handleArrivalRegister}
            />
          </Footer>
        }
    </Container>
  );
}