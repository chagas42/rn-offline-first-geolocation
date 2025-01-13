import { useRef, useState } from 'react';
import { TextInput, ScrollView, Alert } from 'react-native';

import { useUser } from '@realm/react';
import { useRealm } from '../../libs/realm';

import { LicensePlateInput } from '../../compoents/LicensePlateInput';
import { TextAreaInput } from '../../compoents/TextAreaInput';
import { Button } from '../../compoents/Button';
import { Header } from '../../compoents/Header';

import { Container, Content } from './styles';
import { licensePlateValidate } from '../../utils/licensePlateValidate';
import { Historic } from '../../libs/realm/schemas/Historic';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export function Departure() {
  const [licensePlate, setLicensePlate] = useState('');
  const [description, setDescription] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const realm = useRealm();
  const user = useUser();
  const {goBack} = useNavigation();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  const handleDepartureRegister = () => {
    try {
      if(!licensePlateValidate(licensePlate)){
        licensePlateRef.current?.focus();
        return Alert.alert('Placa inválida', 'A placa é inválida. Por favor, informe a placa correta do veiculo.');
      }
      if(description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert('Finalidade', 'Por favor, informe a finalidade  da utilização do veículo.');
      }

      setIsRegistering(true)

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          description,
          license_plate: licensePlate.toUpperCase(),
          user_id: user!.id
        }))
      });

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!')
      goBack();

    } catch (error) {
      setIsRegistering(false)

      console.log(error);
      Alert.alert('Erro', 'Não foi possível registrar a saída do veículo.');
    }
  }

  return (
    <Container>
      <Header title='Saída'/>
      
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>  
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label='Placa do veículo' 
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType='next'
              onChangeText={setLicensePlate}
              />
            
            <TextAreaInput 
              ref={descriptionRef}
              label='Finalidade' 
              placeholder='Vou utilizar o veículo para...'
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              onChangeText={setDescription}
              />

            <Button 
              title='Registrar Saída'
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>

    </Container>
  );
}