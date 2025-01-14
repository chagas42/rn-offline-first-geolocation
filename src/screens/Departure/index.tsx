import { useRef, useState, useEffect } from 'react';
import { TextInput, ScrollView, Alert } from 'react-native';

import { 
  useForegroundPermissions,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  LocationObjectCoords,
  requestBackgroundPermissionsAsync
} from 'expo-location'

import { useUser } from '@realm/react';
import { useRealm } from '../../libs/realm';

import { getAddressLocation } from '../../utils/getAddressLocation';

import { LocationInfo } from '../../components/LocationInfo';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Loading } from '../../components/Loading';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

import { Container, Content, Message } from './styles';
import { licensePlateValidate } from '../../utils/licensePlateValidate';
import { Historic } from '../../libs/realm/schemas/Historic';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CarSimple } from 'phosphor-react-native';
import { Map } from '../../components/Map';


export function Departure() {
  const [licensePlate, setLicensePlate] = useState('');
  const [description, setDescription] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords | null>(null)

  const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions();

  const realm = useRealm();
  const user = useUser();
  const {goBack} = useNavigation();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  const handleDepartureRegister = async () => {
    try {
      if(!licensePlateValidate(licensePlate)){
        licensePlateRef.current?.focus();
        return Alert.alert('Placa inválida', 'A placa é inválida. Por favor, informe a placa correta do veiculo.');
      }
      if(description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert('Finalidade', 'Por favor, informe a finalidade  da utilização do veículo.');
      }

      if(!currentCoords?.latitude && !currentCoords?.longitude) {
        return Alert.alert('Localização', 'Não foi possível obter a localização atual. Tente novamente.')
      }

      setIsRegistering(true)

      const backgroundPermissions = await requestBackgroundPermissionsAsync()
      if(!backgroundPermissions.granted) {
        setIsRegistering(false)
        return Alert.alert('Localização', 'É necessário permitir que o App tenha acesso localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo."')
      }

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

  useEffect(() => {
    requestLocationForegroundPermission();
  }, [])

  useEffect(() => {
    if(!locationForegroundPermission?.granted){
      return
    } 
    let subscription: LocationSubscription;
    
    watchPositionAsync({
      accuracy: LocationAccuracy.High,
      timeInterval: 1000
    }, (location) => {
      setCurrentCoords(location.coords)
      
      getAddressLocation(location.coords)
      .then(address => {
        if(address) {
          setCurrentAddress(address)
        }
      })
      .finally(() => setIsLoadingLocation(false))

    }).then(response => subscription = response);
    
    return () => {
      if(subscription) {
        subscription.remove()
      }
    };

  }, [locationForegroundPermission?.granted])

  if(!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Header title='Saída' />
        <Message>
          Você precisa permitir que o aplicativo tenha acesso a 
          localização para acessar essa funcionalidade. Por favor, acesse as
          configurações do seu dispositivo para conceder a permissão ao aplicativo.
        </Message>
      </Container>
    )
  }

  if(isLoadingLocation) {
    return <Loading />
  }

  return (
    <Container>
      <Header title='Saída'/>
      
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
        { currentCoords && <Map coordinates={[currentCoords]} /> }
          <Content>
            {
              currentAddress &&
              <LocationInfo
                icon={CarSimple}
                label='Localização atual'
                description={currentAddress}
              />
            }
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