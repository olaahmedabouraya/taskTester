/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {View, Text, TextInput, Button,Image} from 'react-native';
 import { mergeMap } from 'rxjs/operators';
import styles from './styles';
import {from, combineLatest} from 'rxjs';

interface IProps {
}

interface IState {
  Holder: any;
  errorMessage: any;
  list: any;
  flag: any;
  loading: any;
  first: any;
  second: any;
  third: any;
  imgs: any;
  base64: any;
}

interface FileReader {
    readAsDataURL(blob: Blob): string;
    onloadend(): void;
    result: string;
  }
  declare var FileReader: {
    prototype: FileReader;
    new (): FileReader;
  };

export default class HomeScreen extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
        Holder: '',
        errorMessage: '',
        list: [],
        flag: 0,
        loading: false,
        first: '',
        second: '',
        third: '',
        imgs: [],
        base64: '',
      };
    }

    convertBlobToBas64 = (blob:any) => {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            var base64data = reader.result;
            //this.setState({base64: reader.result});
        //     this.setState({base64data: reader.result});
             this.setState({ list: [...this.state.list,base64data ]});
        // console.log('State :' + this.state.list);
        //console.log(base64data);
        };
    }
     mockHTTPRequest(url:any) {
       // this.setState({imgs: []})
       this.setState({list: []});
        //  return fetch(url).then( response  => response.blob()).then(this.convertBlobToBas64);
        return fetch(url).then( response  => response.blob().then(this.convertBlobToBas64));
        // return of(`Response from ${url}`)
        //   .pipe(delay(Math.random() * 1000));
    }
    parallelURL(){
        if (this.isURL(this.state.first) && this.isURL(this.state.second) && this.isURL(this.state.third)){
        // var urls = ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/1200px-FullMoon2010.jpg', 'https://energyeducation.ca/wiki/images/thumb/b/bd/9103296900_0d383feabf_z.jpg/360px-9103296900_0d383feabf_z.jpg', 'https://itv.es/icemakers/wp-content/uploads/2017/11/Ice-Cube-Making-Machines-How-Do-They-Work.jpg'];

        // console.log('myimages', this.state.imgs);
        var urls = [this.state.first, this.state.second, this.state.third];
        from(urls)
          .pipe(mergeMap(url => this.mockHTTPRequest(url)))
          .subscribe(val => console.log(val));

        }
        else {
            console.error('Invalid URL');
        }
    }

    // parallelURL1(){
    //     const requestOne = axios.get((this.state.first));
    //     const requestTwo = axios.get(this.state.second);
    //     const requestThree = axios.get(this.state.third);
    //     axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
    //         const responseOne = responses[0];
    //         const responseTwo = responses[1];
    //         const responseThree = responses[2];
    //         console.log(responseOne, responseTwo, responseThree);

    //     })).catch(errors => {
    //         console.error(errors);
    //     });
    // }
    isURL(str:any) {
        var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g);
        return (res !== null);
      }

    // validate(value:any){
    //     if (this.isURL(value)) {
    //       this.setState({errorMessage: 'Is Valid URL'});
    //       this.setState({flag: 1});
    //     } else {
    //         this.setState({errorMessage: 'Is Not Valid URL'});
    //         this.setState({flag: 0});
    //     }
    //   }
    //   endEditing(myobj:any){
    //     this.setState(myobj);
    //   }

    render() {
    return (
        <View style={styles.wrapper}>
            <View>
                <Text style={styles.inputLabels}>Image URL: </Text>
                <View>
                { this.state.list && this.state.list.map( (url:any) => {
                    return (
                <View>
                    <Image style={{
                        width: 100,
                        height:100,
                    }} source={{ uri: url }}  />
                        </View>);
                })}
    <View style={styles.inputField}>
        <TextInput placeholder="First" style={{justifyContent: 'space-evenly'}} onChangeText={text =>this.setState({first: text})}  />
    </View>
    <View style={styles.inputField}>
        <TextInput placeholder="Second" style={{justifyContent: 'space-evenly'}} onChangeText={text =>this.setState({second: text})}  />
    </View>
    <View style={styles.inputField}>
        <TextInput placeholder="Third" style={{justifyContent: 'space-evenly'}} onChangeText={text =>this.setState({third: text})}  />
    </View>
                </View>
                <View>
                    <Button  title="Download"
                onPress={() => this.parallelURL() }/>
                </View>
            </View>
        </View>
    );
}
}

